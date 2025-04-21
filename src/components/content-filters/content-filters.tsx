import { Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import { SearchIcon } from '~/assets/icons/icons';

import AlergiesFilter from '../allergies-filter/allergies-filter';
import FilterDrawer from '../filter-drawer/filter-drawer';

function ContentFilters() {
    return (
        <Flex direction='column' gap={{ lg: '18px' }} mb={4}>
            <Flex
                gap={{ base: 2, xs: '0.625rem' }}
                flex={1}
                w={{ base: '19.5rem', xs: '20.5rem', sm: '27.5rem', md: '28rem', lg: '32.375rem' }}
            >
                <FilterDrawer />
                <InputGroup
                    size={{ base: 'sm', lg: 'lg' }}
                    borderColor='blackAlpha.600'
                    maxW='100%'
                >
                    <Input
                        variant='outline'
                        placeholder='Название или ингридиент...'
                        _placeholder={{ color: 'lime.800' }}
                        borderRadius='0.25rem'
                        data-test-id='search-input'
                    />
                    <InputRightElement data-test-id='search-button'>
                        <SearchIcon />
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <AlergiesFilter type='filter' />
        </Flex>
    );
}
export default ContentFilters;
