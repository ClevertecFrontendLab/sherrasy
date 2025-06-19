import { RecipeDraftFormData } from '~/components/forms/validation-scheme/recipe.scheme';

import { Note } from './blogger.type';

export type Profile = {
    drafts: RecipeDraftFormData[];
    email: string;
    firstName: string;
    lastName: string;
    login: string;
    notes: Note[];
    recipesIds: string[] | null;
    subscribers: string[] | null;
    subscriptions: string[] | null;
    _id: string;
};

export type ProfileStat = {
    date: string;
    count: number;
};

export type ProfileStats = {
    bookmarks: ProfileStat[];
    likes: ProfileStat[];
    recommendationsCount: number;
};
