<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable = [
        'course_id',
        'title',
        'order_index',
        'duration_minutes'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function videos()
    {
        return $this->hasMany(Video::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function youtubeVideos()
    {
        return $this->belongsToMany(YouTubeVideo::class, 'videos')
            ->withPivot('order_index', 'notes', 'start_time', 'end_time', 'is_primary');
    }
}
