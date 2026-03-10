<?php

namespace App\Http\Requests\Course;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCourseRequest extends FormRequest
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
        $courseId = $this->route('id');
        return [
            // Course fields
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('courses', 'title')->ignore($courseId),
            ],
            'description' => 'nullable|string|max:5000',
            'thumbnail_url' => 'nullable|url|max:500',
            'difficulty_level_id' => 'required|exists:difficulty_levels,id',
            'topic_id' => 'required|exists:topics,id',
            'duration_hours' => 'required|numeric|min:0.1|max:1000',
            'is_new' => 'nullable|boolean',

            // Module validation
            'modules' => 'required|array|min:1|max:100',
            'modules.*.id' => 'nullable|exists:modules,id',
            'modules.*.title' => 'required|string|max:255',
            'modules.*.duration_minutes' => 'required|integer|min:0',

            // Video validation
            'modules.*.videos' => 'required|array|min:1|max:100',
            'modules.*.videos.*.youtube_id' => 'required|string|regex:/^[a-zA-Z0-9_-]{11}$/|distinct',
            'modules.*.videos.*.order_index' => 'nullable|integer|min:1',
            'modules.*.videos.*.is_primary' => 'nullable|boolean',
            'modules.*.videos.*.notes' => 'nullable|string|max:1000',
            'modules.*.videos.*.start_time' => 'nullable|integer|min:0',
            'modules.*.videos.*.end_time' => 'nullable|integer|min:0',

            // Flags for update strategy
            'delete_old_structure' => 'nullable|boolean',
            'delete_old_videos' => 'nullable|boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Course title is required',
            'title.unique' => 'A course with this title already exists',
            'difficulty_level_id.required' => 'Please select a difficulty level',
            'difficulty_level_id.exists' => 'Selected difficulty level is invalid',
            'topic_id.required' => 'Please select a topic',
            'topic_id.exists' => 'Selected topic is invalid',
            'duration_hours.required' => 'Course duration is required',
            'modules.required' => 'At least one module is required',
            'modules.*.videos.required' => 'Each lesson must have at least one video',
            'modules.*.videos.*.youtube_id.regex' => 'YouTube ID must be exactly 11 characters',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
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
