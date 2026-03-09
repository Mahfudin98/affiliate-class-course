<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function __construct(protected UserService $user) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = $this->user->getAll(['*']);
        return Inertia::render('admin/user/index', [
            'users' => $user
        ]);
        // return response()->json($user);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/user/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $this->user->create($request->validated());
        return redirect()->route('users.index')->with(['message' => 'User berhasil ditambahkan']);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $user = $this->user->getById($id, ['*']);
        return Inertia::render('admin/user/edit', [
            'user' => $user,
        ]);

        // return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, int $id)
    {
        $this->user->update($id, $request->validated());
        return redirect()->route('users.index')->with(['message' => 'User berhasil diperbarui']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->user->destroy($id);
        return redirect()->route('users.index')->with(['message' => 'User berhasil dihapus']);
    }
}
