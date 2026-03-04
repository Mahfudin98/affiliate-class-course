<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserVideoPlayback extends Model
{
    protected $fillable = [
        'youtube_video_id',
        'user_id',
        'total_watch_seconds',
        'last_position_seconds',
        'watch_percentage',
        'is_completed',
        'watch_count',
        'started_at',
        'completed_at'
    ];

    protected $casts = [
        'is_completed' => 'boolean',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function youtubeVideo()
    {
        return $this->belongsTo(YoutubeVideo::class);
    }
}
