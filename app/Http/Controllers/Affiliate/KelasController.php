<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Services\CourseService;
use App\Services\DifficultyLevelService;
use App\Services\TopicService;
use App\Services\YoutubeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function __construct(
        protected CourseService $course,
        protected YoutubeService $youtube,
        protected TopicService $topic,
        protected DifficultyLevelService $difficulty
    ) {}

    public function index()
    {
        $topics = $this->topic->getAll(['*']);
        $difficulties = $this->difficulty->getAll(['*']);
        $courses = $this->course->getAll(
            ['*'],
            ['topic', 'difficultyLevel'],
        );
        return Inertia::render('affiliate/kelas/index', [
            'topics' => $topics,
            'difficulties' => $difficulties,
            'courses' => $courses
        ]);
        // return response()->json(['data' => $courses]);
    }

    public function detailCourse(int $id)
    {
        $course = $this->course->getById($id, ['*'], ['topic', 'difficultyLevel', 'modules', 'modules.videos', 'modules.videos.youtubeVideo']);
        return Inertia::render('affiliate/kelas/course', [
            'course_data' => $course
        ]);
    }

    public function detailModule(int $module_id, Request $request)
    {
        $request->validate([
            'q' => ['nullable', 'numeric']
        ]);
        $videoId = $request->input('q');
        $module = $this->course->getModuleById($module_id, ['*'], ['videos', 'videos.youtubeVideo']);
        return Inertia::render('affiliate/kelas/module', [
            'module_data' => $module,
            'video_id' => $videoId
        ]);
    }
}
