import { Flex, Switch, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { useAppDispatch } from '~/store/hooks';
import { clearAllergens } from '~/store/recipes/recipes-slice';
import filterData from '~/utils/data/filters-data.json';

import MultiSelect from '../multiselect/multiselect';

type AlergiesFilterProps = {
    type: 'drawer' | 'filter';
};

function AlergiesFilter({ type }: AlergiesFilterProps) {
    const [isAlergensActive, setIsAlergensActive] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const isDrawer = type === 'drawer';
    const handleAlergensActive = () => {
        setIsAlergensActive((prev) => !prev);
        if (isAlergensActive) {
            dispatch(clearAllergens());
        }
    };
    return (
        <>
            <Flex
                gap={4}
                display={isDrawer ? 'flex' : { base: 'none', lg: 'flex' }}
                flexDirection={isDrawer ? 'column' : 'row'}
            >
                <Flex
                    display='flex'
                    alignItems='center'
                    justifyContent={isDrawer ? 'start' : 'center'}
                    gap={2}
                >
                    <Text mb='0' w='max-content' ml={isDrawer ? 0 : { lg: 2, '2xl': 0 }}>
                        Исключить мои аллергены
                    </Text>
                    <Switch
                        size='md'
                        maxH='20px'
                        colorScheme='lime'
                        onChange={handleAlergensActive}
                        data-test-id={
                            !isDrawer ? 'allergens-switcher' : 'allergens-switcher-filter'
                        }
                    />
                </Flex>
                <MultiSelect
                    data={filterData[2].elements}
                    type={`allergies-${type}`}
                    text='Выберите из списка...'
                    isActive={isAlergensActive}
                />
            </Flex>
        </>
    );
}
export default AlergiesFilter;
