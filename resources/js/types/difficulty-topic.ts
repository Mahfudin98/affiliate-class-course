export interface DifficultyLevel {
    id: number;
    name: 'Begginer' | 'Intermediate' | 'Advanced';
    level_order?: number;
}

export interface Topic {
    id: number;
    name: string;
    icon: string;
    slug: string;
}
