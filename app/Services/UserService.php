<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UserService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected UserRepository $user) {}

    public function getAll(array $fields)
    {
        return $this->user->getAll($fields);
    }

    public function getById(int $id, array $fields)
    {
        return $this->user->getById($id, $fields);
    }

    public function create(array $data)
    {
        if (isset($data['avatar']) && $data['avatar'] instanceof UploadedFile) {
            $data['avatar'] = $this->uploadPhoto($data['avatar']);
        }
        return $this->user->create($data);
    }

    public function update(int $id, array $data)
    {
        $fields = ['*'];
        $user = $this->user->getById($id, $fields);
        // Hanya proses jika thumbnail adalah file yang diupload
        if (isset($data['avatar']) && $data['avatar'] instanceof UploadedFile) {
            if (!empty($user->avatar)) {
                $this->deletePhoto($user->avatar);
            }
            $data['avatar'] = $this->uploadPhoto($data['avatar']);
        } else {
            // Jika bukan file, jangan update field photo
            unset($data['avatar']);
        }

        if (isset($data['password'])) {
            $data['password'] = $data['password'];
        } else {
            unset($data['password']);
        }
        return $this->user->update($id, $data);
    }

    public function destroy(int $id)
    {
        return $this->user->destroy($id);
    }

    private function uploadPhoto(UploadedFile $photo)
    {
        return $photo->store('user', 'public');
    }

    private function deletePhoto(string $photoPath)
    {
        $relativePath = 'user/' . basename($photoPath);
        if (Storage::disk('public')->exists($relativePath)) {
            Storage::disk('public')->delete($relativePath);
        }
    }
}
