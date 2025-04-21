export type MultiselectItem = {
    id: string;
    name: string;
};

export type CheckboxListItem = {
    id: string;
    name: string;
    elements: MultiselectItem[];
};
