import { Checkbox, Flex, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { CheckboxListItem } from '~/types/filter-item.type';

type CheckboxListProps = {
    data: CheckboxListItem;
};

const CheckboxList = ({ data }: CheckboxListProps) => {
    const { id: groupId, name: title, elements } = data;
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleCheckboxChange = (itemId: string, isChecked: boolean) => {
        const newSelectedItems = isChecked
            ? [...selectedItems, itemId]
            : selectedItems.filter((id) => id !== itemId);

        setSelectedItems(newSelectedItems);
    };

    return (
        <Flex direction='column' align='start'>
            <Text fontWeight='bold' mb={2}>
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
                    >
                        {name}
                    </Checkbox>
                ))}
            </VStack>
        </Flex>
    );
};

export default CheckboxList;
