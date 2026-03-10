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

    public function getAll(
        array $field,
        int $paginate = 0,
        string $q = '',
        array $relation = [],
        int $limit = 0
    ) {
        $query = Course::query();
        $query->select($field)->when(function ($queri) use ($q) {
            if ($q != '') {
                return $queri->where('title', $q);
            }
        });

        if ($relation) {
            $query->with($relation);
        }

        if ($limit) {
            $query->limit($limit);
        }

        if ($paginate !== 0) {
            return $query->paginate($paginate);
        } else {
            return $query->get();
        }
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
        $course->update($data);

        return $course;
    }

    public function destroy(int $id)
    {
        $course = Course::findOrFail($id);
        $course->delete();
    }
}
