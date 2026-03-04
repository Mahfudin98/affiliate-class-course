<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'title',
        'description',
        'thumbnail_url',
        'difficulty_level_id',
        'topic_id',
        'duration_hours',
        'module_count',
        'is_new'
    ];

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function difficultyLevel()
    {
        return $this->belongsTo(DifficultyLevel::class);
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }
}
