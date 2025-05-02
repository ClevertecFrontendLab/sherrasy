export type Subcategory = {
    _id: string;
    rootCategoryId: string;
    category: string;
    title: string;
};

export type Category = {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: Subcategory[];
};
