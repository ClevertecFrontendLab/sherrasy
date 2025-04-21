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
    useDisclosure,
} from '@chakra-ui/react';

import { FilterIcon } from '~/assets/icons/icons';
import filterData from '~/utils/data/filters-data.json';
import { cookBlog } from '~/utils/data/mock-cards.json';
import categoriesData from '~/utils/data/mock-dishes.json';
import { getMultiselectCategories } from '~/utils/helpers';

import AlergiesFilter from '../allergies-filter/allergies-filter';
import CheckboxList from '../checkbox-list/checkbox-list';
import MultiSelect from '../multiselect/multiselect';

function FilterDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                size={{ base: 'sm', lg: 'lg' }}
                maxW={{ base: 4, lg: 8 }}
                p={0}
                variant='outline'
                borderColor='blackAlpha.600'
                onClick={onOpen}
            >
                <FilterIcon boxSize={{ base: 4, lg: 6 }} />
            </Button>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <Text size='2xl' lineHeight={8} fontWeight='bold'>
                            Фильтр
                        </Text>
                        <DrawerCloseButton
                            color='white'
                            bgColor='black'
                            borderRadius='100%'
                            top={3.5}
                        />
                    </DrawerHeader>

                    <DrawerBody display='flex' flexDirection='column' gap={4}>
                        <MultiSelect
                            data={getMultiselectCategories(categoriesData)}
                            type='categories'
                            text='Категория'
                        />

                        <MultiSelect data={cookBlog} type='author' text='Поиск по автору' />
                        <CheckboxList data={filterData[0]} />
                        <CheckboxList data={filterData[1]} />
                        <AlergiesFilter type='drawer' />
                    </DrawerBody>

                    <DrawerFooter gap={2}>
                        <Button
                            variant='outline'
                            colorScheme='black'
                            size={{ base: 'xs', lg: 'sm' }}
                            w={{ base: 4, lg: 'initial' }}
                        >
                            <Text ml={2} display={{ base: 'none', lg: 'inline' }}>
                                Очистить фильтр
                            </Text>
                        </Button>
                        <Button
                            variant='solid'
                            bg='black'
                            color='white'
                            size={{ base: 'xs', lg: 'sm' }}
                            px={{ base: 2, lg: '12px' }}
                            py={{ base: 1, lg: '6px' }}
                        >
                            Найти рецепт
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
export default FilterDrawer;
