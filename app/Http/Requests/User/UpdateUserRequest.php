<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'nullable',
            'role' => 'required|in:admin,user',
            'status' => 'required'
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi',
            'email.email' => 'Input harus berupa email dengan @',
            'email.unique' => 'Email ini sudah digunakan',
            'password.required' => 'Password wajib diisi',
            'role.required' => 'Role wajib diisi',
            'status.required' => 'Status wajib diisi',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Convert JSON string to array if needed
        if (is_string($this->modules)) {
            $this->merge([
                'modules' => json_decode($this->modules, true) ?? []
            ]);
        }

        if ($this->has('is_new') && $this->is_new === 'on') {
            $this->merge(['is_new' => true]);
        }
    }
}
