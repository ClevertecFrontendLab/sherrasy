import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { Ingredient } from '~/types/recipe.interface';

type IngredientsTableProps = {
    ingredients: Ingredient[];
};

function IngredientsTable({ ingredients }: IngredientsTableProps) {
    return (
        <TableContainer>
            <Table variant='striped' colorScheme='black'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Ингридиенты</Th>
                        <Th>Порций</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ingredients.map(({ title, count, measureUnit }) => (
                        <Tr>
                            <Td>{title}</Td>
                            <Td>
                                {count} {measureUnit}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default IngredientsTable;
