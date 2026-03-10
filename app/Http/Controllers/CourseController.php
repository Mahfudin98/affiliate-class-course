<?php

namespace App\Http\Controllers;

use App\Http\Requests\Course\StoreCourseRequest;
use App\Http\Requests\Course\UpdateCourseRequest;
use App\Services\CourseService;
use App\Services\DifficultyLevelService;
use App\Services\TopicService;
use App\Services\YoutubeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function __construct(
        protected CourseService $course,
        protected YoutubeService $youtube,
        protected TopicService $topic,
        protected DifficultyLevelService $difficulty
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = $this->course->getAll(['*'], ['topic', 'difficultyLevel']);
        return Inertia::render('admin/course/index', [
            'courses_data' => $courses,
        ]);
        // return response()->json($courses);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $topics = $this->topic->getAll(['*']);
        $difficulties = $this->difficulty->getAll(['*']);
        return Inertia::render('admin/course/create', [
            'topics' => $topics,
            'difficulties' => $difficulties,
        ]);
        // dd($topics, $difficulties);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $this->course->create($request->validated());
        return redirect()->route('courses.index')->with('success', 'Course created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $course = $this->course->getById($id, ['*'], ['topic', 'difficultyLevel', 'modules', 'modules.videos', 'modules.videos.youtubeVideo']);
        return Inertia::render('admin/course/detail', [
            'course_data' => $course
        ]);

        // return response()->json($course);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $course = $this->course->getById($id, ['*'], ['topic', 'difficultyLevel', 'modules', 'modules.videos', 'modules.videos.youtubeVideo']);
        $topics = $this->topic->getAll(['*']);
        $difficulties = $this->difficulty->getAll(['*']);

        return Inertia::render('admin/course/edit', [
            'course_data' => $course,
            'topics' => $topics,
            'difficulties' => $difficulties,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, int $id)
    {
        $this->course->update($id, $request->validated());
        return redirect()->route('courses.index')->with('success', 'Course update successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function searchYoutubeVideos(Request $request)
    {
        $request->validate([
            'q' => ['required', 'string']
        ]);

        $data = $this->youtube->searchYoutubeVideos($request->input('q'));

        return $data;
    }

    public function showModule(int $module_id, Request $request)
    {
        $request->validate([
            'q' => ['nullable', 'numeric']
        ]);
        $videoId = $request->input('q');
        $module = $this->course->getModuleById($module_id, ['*'], ['videos', 'videos.youtubeVideo']);
        return Inertia::render('admin/course/module', [
            'module_data' => $module,
            'video_id' => $videoId
        ]);
    }
}
