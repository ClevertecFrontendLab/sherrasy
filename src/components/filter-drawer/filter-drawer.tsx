import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';

import { FilterIcon } from '~/assets/icons/icons';
import { getCategories } from '~/store/categories/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { clearFilters, updateCurrentFilters } from '~/store/recipes/recipes-slice';
import { getPendingFilters } from '~/store/recipes/selectors';
import filterData from '~/utils/data/filters-data.json';
import { cookBlog } from '~/utils/data/mock-cards.json';
import { getMultiselectCategories } from '~/utils/helpers';
import { TestIdName } from '~/utils/testId-name.enum';

import { AlergiesFilter } from '../allergies-filter/allergies-filter';
import { CheckboxList } from '../checkbox-list/checkbox-list';
import { MultiSelect } from '../multiselect/multiselect';
import { ScrollArea } from '../scrollarea/scrollarea';
import { FilterTags } from './filter-tags';

type FilterDrawerProps = {
    isOpenDrawer: boolean;
    handleOpen: () => void;
    handleClose: () => void;
    handleFilterRecipes: () => void;
};

export const FilterDrawer = ({
    isOpenDrawer,
    handleOpen,
    handleClose,
    handleFilterRecipes,
}: FilterDrawerProps) => {
    const filtersData = useAppSelector(getPendingFilters);
    const isFiltersFilled = Object.values(filtersData).some((filter) => filter?.length ?? 0 > 0);
    const dispatch = useAppDispatch();
    const data = useAppSelector(getCategories);
    if (!data) {
        return null;
    }
    const handleFilterCards = () => {
        dispatch(updateCurrentFilters());
        handleFilterRecipes();
        handleClose();
    };
    const handleClearFilters = () => {
        dispatch(clearFilters());
    };

    return (
        <>
            <Button
                size={{ base: 'sm', lg: 'lg' }}
                maxW={{ base: 4, lg: 8 }}
                p={0}
                variant='outline'
                borderColor='blackAlpha.600'
                onClick={handleOpen}
                data-test-id={TestIdName.FilterOpenBtn}
            >
                <FilterIcon boxSize={{ base: 4, lg: 6 }} />
            </Button>
            <Drawer
                isOpen={isOpenDrawer}
                placement='right'
                onClose={() => {
                    handleClearFilters();
                    handleClose();
                }}
            >
                <DrawerOverlay backdropFilter='blur(2px)' bgColor='blackAlpha.300' />
                <DrawerContent
                    minW={{ base: '320px', sm: '399px' }}
                    data-test-id={TestIdName.FilterDrawer}
                >
                    <DrawerHeader>
                        <Text size='2xl' lineHeight={8} fontWeight='bold'>
                            Фильтр
                        </Text>
                        <DrawerCloseButton
                            color='white'
                            bgColor='black'
                            borderRadius='100%'
                            top={3.5}
                            data-test-id={TestIdName.FilterCloseBtn}
                        />
                    </DrawerHeader>
                    <ScrollArea extraStylesType='drawer-filters'>
                        <DrawerBody>
                            <VStack align='start' gap={4} mb={4}>
                                <MultiSelect
                                    data={getMultiselectCategories(data)}
                                    type='categories'
                                    text='Категория'
                                />

                                <MultiSelect data={cookBlog} type='author' text='Поиск по автору' />
                                <CheckboxList data={filterData[0]} type='meat_type' />
                                <CheckboxList data={filterData[1]} type='side_type' />
                                <AlergiesFilter type='drawer' isDrawerActive={isOpenDrawer} />
                            </VStack>
                            <FilterTags filters={filtersData} />
                        </DrawerBody>
                    </ScrollArea>
                    <DrawerFooter gap={2}>
                        <Button
                            variant='outline'
                            colorScheme='black'
                            size={{ base: 'xs', lg: 'sm' }}
                            data-test-id={TestIdName.FilterClearBtn}
                            onClick={handleClearFilters}
                        >
                            Очистить фильтр
                        </Button>
                        <Button
                            variant='solid'
                            bg='black'
                            color='white'
                            size={{ base: 'xs', lg: 'sm' }}
                            px={{ base: 2, lg: '12px' }}
                            py={{ base: 1, lg: '6px' }}
                            data-test-id={TestIdName.FilterFindBtn}
                            onClick={handleFilterCards}
                            isDisabled={!isFiltersFilled}
                            pointerEvents={!isFiltersFilled ? 'none' : 'auto'}
                        >
                            Найти рецепт
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
