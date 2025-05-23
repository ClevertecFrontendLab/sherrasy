import { Flex, Switch, Text, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { clearAllergens } from '~/store/recipes/recipes-slice';
import { getActiveFilters } from '~/store/recipes/selectors';
import filterData from '~/utils/data/filters-data.json';
import { TestIdName } from '~/utils/testId-name.enum';

import { MultiSelect } from '../multiselect/multiselect';

type AlergiesFilterProps = {
    type: 'drawer' | 'filter';
    isDrawerActive: boolean;
};

export const AlergiesFilter = ({ type, isDrawerActive }: AlergiesFilterProps) => {
    const { allergens } = useAppSelector(getActiveFilters);
    const isSwitchActive = Boolean(allergens && allergens?.length > 0);
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const dispatch = useAppDispatch();
    const isDrawer = type === 'drawer';
    const [isAlergensActive, setIsAlergensActive] = useState(isSwitchActive);

    useEffect(() => {
        setIsAlergensActive(isSwitchActive);
    }, [isSwitchActive]);

    const handleAlergensActive = () => {
        const newValue = !isAlergensActive;
        setIsAlergensActive(newValue);

        if (!newValue) {
            dispatch(clearAllergens());
        }
    };

    if (!isDesktop && !isDrawer) {
        return null;
    }
    return (
        <>
            <Flex
                gap={4}
                display={isDrawer ? 'flex' : { base: 'none', lg: 'flex' }}
                flexDirection={isDrawer ? 'column' : 'row'}
                minW={isDrawer ? { base: '272x', sm: '351px' } : undefined}
                w='100%'
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
                        isChecked={isAlergensActive}
                        onChange={handleAlergensActive}
                        data-test-id={
                            !isDrawer
                                ? TestIdName.AllergensSwitcher
                                : TestIdName.AllergensSwitcherFilter
                        }
                    />
                </Flex>
                <MultiSelect
                    data={filterData[2].elements}
                    type={`allergies-${type}`}
                    text='Выберите из списка...'
                    isActive={isAlergensActive}
                    isDrawerActive={isDrawerActive}
                />
            </Flex>
        </>
    );
};
