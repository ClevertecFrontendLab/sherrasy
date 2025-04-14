export interface Recipe {
    id: number;
    name: string;
    description: string;
    tag: string;
    bookmarks: number;
    likes: number;
}
export interface RecipeWithImage extends Recipe {
    image: string;
    recommendedBy?: number | null;
}
