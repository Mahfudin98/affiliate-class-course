<?php

namespace App\Repositories;

use App\Models\KelasMatery;

class KelasMateryRepository
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
        return KelasMatery::select($field)->get();
    }

    public function getById(int $id, array $field)
    {
        return KelasMatery::select($field)->findOrFail($id);
    }

    public function create(array $data)
    {
        return KelasMatery::create($data);
    }

    public function update(int $id, array $data)
    {
        $kelas = KelasMatery::findOrFail($id);
        return $kelas->update($data);
    }

    public function destroy(int $id)
    {
        $kelas = KelasMatery::findOrFail($id);
        $kelas->delete();
    }
}
