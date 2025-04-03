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
