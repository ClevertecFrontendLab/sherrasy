export type Subcategory = {
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
