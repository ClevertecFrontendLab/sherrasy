import { Checkbox, Flex, Text, VStack } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { updateFilter, updateIsFiltering } from '~/store/recipes/recipes-slice';
import { getRecipesFilters } from '~/store/recipes/selectors';
import { CheckboxListItem } from '~/types/filter-item.type';
import { RecipeFilters } from '~/types/state.type';

type CheckboxListProps = {
    data: CheckboxListItem;
    type: 'meat_type' | 'side_type';
};

const CheckboxList = ({ data, type }: CheckboxListProps) => {
    const { id: groupId, name: title, elements } = data;
    const key = type as keyof RecipeFilters;
    const selectedItems = useAppSelector((state) => getRecipesFilters(state, 'pending'))[key] ?? [];
    const dispatch = useAppDispatch();

    const handleCheckboxChange = (itemId: string, isChecked: boolean) => {
        const selectedValues = isChecked
            ? [...selectedItems, itemId]
            : selectedItems.filter((id) => id !== itemId);
        dispatch(updateFilter({ key, value: selectedValues, type: 'pending' }));
        dispatch(updateIsFiltering());
    };

    return (
        <Flex direction='column' align='start'>
            <Text fontWeight='bold' mb={2} fontSize='md' lineHeight={6}>
                {title}
            </Text>
            <VStack align='start' spacing={2}>
                {elements.map(({ id, name }) => (
                    <Checkbox
                        key={`${groupId}-${id}`}
                        value={id}
                        isChecked={selectedItems.includes(id)}
                        onChange={(e) => handleCheckboxChange(id, e.target.checked)}
                        colorScheme='lime'
                        iconColor='black'
                        fontSize='sm'
                        lineHeight={5}
                        data-test-id={`checkbox-${name.toLocaleLowerCase()}`}
                    >
                        {name}
                    </Checkbox>
                ))}
            </VStack>
        </Flex>
    );
};

export default CheckboxList;
