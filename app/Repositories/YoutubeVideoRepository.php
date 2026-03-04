<?php

namespace App\Repositories;

use App\Models\YoutubeVideo;

class YoutubeVideoRepository
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
        return YoutubeVideo::select($field)->get();
    }

    public function getById(int $id, array $field)
    {
        return YoutubeVideo::select($field)->findOrFail($id);
    }

    public function getByYoutubeId(string $id, array $field)
    {
        return YoutubeVideo::select($field)->where('youtube_id', $id)->first();
    }

    public function fetchFromYoutube(string $youtubeId)
    {
        return YoutubeVideo::fetchFromYouTube($youtubeId);
    }

    public function create(array $data)
    {
        return YoutubeVideo::create($data);
    }

    public function update(int $id, array $data)
    {
        $youtube = YoutubeVideo::findOrFail($id);
        return $youtube->update($data);
    }

    public function destroy(int $id)
    {
        $youtube = YoutubeVideo::findOrFail($id);
        $youtube->delete();
    }
}
