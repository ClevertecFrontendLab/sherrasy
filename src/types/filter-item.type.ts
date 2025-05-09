export type MultiselectItem = {
    id: string;
    name: string;
    elements?: string;
};

export type CheckboxListItem = {
    id: string;
    name: string;
    elements: MultiselectItem[];
};
