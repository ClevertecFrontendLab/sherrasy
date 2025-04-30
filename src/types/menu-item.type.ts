export type MenuSubcategory = {
    rootCategoryId: string;
    category: string;
    title: string;
};

export type MenuItem = {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: MenuSubcategory[];
};
