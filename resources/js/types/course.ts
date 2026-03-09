import type { DifficultyLevel, Topic } from './difficulty-topic';
import type { YoutubeVideo } from './youtube-video';

export interface Course {
    id: number;
    title: string;
    description: string;
    thumbnail_url: string;
    difficulty_level_id: number;
    topic_id: number;
    duration_hours: number;
    module_count: number;
    is_new: boolean;
    created_at: string;
    updated_at: string;
    topic: Topic;
    difficulty_level: DifficultyLevel;
    modules: Module[];
}

export interface Module {
    id: number;
    course_id: number;
    title: string;
    description: string;
    difficulty_level: DifficultyLevel;
    order_index: number;
    duration_minutes: number;
    created_at: string;
    updated_at: string;
    videos: Video[];
}

export interface Video {
    id: number;
    module_id: number;
    youtube_video_id: number;
    order_index: number;
    start_time: number;
    end_time: number;
    is_primary: true;
    notes: string;
    created_at: string;
    updated_at: string;
    youtube_video: YoutubeVideo;
}
