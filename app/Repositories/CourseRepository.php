<?php

namespace App\Repositories;

use App\Models\Course;

class CourseRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getAll(array $field, array $relation = [])
    {
        $query = Course::select($field);
        if ($relation) {
            $query->with($relation);
        }
        return $query->get();
    }

    public function getById(int $id, array $field, array $relation = [])
    {
        $query = Course::select($field);
        if ($relation) {
            $query->with($relation);
        }
        return $query->findOrFail($id);
    }

    public function create(array $data)
    {
        return Course::create($data);
    }

    public function update(int $id, array $data)
    {
        $course = Course::findOrFail($id);
        return $course->update($data);
    }

    public function destroy(int $id)
    {
        $course = Course::findOrFail($id);
        $course->delete();
    }
}
