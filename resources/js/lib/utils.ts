import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function convertToTime(decimalHours: number) {
    const sign = decimalHours >= 0 ? 1 : -1;
    const positiveHours = Math.abs(decimalHours);

    let hours = Math.floor(positiveHours);
    let minutes = Math.round((positiveHours - hours) * 60);

    if (minutes === 60) {
        hours += 1;
        minutes = 0;
    }

    const signPrefix = sign === -1 ? '-' : '';

    return `${signPrefix}${hours} jam ${minutes} menit`;
}

export function formatDuration(seconds: number): string {
    if (!seconds || seconds < 0) return '0 detik';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const parts: string[] = [];

    if (hours > 0) parts.push(`${hours} jam`);
    if (minutes > 0) parts.push(`${minutes} menit`);
    if (remainingSeconds > 0) parts.push(`${remainingSeconds} detik`);

    return parts.join(' ');
}
