<?php

namespace App\Models;

use Exception;
use Google\Client;
use Google\Service\YouTube;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Log;

class YoutubeVideo extends Model
{
    protected $fillable = [
        'youtube_id',
        'title',
        'description',
        'channel_id',
        'channel_name',
        'thumbnail_url',
        'duration_seconds',
        'view_count',
        'like_count',
        'comment_count',
        'transcript',
        'published_at',
        'metadata',
        'is_available',
    ];

    protected $casts = [
        'metadata' => 'json',
        'is_available' => 'boolean',
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function module(): BelongsToMany
    {
        return $this->belongsToMany(Module::class, 'videos')
            ->withPivot('order_index', 'notes', 'start_time', 'end_time', 'is_primary')
            ->orderBy('order_index');
    }

    public function playbacks(): HasMany
    {
        return $this->hasMany(UserVideoPlayback::class);
    }

    /**
     * Ambil video info dari YouTube API
     *
     * @param string $youtubeId
     * @return self|null
     */
    public static function fetchFromYouTube(string $youtubeId): ?self
    {
        try {
            $client = self::getYouTubeClient();
            $youtube = new YouTube($client);

            // Fetch video details
            $videos = $youtube->videos->listVideos(
                ['snippet', 'statistics', 'contentDetails'],
                ['id' => $youtubeId]
            );

            if (count($videos->getItems()) === 0) {
                return null;
            }

            $videoData = $videos->getItems()[0];
            $snippet = $videoData->getSnippet();
            $statistics = $videoData->getStatistics();
            $contentDetails = $videoData->getContentDetails();

            // Parse ISO 8601 duration ke seconds
            $duration = self::parseDuration($contentDetails->getDuration());

            // Cek atau create record
            $video = self::updateOrCreate(
                ['youtube_id' => $youtubeId],
                [
                    'title' => $snippet->getTitle(),
                    'description' => $snippet->getDescription(),
                    'channel_id' => $snippet->getChannelId(),
                    'channel_name' => $snippet->getChannelTitle(),
                    'thumbnail_url' => $snippet->getThumbnails()->getHigh()->getUrl(),
                    'duration_seconds' => $duration,
                    'view_count' => $statistics->getViewCount(),
                    'like_count' => $statistics->getLikeCount(),
                    'comment_count' => $statistics->getCommentCount(),
                    'published_at' => $snippet->getPublishedAt(),
                    'is_available' => true,
                    'metadata' => [
                        'tags' => $snippet->getTags() ?? [],
                        'category_id' => $snippet->getCategoryId(),
                        'default_language' => $snippet->getDefaultLanguage(),
                    ]
                ]
            );

            return $video;
        } catch (Exception $e) {
            Log::error('YouTube API Error: ' . $e->getMessage());

            throw $e;
        }
    }

    /**
     * Parse ISO 8601 duration to seconds
     * Example: PT1H30M45S -> 5445 seconds
     *
     * @param string $duration
     * @return int
     */
    private static function parseDuration(string $duration): int
    {
        $pattern = '/^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/';
        preg_match($pattern, $duration, $matches);

        $hours = isset($matches[5]) ? (int)$matches[5] : 0;
        $minutes = isset($matches[6]) ? (int)$matches[6] : 0;
        $seconds = isset($matches[7]) ? (int)$matches[7] : 0;

        return ($hours * 3600) + ($minutes * 60) + $seconds;
    }

    /**
     * Get YouTube Client instance
     *
     * @return Client
     */
    private static function getYouTubeClient(): Client
    {
        $client = new Client();
        $client->setApplicationName('AffiliateM astery');
        $client->setDeveloperKey(config('services.youtube.api_key'));

        return $client;
    }

    /**
     * Check if video still available di YouTube
     *
     * @return bool
     */
    public function checkAvailability(): bool
    {
        try {
            $client = self::getYouTubeClient();
            $youtube = new YouTube($client);

            $videos = $youtube->videos->listVideos(
                ['snippet'],
                ['id' => $this->youtube_id]
            );

            $available = count($videos->getItems()) > 0;
            $this->update(['is_available' => $available]);

            return $available;
        } catch (Exception $e) {
            Log::error('YouTube Availability Check Error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Get formatted duration
     *
     * @return string
     */
    public function getFormattedDurationAttribute(): string
    {
        $seconds = $this->duration_seconds ?? 0;
        $hours = floor($seconds / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        $secs = $seconds % 60;

        if ($hours > 0) {
            return sprintf("%d:%02d:%02d", $hours, $minutes, $secs);
        }
        return sprintf("%d:%02d", $minutes, $secs);
    }

    /**
     * Get YouTube URL
     *
     * @return string
     */
    public function getYouTubeUrlAttribute(): string
    {
        return "https://www.youtube.com/watch?v={$this->youtube_id}";
    }

    /**
     * Get embed URL
     *
     * @return string
     */
    public function getEmbedUrlAttribute(): string
    {
        return "https://www.youtube.com/embed/{$this->youtube_id}";
    }
}
