import { Head, router, usePage } from '@inertiajs/react';
import { CheckCircle, Lock, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LessonPlayerWithTracking from '@/components/video/player_with_tracking';
import AppLayout from '@/layouts/app-layout';
import { cn, formatDuration } from '@/lib/utils';
import { dashboard } from '@/routes';
import courses from '@/routes/courses';
import type { BreadcrumbItem } from '@/types';
import type { Module, Video } from '@/types/course';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Course Module',
        href: dashboard(),
    },
];

type Props = {
    module_data: Module;
    video_id: number;
};

export default function CourseModule() {
    const { module_data, video_id } = usePage<Props>().props;

    const selectedVideo = module_data.videos.find(
        (v) => Number(v.id) === Number(video_id),
    );

    const primaryVideo =
        selectedVideo?.youtube_video ??
        module_data.videos[0]?.youtube_video ??
        null;

    const handleProgressUpdate = (percentage: number) => {
        // Bisa digunakan untuk update UI atau analytics
        console.log(`Video progress: ${percentage}%`);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Course Module" />
            <div className="mx-auto flex w-full max-w-full flex-1 flex-col gap-6 p-4 md:p-6 lg:flex-row lg:p-8">
                <div className="flex flex-1 flex-col gap-6">
                    <LessonPlayerWithTracking
                        videoId={primaryVideo.youtube_id}
                        moduleId={module_data.id}
                        videoId_db={primaryVideo.id}
                        duration={
                            primaryVideo.duration_seconds ||
                            module_data.duration_minutes * 60
                        }
                        onProgressUpdate={handleProgressUpdate}
                        onVideoComplete={() => console.log('video completed')}
                    />
                    <div className="flex flex-col justify-between gap-4 border-b border-surface-dark pb-6 md:flex-row md:items-center">
                        <div>
                            <h1 className="mb-2 text-2xl font-black text-white">
                                {selectedVideo?.order_index}.{' '}
                                {primaryVideo.title}
                            </h1>
                            <p className="flex items-center gap-2 text-sm text-text-muted">
                                <span className="text-tiktok-cyan">
                                    {module_data.title}
                                </span>{' '}
                                • Modul {module_data.order_index}
                            </p>
                        </div>
                    </div>

                    {/* Content Tabs */}
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList variant="line" className="px-0">
                            <TabsTrigger
                                value="description"
                                className="after:bg-tiktok-pink"
                            >
                                Deskripsi
                            </TabsTrigger>
                            <TabsTrigger value="tags">Tags</TabsTrigger>
                            <TabsTrigger value="note">Note</TabsTrigger>
                            <TabsTrigger value="info">Info</TabsTrigger>
                        </TabsList>
                        <Separator className="-mt-2.5" />
                        <TabsContent value="description">
                            <CardDescription className="mt-4">
                                <div
                                    className="prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: primaryVideo.description,
                                    }}
                                />
                            </CardDescription>
                        </TabsContent>
                        <TabsContent value="tags">
                            <div className="space-x-1">
                                {primaryVideo.metadata.tags.map((tag) => (
                                    <Badge key={tag} variant={'outline'}>
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="note">
                            <CardDescription className="mt-4">
                                {selectedVideo?.notes ||
                                    'Tidak ada catatan untuk video ini.'}
                            </CardDescription>
                        </TabsContent>
                        <TabsContent value="info">
                            <CardDescription className="mt-4">
                                {selectedVideo?.created_at}
                            </CardDescription>
                        </TabsContent>
                    </Tabs>
                </div>
                <Playlists videos={module_data.videos} video_id={video_id} />
            </div>
        </AppLayout>
    );
}

function Playlists({
    videos,
    video_id,
}: {
    videos: Video[];
    video_id: number;
}) {
    return (
        <aside className="flex w-full flex-col gap-4 lg:w-96">
            <div className="flex h-fit flex-col overflow-hidden rounded-2xl border border-gray-800 bg-surface-dark">
                <div className="bg-card-dark/50 border-b border-gray-800 p-5">
                    <h3 className="mb-1 text-lg font-bold text-white">
                        Materi Kelas
                    </h3>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-text-muted">Progres Belajar</span>
                        <span className="font-bold text-tiktok-cyan">
                            25% Selesai
                        </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-gray-800">
                        <Progress value={25} />
                    </div>
                </div>
                <div className="no-scrollbar max-h-96 overflow-y-auto">
                    {videos?.length > 0 &&
                        videos.map((video, videoIndex) => {
                            const currentId = Number(video_id ?? videos[0]?.id);
                            const isCurrentVideo =
                                Number(video.id) === currentId;

                            return (
                                <VideoPlaylist
                                    key={video.id}
                                    videoId={video.id}
                                    thumbnail_url={
                                        video.youtube_video?.thumbnail_url
                                    }
                                    videoIndex={videoIndex}
                                    title={video.youtube_video?.title}
                                    duration={
                                        video.youtube_video?.duration_seconds ??
                                        0
                                    }
                                    isCurrentVideo={isCurrentVideo}
                                    isCompleted={false}
                                    isUnlocked={true}
                                    onClick={() => {
                                        router.get(
                                            courses.module.show(
                                                Number(video.module_id),
                                                {
                                                    query: {
                                                        q: Number(video.id),
                                                    },
                                                },
                                            ),
                                        );
                                    }}
                                />
                            );
                        })}
                </div>
            </div>
        </aside>
    );
}

type VideoPlaylistProps = {
    videoId: number;
    thumbnail_url?: string;
    videoIndex: number;
    title: string;
    duration: number;
    isCurrentVideo: boolean;
    isCompleted: boolean;
    isUnlocked: boolean;
    onClick: (videoId: number) => void;
};

function VideoPlaylist({
    videoId,
    thumbnail_url = '',
    videoIndex,
    title,
    duration,
    isCurrentVideo,
    isCompleted,
    isUnlocked,
    onClick,
}: VideoPlaylistProps) {
    const handleClick = () => {
        if (isUnlocked) {
            onClick(videoId);
        }
    };
    return (
        <button
            onClick={handleClick}
            disabled={!isUnlocked}
            className={cn(
                'group flex w-full cursor-pointer items-center gap-4 p-4 hover:bg-white/5',
                isCurrentVideo
                    ? 'border-l-4 border-tiktok-pink bg-tiktok-pink/5'
                    : 'hover:bg-gray-800/50',
            )}
        >
            <div className="flex shrink-0 items-center justify-center rounded-lg text-white">
                {!isUnlocked ? (
                    <Lock className="size-10 text-gray-600" />
                ) : isCompleted ? (
                    <CheckCircle className="size-10 text-emerald-500" />
                ) : isCurrentVideo ? (
                    <div className="flex size-10 items-center justify-center rounded-lg bg-tiktok-pink">
                        <Play className="h-2.5 w-2.5 fill-white text-white" />
                    </div>
                ) : (
                    <div className="size-10 overflow-hidden rounded-lg border-2 border-gray-600">
                        <img
                            src={thumbnail_url}
                            alt=""
                            className="size-10 rounded-lg object-cover"
                        />
                    </div>
                )}
            </div>
            <div className="min-w-0 flex-1 text-start">
                {isCurrentVideo && (
                    <p className="mb-0.5 text-xs font-bold tracking-wider text-tiktok-pink uppercase">
                        Sedang Diputar
                    </p>
                )}
                <h4 className="truncate text-sm font-bold text-white">
                    {videoIndex + 1}. {title}
                </h4>
                <p className="text-[11px] text-text-muted">
                    {formatDuration(duration)}
                </p>
            </div>
        </button>
    );
}
