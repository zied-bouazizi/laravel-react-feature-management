import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ShortTimeAgoProps } from '@/types';

export default function ShortTimeAgo({ timestamp, className }: ShortTimeAgoProps) {
    const [timeAgo, setTimeAgo] = useState('');

    const getShortDiff = () => {
        const now = dayjs();
        const created = dayjs(timestamp);

        const diffSeconds = now.diff(created, 'second');
        if (diffSeconds < 60) return `${diffSeconds}s`;
        
        const diffMinutes = now.diff(created, 'minute');
        if (diffMinutes < 60) return `${diffMinutes}m`;
        
        const diffHours = now.diff(created, 'hour');
        if (diffHours < 24) return `${diffHours}h`;

        const diffDays = now.diff(created, 'day');
        if (diffDays < 30) return `${diffDays}d`;

        const diffMonths = now.diff(created, 'month');
        if (diffMonths < 12) return `${diffMonths}mo`;
        
        return `${now.diff(created, 'year')}y`;
    };

    useEffect(() => {
        setTimeAgo(getShortDiff());
        const interval = setInterval(() => {
            setTimeAgo(getShortDiff());
        }, 60000);

        return () => clearInterval(interval);
    }, [timestamp]);

    return <span className={className}>{timeAgo}</span>;
}
