export const DEFAULT_PAGE = 1;
export const AppRoute = {
    Main: '/',
    Vegan: '/:categoryId/:subcategoryId',
    Juiciest: '/the-juiciest',
    Recipe: '/:categoryId/:subcategoryId/:recipeId',
    NotFound: '/not-found',
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
};

export const SortingBy = {
    Date: 'createdAt',
    Likes: 'likes',
};

export enum SortingDirection {
    Ascending = 'asc',
    Descending = 'desc',
}

export const AppRouteToName: { [key: string]: string } = {
    '/': 'Главная',
    '/vegan': 'Веганская кухня',
    '/the-juiciest': 'Самое сочное',
};

export const TagToName: { [key: string]: string } = {
    salads: 'Салаты',
    snacks: 'Закуски',
    'first-dish': 'Первые блюда',
    'second-dish': 'Вторые блюда',
    dessert: 'Десерты, выпечка',
    grilled: 'Блюда на гриле',
    vegan: 'Веганская кухня',
    kids: 'Детские блюда',
    healthy: 'Лечебное питание',
    national: 'Национальные',
    sauce: 'Соусы',
    drinks: 'Напитки',
    preserves: 'Заготовки',
};

export const NutritionToName: { [key: string]: string } = {
    calories: 'калорийность',
    proteins: 'белки',
    fats: 'жиры',
    carbohydrates: 'углеводы',
};

export enum ReducerName {
    App = 'APP',
    Category = 'CATEGORY',
    Recipe = 'RECIPE',
}

export enum LocalStorageKey {
    Categories = 'yee-daa_categories',
}

export enum TestIdName {
    AllergensAddBtn = 'add-allergen-button',
    AllergensAddInput = 'add-other-allergen',
    AllergensCheckbox = 'allergen',
    AllergensMenu = 'allergens-menu',
    AllergensMenuBtn = 'allergens-menu-button',
    AllergensMenuBtnFilter = 'allergens-menu-button-filter',
    AllergensSwitcher = 'allergens-switcher',
    AllergensSwitcherFilter = 'allergens-switcher-filter',
    Breadcrumbs = 'breadcrumbs',
    BurgerCloseIcon = 'close-icon',
    BurgerNav = 'nav',
    BurgerOpenIcon = 'hamburger-icon',
    CardLink = 'card-link',
    Carousel = 'carousel',
    CarouselBack = 'carousel-back',
    CarouselForward = 'carousel-forward',
    Checkbox = 'checkbox',
    ErrorNotif = 'error-notification',
    ErrorNotifClose = 'close-alert-button',
    ErrorPageHome = 'error-page-go-home',
    FilterCategory = 'filter-menu-button-категория',
    FilterClearBtn = 'clear-filter-button',
    FilterCloseBtn = 'close-filter-drawer',
    FilterDrawer = 'filter-drawer',
    FilterFindBtn = 'find-recipe-button',
    FilterOpenBtn = 'filter-button',
    FilterTag = 'filter-tag',
    Footer = 'footer',
    Header = 'header',
    IngredientQuantity = 'ingredient-quantity',
    JuiciestLink = 'juiciest-link',
    JuiciestLinkMobile = 'juiciest-link-mobile',
    LoaderApp = 'app-loader',
    LoaderSearch = 'loader-search-block',
    LoadMoreBtn = 'load-more-button',
    MenuActive = 'active',
    SearchBtn = 'search-button',
    SearchInput = 'search-input',
    StepperDecrement = 'decrement-stepper',
    StepperIncrement = 'increment-stepper',
    Tab = 'tab',
}
