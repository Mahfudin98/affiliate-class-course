<?php

namespace App\Repositories;

use App\Models\Video;

class VideoRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getAll(array $field)
    {
        return Video::select($field)->get();
    }

    public function getById(int $id, array $field)
    {
        return Video::select($field)->findOrFail($id);
    }

    public function create(array $data)
    {
        return Video::create($data);
    }

    public function update(int $id, array $data)
    {
        $video = Video::findOrFail($id);
        return $video->update($data);
    }

    public function destroy(int $id)
    {
        $video = Video::findOrFail($id);
        $video->delete();
    }
}