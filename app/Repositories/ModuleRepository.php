<?php

namespace App\Repositories;

use App\Models\Module;

class ModuleRepository
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
        return Module::select($field)->get();
    }

    public function getById(int $id, array $fields, array $relation = [])
    {
        $query = Module::select($fields);
        if ($relation) {
            $query->with($relation);
        }
        return $query->findOrFail($id);
    }

    public function create(array $data)
    {
        return Module::create($data);
    }

    public function update(int $id, array $data)
    {
        $module = Module::findOrFail($id);
        return $module->update($data);
    }

    public function updateOrCreate(array $attributes, array $values = [])
    {
        return Module::updateOrCreate($attributes, $values);
    }

    public function destroy(int $id)
    {
        $module = Module::findOrFail($id);
        $module->delete();
    }
}
