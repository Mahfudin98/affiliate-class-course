import { useCallback, useEffect, useRef } from 'react';
import { useVideoProgress } from '@/hooks/use-youtube-playlist';
import type { LessonPlayerWithTrackingProps } from '@/types/youtube-video';
import YouTubePlayer from './youtube_player';

export default function LessonPlayerWithTracking({
    videoId,
    moduleId,
    videoId_db,
    duration,
    onVideoReady,
    onProgressUpdate,
    onVideoComplete,
}: LessonPlayerWithTrackingProps) {
    const playerRef = useRef<YT.Player | null>(null);
    const trackingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
        null,
    );
    const lastUpdateTimeRef = useRef<number>(0);

    const { progress, updateProgress, markAsCompleted } = useVideoProgress(
        moduleId,
        videoId_db,
    );

    // Setup player ready handler
    const handlePlayerReady = useCallback(
        (player: YT.Player) => {
            playerRef.current = player;

            // Get stored progress dan seek ke position
            const storedProgress = localStorage.getItem(
                `lesson_${moduleId}_progress`,
            );
            if (storedProgress) {
                const { lastPosition } = JSON.parse(storedProgress);
                if (lastPosition > 0) {
                    setTimeout(() => {
                        player.seekTo(lastPosition, true);
                    }, 500);
                }
            }

            if (onVideoReady) onVideoReady();
        },
        [moduleId, onVideoReady],
    );

    // Update progress ke backend setiap 5 detik
    const startProgressTracking = useCallback(() => {
        if (trackingIntervalRef.current) {
            clearInterval(trackingIntervalRef.current);
        }

        trackingIntervalRef.current = setInterval(async () => {
            if (!playerRef.current) return;

            const currentTime = playerRef.current.getCurrentTime();
            const videoDuration = playerRef.current.getDuration();

            // Hanya update jika 5 detik telah berlalu
            if (currentTime - lastUpdateTimeRef.current >= 5) {
                lastUpdateTimeRef.current = currentTime;

                const percentage = Math.round(
                    (currentTime / videoDuration) * 100,
                );

                // Update ke backend
                await updateProgress({
                    current_seconds: currentTime,
                    video_duration: videoDuration,
                    watch_percentage: percentage,
                });

                // Callback ke parent
                if (onProgressUpdate) onProgressUpdate(percentage);

                // Auto-mark sebagai completed di 90%
                if (percentage >= 90 && !progress.is_completed) {
                    await markAsCompleted();
                    if (onVideoComplete) onVideoComplete();
                }

                // Save ke localStorage
                localStorage.setItem(
                    `lesson_${moduleId}_progress`,
                    JSON.stringify({
                        lastPosition: currentTime,
                        percentage,
                        lastUpdate: Date.now(),
                    }),
                );

                // Dispatch custom event untuk subscribers
                window.dispatchEvent(
                    new CustomEvent('video-progress', {
                        detail: {
                            currentTime,
                            duration: videoDuration,
                            percentage,
                        },
                    }),
                );
            }
        }, 1000); // Check setiap 1 detik
    }, [
        moduleId,
        updateProgress,
        markAsCompleted,
        onProgressUpdate,
        onVideoComplete,
        progress.is_completed,
    ]);

    useEffect(() => {
        startProgressTracking();

        return () => {
            if (trackingIntervalRef.current) {
                clearInterval(trackingIntervalRef.current);
            }
        };
    }, [startProgressTracking]);

    return (
        <YouTubePlayer
            videoId={videoId}
            onReady={handlePlayerReady}
            height={400}
        />
    );
}
