<?php

namespace App\Services;

use App\Repositories\CourseRepository;
use App\Repositories\ModuleRepository;
use App\Repositories\VideoRepository;
use App\Repositories\YoutubeVideoRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CourseService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected CourseRepository $course,
        protected ModuleRepository $module,
        protected YoutubeVideoRepository $youtube,
        protected VideoRepository $video
    ) {}

    public function getAll(
        array $fields,
        array $relation = [],
        string $q = '',
        int $paginate = 0,
        int $limit = 0
    ) {
        return $this->course->getAll(
            $fields,
            $paginate,
            $q,
            $relation,
            $limit
        );
    }

    public function getById(int $id, array $fields, array $relation = [])
    {
        return $this->course->getById($id, $fields, $relation);
    }

    public function getModuleById(int $id, array $fields, array $relation = [])
    {
        return $this->module->getById($id, $fields, $relation);
    }

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            $course = $this->course->create([
                'title' => $data['title'],
                'description' => $data['description'],
                'thumbnail_url' => $data['thumbnail_url'],
                'difficulty_level_id' => $data['difficulty_level_id'],
                'topic_id' => $data['topic_id'],
                'duration_hours' => $data['duration_hours'],
                'is_new' => $data['is_new'] ?? true,
            ]);

            $modules = $data['modules'] ?? [];
            $totalModules = count($modules);
            $course->module_count = $totalModules;

            foreach ($modules as $moduleIndex => $moduleData) {
                $module = $this->module->create([
                    'course_id' => $course->id,
                    'title' => $moduleData['title'] ?? 'Module ' . ($moduleIndex + 1),
                    'order_index' => $moduleIndex + 1,
                    'duration_minutes' => $moduleData['duration_minutes'] ?? 0
                ]);

                $videos = $moduleData['videos'] ?? [];
                foreach ($videos as $videoIndex => $videoData) {
                    $youtubeId = $videoData['youtube_id'];
                    $video = $this->youtube->getByYoutubeId($youtubeId, ['*']);

                    if (!$video) {
                        $video = $this->youtube->fetchFromYoutube($youtubeId);
                    }

                    if ($video) {
                        $module->youtubeVideos()->attach($video->id, [
                            'order_index' => $videoData['order_index'] ?? ($videoIndex + 1),
                            'is_primary' => $videoData['is_primary'] ?? ($videoIndex === 0),
                            'notes' => $videoData['notes'] ?? null,
                            'start_time' => $videoData['start_time'] ?? null,
                            'end_time' => $videoData['end_time'] ?? null,
                        ]);
                    } else {
                        Log::warning("YouTube video not found: $youtubeId for module {$module->id}");
                    }
                }
            }

            $course->save();
        });
    }
}