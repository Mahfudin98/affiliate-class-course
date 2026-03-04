<?php

namespace App\Services;

use App\Repositories\TopicRepository;

class TopicService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected TopicRepository $topic)
    {
        //
    }

    public function getAll(array $field)
    {
        return $this->topic->getAll($field);
    }

    public function getById(int $id, array $field)
    {
        return $this->topic->getById($id, $field);
    }

    public function create(array $data)
    {
        return $this->topic->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->topic->update($id, $data);
    }

    public function destroy(int $id)
    {
        return $this->topic->destroy($id);
    }
}
