<?php

namespace App\Services;

use App\Models\Video;
use App\Repositories\YoutubeVideoRepository;
use Illuminate\Support\Facades\Log;

class YoutubeService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected YoutubeVideoRepository $youtube)
    {
        //
    }

    public function searchYoutubeVideos(string $request)
    {
        $query = trim($request);

        try {
            $youtubeId = $this->extractYouTubeId($query);

            if (!$youtubeId || strlen($youtubeId) !== 11) {
                return response()->json(['message' => 'Invalid YouTube ID'], 422);
            }

            $video = $this->youtube->getByYoutubeId($youtubeId, ['*']);
            if (!$video) {
                $video = $this->youtube->fetchFromYoutube($youtubeId);

                if (!$video) {
                    return response()->json(['message' => 'Video tidak ditemukan di YouTube'], 404);
                }
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $video->id,
                    'youtube_id' => $video->youtube_id,
                    'title' => $video->title,
                    'duration' => $video->formatted_duration,
                    'thumbnail_url' => $video->thumbnail_url,
                    'view_count' => number_format($video->view_count),
                    'channel_name' => $video->channel_name,
                ]
            ]);
        } catch (\Throwable $e) {
            Log::error('YouTube API Error', [
                'youtube_id' => $youtubeId,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data video.'
            ], 500);
        }
    }

    private function extractYouTubeId(string $input): ?string
    {
        // Pattern untuk YouTube URLs
        $patterns = [
            '/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/',
            '/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/',
            '/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/',
            '/(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/',
            '/^([a-zA-Z0-9_-]{11})$/',
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $input, $matches)) {
                return $matches[1];
            }
        }

        return null;
    }
}
