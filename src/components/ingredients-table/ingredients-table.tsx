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

export const IngredientsTable = ({ portions, ingredients }: IngredientsTableProps) => {
    const [scale, setScale] = useState<number>(1);

    const handlePortionsChange = (value: number) => {
        const scaleFactor = value / portions;
        setScale(scaleFactor);
    };

    return (
        <TableContainer mt={{ base: '1.375rem', sm: 5, lg: 9 }}>
            <Table
                variant='customTable'
                colorScheme='blackAlpha'
                w={{ base: '20.5rem', sm: '37.75rem', lg: '36.125rem', xl: '41.75rem' }}
            >
                <Thead>
                    <Tr>
                        <Th color='lime.600'>Ингридиенты</Th>
                        <Th
                            display='flex'
                            alignItems='center'
                            justifyContent='flex-end'
                            gap={{ base: 3, sm: 3.5 }}
                        >
                            <Text pl={0} color='lime.600'>
                                Порций
                            </Text>
                            <NumberInput
                                defaultValue={portions}
                                min={1}
                                max={20}
                                w={{ base: '4.375rem', sm: '5.625rem' }}
                                onChange={(value) => handlePortionsChange(+value)}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper data-test-id='increment-stepper' />
                                    <NumberDecrementStepper data-test-id='decrement-stepper' />
                                </NumberInputStepper>
                            </NumberInput>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody fontSize={{ base: 'sm' }} lineHeight={5}>
                    {ingredients.map(({ title, count, measureUnit }, i) => (
                        <Tr key={title}>
                            <Td>{title}</Td>
                            <Td data-test-id={`ingredient-quantity-${i}`}>
                                {+count > 0 && +count * scale} {measureUnit}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
