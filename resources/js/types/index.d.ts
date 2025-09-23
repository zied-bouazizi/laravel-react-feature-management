import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at: string;
    permissions: string[];
    roles: string[];
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

export type PaginatedData<T = any> = {
    data: T[];
    links: PaginationLink[];
    meta: PaginationMeta;
}

export type Comment = {
    id: number;
    comment: string;
    created_at: string;
    user: User;
}

export type Feature = {
    id: number;
    name: string;
    description: string;
    user: User;
    created_at: string;
    upvote_count: number;
    user_has_upvoted: boolean;
    user_has_downvoted: boolean;
    comments: Comment[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export interface ShortTimeAgoProps {
    timestamp: string;
    className?: string; 
}

export interface AlertProps {
    message?: string;
    trigger?: number;
}

export interface ConfirmDeleteProps {
  show?: boolean;
  onClose?: () => void;
  onDelete?: () => void;
  processing?: boolean;
  itemName?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}
