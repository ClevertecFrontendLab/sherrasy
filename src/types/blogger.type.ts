import { FullRecipe } from './recipe.interface';

export type Note = {
    text: string;
    date: string;
};

export type Blogger = {
    bookmarksCount: number;
    firstName: string;
    isFavorite: boolean;
    lastName: string;
    login: string;
    newRecipesCount: number;
    notes: Note[];
    subscribersCount: number;
    _id: string;
};
export type BloggerFull = {
    bloggerInfo: {
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
        login: string;
        notes: Note[];
        recipes: FullRecipe[];
        subscribers: string[];
    };
    isFavorite: boolean;
    totalBookmarks: number;
    totalSubscribers: number;
};

export type BloggersFullData = {
    favorites: Blogger[];
    others: Blogger[];
};
