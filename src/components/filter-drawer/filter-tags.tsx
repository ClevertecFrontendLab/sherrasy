import { Flex, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

import { getCategories } from '~/store/categories/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { updateFilter } from '~/store/recipes/recipes-slice';
import { RecipeFilters } from '~/types/state.type';
import filterData from '~/utils/data/filters-data.json';
import { cookBlog } from '~/utils/data/mock-cards.json';
import { getMultiselectCategories } from '~/utils/helpers/categories-helpers';
import { findNameById } from '~/utils/helpers/helpers';
import { TestIdName } from '~/utils/testId-name.enum';

type FilterTagProps = {
    filterType: keyof RecipeFilters;
    value: string;
    onRemove: (filterType: keyof RecipeFilters, value: string) => void;
};

const FilterTag = ({ filterType, value, onRemove }: FilterTagProps) => {
    const data = useAppSelector(getCategories);
    if (!data) {
        return null;
    }
    const categories = getMultiselectCategories(data);

    const getDisplayName = (id: string, type: keyof RecipeFilters): string => {
        switch (type) {
            case 'categories':
                return findNameById(categories, id, (category) => category.elements);
            case 'author':
                return findNameById(cookBlog, id, (blogger) => blogger.id);
            case 'meat_type':
                return findNameById(filterData[0].elements, id, (meat) => meat.id);
            case 'side_type':
                return findNameById(filterData[1].elements, id, (side) => side.id);
            default:
                return id;
        }
    };

    return (
        <Tag
            key={`${filterType}-${value}`}
            size='md'
            colorScheme='lime'
            data-test-id={TestIdName.FilterTag}
            variant='drawerStyle'
        >
            <TagLabel display='inline-block'>{getDisplayName(value, filterType)}</TagLabel>
            <TagCloseButton
                onClick={() => onRemove(filterType, value)}
                style={{ pointerEvents: 'auto' }}
            />
        </Tag>
    );
};

type FilterTagsProps = {
    filters: RecipeFilters;
};

export const FilterTags = ({ filters }: FilterTagsProps) => {
    const dispatch = useAppDispatch();
    const updateData = (key: keyof RecipeFilters, value: string) => {
        const selectedValues = filters[key]?.filter((id) => id !== value) ?? [];
        dispatch(updateFilter({ key, value: selectedValues, type: 'pending' }));
    };
    return (
        <Flex wrap='wrap' gap={2}>
            {Object.entries(filters).map(([filterType, filterValues]) => {
                if (!filterValues || filterValues.length === 0) return null;

                return filterValues.map((value) => (
                    <FilterTag
                        key={`${filterType}-${value}`}
                        filterType={filterType as keyof RecipeFilters}
                        value={value}
                        onRemove={updateData}
                    />
                ));
            })}
        </Flex>
    );
};
