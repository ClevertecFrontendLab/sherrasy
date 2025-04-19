export const AppRoute = {
    Main: '/',
    Vegan: '/:categoryId/:subcategoryId',
    Juiciest: '/juiciest',
    Recipe: '/:categoryId/:subcategoryId/:recipeId',
} as const;

export const AppRouteToName: { [key: string]: string } = {
    '/': 'Главная',
    '/vegan': 'Веганская кухня',
    '/juiciest': 'Самое сочное',
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
