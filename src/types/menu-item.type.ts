export type MenuSubcategory = {
    id: string;
    name: string;
};

export type MenuItem = {
    groupName: string;
    tag: string;
    elements: MenuSubcategory[];
};
