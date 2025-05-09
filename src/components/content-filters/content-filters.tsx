import { Flex, useDisclosure } from '@chakra-ui/react';

import { AlergiesFilter } from '../allergies-filter/allergies-filter';
import { FilterDrawer } from '../filter-drawer/filter-drawer';
import { SearchInput } from '../search-input/search-input';

type ContentFiltersProps = {
    handleFilterRecipes: () => void;
};

export const ContentFilters = ({ handleFilterRecipes }: ContentFiltersProps) => {
    const { isOpen: isOpenDrawer, onOpen, onClose } = useDisclosure();

    return (
        <Flex direction='column' gap={{ lg: '18px' }} mb={4}>
            <Flex
                gap={{ base: 2, xs: '0.625rem' }}
                flex={1}
                w={{ base: '19.5rem', xs: '20.5rem', sm: '27.5rem', md: '28rem', lg: '32.375rem' }}
            >
                <FilterDrawer
                    isOpenDrawer={isOpenDrawer}
                    handleOpen={onOpen}
                    handleClose={onClose}
                    handleFilterRecipes={handleFilterRecipes}
                />
                <SearchInput handleFilterRecipes={handleFilterRecipes} />
            </Flex>
            <AlergiesFilter type='filter' isDrawerActive={isOpenDrawer} />
        </Flex>
    );
};
