import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    SkipBack,
    SkipForward,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '../ui/slider';

declare global {
    interface Window {
        YT?: typeof YT;
        onYouTubeIframeAPIReady?: () => void;
    }
}

interface CustomYouTubePlayerProps {
    videoId: string | unknown;
    width?: string | number;
    height?: string | number;
    autoplay?: boolean;
    color?: string;
    onReady?: (player: YT.Player) => void;
}

export default function YouTubePlayer({
    videoId,
    width = '100%',
    height = '400',
    autoplay = false,
    color = '[&>span:first-child>span]:bg-white',
    onReady,
}: CustomYouTubePlayerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<YT.Player | null>(null);
    const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
        null,
    );

    const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(100);
    const [isMuted, setIsMuted] = useState<boolean>(false);

    /* ===============================
       LOAD YOUTUBE API (once)
    =============================== */
    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(tag);
        }
    }, []);

    /* ===============================
       INIT PLAYER
    =============================== */
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const initializePlayer = () => {
            if (!window.YT || !containerRef.current) return;

            playerRef.current = new window.YT.Player('youtube-player-custom', {
                height,
                width,
                videoId: videoId as string,
                playerVars: {
                    autoplay: autoplay ? 1 : 0,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    iv_load_policy: 3,
                    fs: 1,
                },
                events: {
                    onReady: (event: YT.PlayerEvent) => {
                        setDuration(event.target.getDuration());
                        if (onReady) onReady(event.target);
                    },
                    onStateChange: onPlayerStateChange,
                    onError: (event: YT.OnErrorEvent) => {
                        console.error('YouTube error:', event.data);
                    },
                },
            });
        };

        if (window.YT?.Player) {
            initializePlayer();
        } else {
            window.onYouTubeIframeAPIReady = initializePlayer;
        }

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId]);

    /* ===============================
       PLAYER STATE
    =============================== */
    const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
        if (!window.YT) return;

        const playing = event.data === window.YT.PlayerState.PLAYING;

        setIsPlaying(playing);

        if (playing) startTrackingProgress();
        else stopTrackingProgress();
    };

    /* ===============================
       PROGRESS TRACKING
    =============================== */
    const startTrackingProgress = () => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }

        progressIntervalRef.current = setInterval(() => {
            if (playerRef.current) {
                setCurrentTime(playerRef.current.getCurrentTime());
            }
        }, 100);
    };

    const stopTrackingProgress = () => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    };

    /* ===============================
       CONTROLS
    =============================== */
    const togglePlay = () => {
        if (!playerRef.current) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        if (!playerRef.current) return;

        setVolume(newVolume);
        playerRef.current.setVolume(newVolume);

        if (newVolume === 0) {
            setIsMuted(true);
        } else {
            setIsMuted(false);
            playerRef.current.unMute();
        }
    };

    const toggleMute = () => {
        if (!playerRef.current) return;

        if (isMuted) {
            playerRef.current.unMute();
            playerRef.current.setVolume(volume || 50);
            setIsMuted(false);
        } else {
            playerRef.current.mute();
            setIsMuted(true);
        }
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handleProgressChange = (newTime: number) => {
        if (!playerRef.current) return;
        playerRef.current.seekTo(newTime, true);
        setCurrentTime(newTime);
    };

    const skipForward = (seconds = 10) => {
        if (!playerRef.current) return;
        const newTime = Math.min(currentTime + seconds, duration);
        playerRef.current.seekTo(newTime, true);
    };

    const skipBackward = (seconds = 10) => {
        if (!playerRef.current) return;
        const newTime = Math.max(currentTime - seconds, 0);
        playerRef.current.seekTo(newTime, true);
    };

    const formatTime = (seconds: number): string => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s
                .toString()
                .padStart(2, '0')}`;
        }

        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div
            ref={containerRef}
            className="group relative w-full overflow-hidden rounded-lg bg-black shadow-2xl"
            style={{ aspectRatio: '16 / 9' }}
        >
            <div id="youtube-player-custom" className="h-full w-full" />

            <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="pointer-events-auto px-4 pt-4">
                    <Slider
                        value={[currentTime]}
                        max={duration || 0}
                        step={0.1}
                        onValueChange={(val: number[]) =>
                            handleProgressChange(val[0])
                        }
                        className={cn('cursor-pointer', color)}
                    />
                </div>

                <div className="pointer-events-auto flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <button onClick={togglePlay}>
                            {isPlaying ? (
                                <Pause className="h-5 w-5 text-white" />
                            ) : (
                                <Play className="h-5 w-5 text-white" />
                            )}
                        </button>

                        <button onClick={() => skipBackward(10)}>
                            <SkipBack className="h-5 w-5 text-white" />
                        </button>

                        <button onClick={() => skipForward(10)}>
                            <SkipForward className="h-5 w-5 text-white" />
                        </button>

                        <div className="flex items-center gap-1">
                            <button onClick={toggleMute}>
                                {isMuted ? (
                                    <VolumeX className="h-5 w-5 text-white" />
                                ) : (
                                    <Volume2 className="h-5 w-5 text-white" />
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={isMuted ? 0 : volume}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => handleVolumeChange(Number(e.target.value))}
                                className="slider h-1 w-20 cursor-pointer appearance-none rounded bg-slate-700"
                            />
                        </div>

                        <div className="ml-4 font-mono text-sm text-white">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                    </div>

                    <button onClick={toggleFullscreen}>
                        <Maximize className="h-5 w-5 text-white" />
                    </button>
                </div>
            </div>

            {!isPlaying && (
                <div
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40"
                    onClick={togglePlay}
                >
                    <div className="rounded-full bg-white/30 p-4 backdrop-blur-xs">
                        <Play className="h-12 w-12 fill-white text-white" />
                    </div>
                </div>
            )}
        </div>
    );
}
