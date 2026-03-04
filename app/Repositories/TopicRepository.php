<?php

namespace App\Repositories;

use App\Models\Topic;

class TopicRepository
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
        return Topic::select($field)->get();
    }

    public function getById(int $id, array $field)
    {
        return Topic::select($field)->findOrFail($id);
    }

    public function create(array $data)
    {
        return Topic::create($data);
    }

    public function update(int $id, array $data)
    {
        $topic = Topic::findOrFail($id);
        return $topic->update($data);
    }

    public function destroy(int $id)
    {
        $topic = Topic::findOrFail($id);
        $topic->delete();
    }
}
