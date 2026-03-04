<?php

namespace App\Services;

use App\Repositories\DifficultyLevelRepository;

class DifficultyLevelService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected DifficultyLevelRepository $difficulty)
    {
        //
    }

    public function getAll(array $field)
    {
        return $this->difficulty->getAll($field);
    }

    public function getById(int $id, array $field)
    {
        return $this->difficulty->getById($id, $field);
    }

    public function create(array $data)
    {
        return $this->difficulty->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->difficulty->update($id, $data);
    }

    public function destroy(int $id)
    {
        return $this->difficulty->destroy($id);
    }
}
