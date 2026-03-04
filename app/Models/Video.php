<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $fillable = [
        'module_id',
        'youtube_video_id',
        'order_index',
        'start_time',
        'end_time',
        'notes',
        'is_primary'
    ];

    public function youtubeVideo()
    {
        return $this->belongsTo(YoutubeVideo::class);
    }

    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
