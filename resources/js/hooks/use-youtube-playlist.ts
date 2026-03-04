import axios from 'axios';
import { useCallback, useState } from 'react';

interface VideoProgressData {
    current_seconds: number;
    video_duration: number;
    watch_percentage: number;
}

export const useVideoProgress = (moduleId: number, videoId: number) => {
    const [progress, setProgress] = useState({
        watch_percentage: 0,
        is_completed: false,
        total_watch_seconds: 0,
        last_position_seconds: 0,
    });

    const [isUpdating, setIsUpdating] = useState(false);

    // Update progress to backend
    const updateProgress = useCallback(
        async (data: VideoProgressData) => {
            try {
                setIsUpdating(true);
                const response = await axios.post(
                    `/api/video-playback/${videoId}/update`,
                    {
                        current_seconds: data.current_seconds,
                        video_duration: data.video_duration,
                        watch_percentage: data.watch_percentage,
                    },
                );

                setProgress({
                    watch_percentage: response.data.watch_percentage,
                    is_completed: response.data.is_completed,
                    total_watch_seconds: response.data.total_watch_seconds,
                    last_position_seconds: data.current_seconds,
                });

                return response.data;
            } catch (error) {
                console.error('Error updating progress:', error);
            } finally {
                setIsUpdating(false);
            }
        },
        [videoId],
    );

    // Mark video as completed
    const markAsCompleted = useCallback(async () => {
        try {
            setIsUpdating(true);
            const response = await axios.post(
                `/api/video-playback/${videoId}/complete`,
            );

            setProgress((prev) => ({
                ...prev,
                is_completed: true,
                watch_percentage: 100,
            }));

            return response.data;
        } catch (error) {
            console.error('Error marking as completed:', error);
        } finally {
            setIsUpdating(false);
        }
    }, [videoId]);

    return {
        progress,
        updateProgress,
        markAsCompleted,
        isUpdating,
    };
};
