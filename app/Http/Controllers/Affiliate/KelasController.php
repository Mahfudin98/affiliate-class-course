<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Services\CourseService;
use App\Services\DifficultyLevelService;
use App\Services\TopicService;
use App\Services\YoutubeService;
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
        return Inertia::render('affiliate/kelas/course');
    }

    public function detailModule(int $id)
    {
        return Inertia::render('affiliate/kelas/module');
    }
}