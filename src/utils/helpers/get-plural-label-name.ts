type PluralForms = {
    singular: string;
    few: string;
    many: string;
};

const getPluralLabelName = (count: number, forms: PluralForms): string => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    const isSingular = lastDigit === 1 && lastTwoDigits !== 11;
    const isFew = [2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits);

    if (isSingular) {
        return `${count} ${forms.singular}`;
    }
    if (isFew) {
        return `${count} ${forms.few}`;
    }
    return `${count} ${forms.many}`;
};

export const getRecipeText = (count: number): string =>
    getPluralLabelName(count, {
        singular: 'новый рецепт',
        few: 'новых рецепта',
        many: 'новых рецептов',
    });

export const getLikeText = (count: number): string =>
    getPluralLabelName(count, {
        singular: 'лайк',
        few: 'лайка',
        many: 'лайков',
    });

export const getBookmarkText = (count: number): string =>
    getPluralLabelName(count, {
        singular: 'сохранение',
        few: 'сохранения',
        many: 'сохранений',
    });

export const getSubscribersText = (count: number): string =>
    getPluralLabelName(count, {
        singular: 'подписчик',
        few: 'подписчика',
        many: 'подписчиков',
    });
