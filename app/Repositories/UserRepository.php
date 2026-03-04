<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
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
        return User::select($field)->get();
    }

    public function getById(int $id, array $field)
    {
        return User::select($field)->findOrFail($id);
    }

    public function create(array $data)
    {
        return User::create($data);
    }

    public function update(int $id, array $data)
    {
        $user = User::findOrFail($id);
        return $user->update($data);
    }

    public function destroy(int $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
    }
}
