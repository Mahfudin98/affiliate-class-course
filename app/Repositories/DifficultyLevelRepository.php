<?php

namespace App\Repositories;

use App\Models\DifficultyLevel;

class DifficultyLevelRepository
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
        return DifficultyLevel::select($field)->get();
    }

    public function getById(int $id, array $field)
    {
        return DifficultyLevel::select($field)->findOrFail($id);
    }

    public function create(array $data)
    {
        return DifficultyLevel::create($data);
    }

    public function update(int $id, array $data)
    {
        $difficulty = DifficultyLevel::findOrFail($id);
        return $difficulty->update($data);
    }

    public function destroy(int $id)
    {
        $difficulty = DifficultyLevel::findOrFail($id);
        $difficulty->delete();
    }
}
