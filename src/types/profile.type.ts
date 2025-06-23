import { RecipeDraftFormData } from '~/components/forms/validation-scheme/recipe.scheme';

import { Note } from './blogger.type';

export type Profile = {
    _id: string;
    drafts: RecipeDraftFormData[];
    email: string;
    firstName: string;
    lastName: string;
    login: string;
    notes: Note[];
    recipesIds: string[];
    subscribers: string[];
    subscriptions: string[];
    photoLink?: string;
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
