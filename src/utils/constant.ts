export const AppRoute = {
    Main: '/',
    Vegan: '/vegan',
    Juiciest: '/juiciest',
} as const;

export const AppRouteToName: { [key: string]: string } = {
    '/': 'Главная',
    '/vegan': 'Веганская кухня',
    '/juiciest': 'Самое сочное',
};

export const TagToName: { [key: string]: string } = {
    salad: 'Салаты',
    aperitif: 'Закуски',
    'first-course': 'Первые блюда',
    'second-course': 'Вторые блюда',
    dessert: 'Десерты, выпечка',
    grilled: 'Блюда на гриле',
    vegan: 'Веганская кухня',
    kids: 'Детские блюда',
    healthy: 'Лечебное питание',
    national: 'Национальные',
    sauce: 'Соусы',
    drinks: 'Напитки',
    preparations: 'Заготовки',
};
