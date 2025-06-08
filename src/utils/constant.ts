export const DEFAULT_PAGE = 1;
export const DEFAULT_VERIFIED = 'unknown';
export const DEFAULT_ERROR_LOG = 'Falied request';

export const AppRoute = {
    Main: '/',
    Vegan: '/:categoryId/:subcategoryId',
    Juiciest: '/the-juiciest',
    Recipe: '/:categoryId/:subcategoryId/:recipeId',
    NotFound: '/not-found',
    SignIn: '/sign-in',
    SignUp: '/sign-up',
    Verification: '/verification',
    NewRecipe: '/new-recipe',
    EditRecipe: '/edit-recipe/:categoryId/:subcategoryId/:recipeId',
    CookBlog: '/blogs',
    Blogger: '/blogs/:userId',
} as const;

export const ApiBase = {
    Main: 'https://marathon-api.clevertec.ru',
    Images: 'https://training-api.clevertec.ru',
} as const;

export const CardsLimit = {
    Default: 8,
    RelativeKitchen: 5,
    New: 10,
    JuicyPreview: 4,
    CookBlogPreview: 3,
    CookBlogOthers: 9,
    All: 'all',
};

export const SortingBy = {
    Date: 'createdAt',
    Likes: 'likes',
};

export const AppRouteToName: Record<string, string> = {
    '/': 'Главная',
    '/vegan': 'Веганская кухня',
    'the-juiciest': 'Самое сочное',
    'new-recipe': 'Новый рецепт',
    blogs: 'Блоги',
};

export const NutritionToName: Record<string, string> = {
    calories: 'калорийность',
    proteins: 'белки',
    protein: 'белки',
    fats: 'жиры',
    carbohydrates: 'углеводы',
};

export enum SortingDirection {
    Ascending = 'asc',
    Descending = 'desc',
}

export enum ReducerName {
    App = 'APP',
    Category = 'CATEGORY',
    Recipe = 'RECIPE',
    User = 'USER',
    Blogger = 'BLOGGER',
}

export enum AuthStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export enum LocalStorageKey {
    Categories = 'yee-daa_categories',
    AToken = 'yee-daa_accessToken',
    VerifiedEmail = 'yee-daa_verified-email',
}
