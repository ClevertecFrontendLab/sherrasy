export const DEFAULT_PAGE = 1;
export const AppRoute = {
    Main: '/',
    Vegan: '/:categoryId/:subcategoryId',
    Juiciest: '/the-juiciest',
    Recipe: '/:categoryId/:subcategoryId/:recipeId',
    NotFound: '/not-found',
    SignIn: '/sign-in',
    SignUp: '/sign-up',
    Verification: '/verification',
} as const;

export const ApiBase = {
    Main: 'https://marathon-api.clevertec.ru',
    Images: 'https://training-api.clevertec.ru',
} as const;

export const FieldRegex = {
    Firstletter: /^[А-ЯЁ]/,
    Name: /^[А-ЯЁа-яё-]+$/,
    Username: /^[A-Za-z]{5,}$/,
    Password: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
    Email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,5}$/,
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

export const AppRouteToName: Record<string, string> = {
    '/': 'Главная',
    '/vegan': 'Веганская кухня',
    '/the-juiciest': 'Самое сочное',
};

export const NutritionToName: Record<string, string> = {
    calories: 'калорийность',
    proteins: 'белки',
    fats: 'жиры',
    carbohydrates: 'углеводы',
};

export const InputNameToPlaceholder: Record<string, string> = {
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'e-mail',
    username: 'Введите логин',
    password: 'Пароль для сайта',
    confirmPassword: 'Повторите пароль',
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
}

export enum AuthStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export enum LocalStorageKey {
    Categories = 'yee-daa_categories',
    AToken = 'yee-daa_accessToken',
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
    //new
    SignInForm = 'sign-in-form',
    InputLogin = 'login-input',
    InputPassword = 'password-input',
    PasswordBtn = 'password-visibility-button',
    SubmitBtn = 'submit-button',
    ForgotPassword = 'forgot-password',
    ModalSignIn = 'sign-in-error-modal',
    ModalClose = 'close-button',
    RepeatBtn = 'repeat-button',
    SignUpProgress = 'sign-up-progress',
    SignUpForm = 'sign-up-form',
    InputFirstName = 'first-name-input',
    InputLastName = 'last-name-input',
    InputEmail = 'email-input',
    InputPasswordConfirm = 'confirm-password-input',
    InputVerificationCode = 'verification-code-input',
    ModalSignUpSuccess = 'sign-up-success-modal',
    ModalEmailVerificationFailed = 'email-verification-failed-modal',
    ModalSendEmail = 'send-email-modal',
    ModalVerificationCode = 'verification-code-modal',
    ModalResetCredentials = 'reset-credentials-modal',
}
