export interface YoutubeVideo {
    id: number;
    youtube_id: string;
    title: string;
    description: string;
    channel_id: string;
    channel_name: string;
    thumbnail_url: string;
    duration_seconds: number;
    view_count: number;
    like_count: number;
    comment_count: number;
    transcript: string;
    published_at: Date;
    metadata: MetaData;
    is_available: boolean;
    pivot: Pivot;
}

interface MetaData {
    tags: string[];
}

export interface Pivot {
    id: number;
    youtube_video_id: number;
    order_index: number;
    notes: string;
    start_time?: number | null;
    end_time?: number | null;
    is_primary: boolean;
}

export interface LessonPlayerWithTrackingProps {
    videoId: string;
    moduleId: number;
    videoId_db: number; // ID dari database
    duration: number; // Total duration dalam detik
    onVideoReady?: () => void;
    onProgressUpdate?: (percentage: number) => void;
    onVideoComplete?: () => void;
}
