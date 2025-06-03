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
    newRecipesCount: 0;
    notes: Note[];
    subscribersCount: 3;
    _id: string;
};

export type BloggersFullData = {
    favorites: Blogger[];
    others: Blogger[];
};
