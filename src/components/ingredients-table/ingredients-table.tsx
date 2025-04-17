import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useState } from 'react';

import { Ingredient } from '~/types/recipe.interface';

type IngredientsTableProps = {
    portions: number;
    ingredients: Ingredient[];
};

function IngredientsTable({ portions, ingredients }: IngredientsTableProps) {
    const [scale, setScale] = useState<number>(1);

    const handlePortionsChange = (value: number) => {
        const scaleFactor = value / portions;
        setScale(scaleFactor);
    };

    return (
        <TableContainer mt={{ base: 5 }}>
            <Table variant='customTable' colorScheme='blackAlpha'>
                <Thead>
                    <Tr>
                        <Th w={{ base: '188px' }} color='lime.600'>
                            Ингридиенты
                        </Th>
                        <Th
                            display='flex'
                            alignItems='center'
                            w={{ base: '140px' }}
                            gap={{ base: 3 }}
                        >
                            <Text pl={0} color='lime.600'>
                                Порций
                            </Text>
                            <NumberInput
                                defaultValue={portions}
                                min={1}
                                max={20}
                                w={{ base: '4.375rem' }}
                                onChange={(value) => handlePortionsChange(+value)}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody fontSize={{ base: 'sm' }} lineHeight={5}>
                    {ingredients.map(({ title, count, measureUnit }) => (
                        <Tr key={title}>
                            <Td>{title}</Td>
                            <Td>
                                {+count > 0 && +count * scale} {measureUnit}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default IngredientsTable;
