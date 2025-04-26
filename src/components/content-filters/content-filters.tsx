import { SmallCloseIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { KeyboardEvent, useEffect, useRef } from 'react';

import { SearchIcon } from '~/assets/icons/icons';
import { useAppDispatch } from '~/store/hooks';
import { setSearchRecipeString, updateIsFiltering } from '~/store/recipes/recipes-slice';

import AlergiesFilter from '../allergies-filter/allergies-filter';
import FilterDrawer from '../filter-drawer/filter-drawer';

function ContentFilters() {
    const searchRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const handleSearchInput = () => {
        if (searchRef.current) {
            const value = searchRef.current?.value.trim();
            if (value && value.length >= 3) {
                dispatch(setSearchRecipeString(value));
                dispatch(updateIsFiltering());
            }
        }
    };
    const handleClearSearchInput = () => {
        if (searchRef.current) {
            searchRef.current.value = '';
        }
        dispatch(setSearchRecipeString(null));
        dispatch(updateIsFiltering());
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchInput();
        }
    };

    useEffect(
        () => () => {
            dispatch(setSearchRecipeString(null));
            dispatch(updateIsFiltering());
        },
        [dispatch],
    );

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
                        onKeyDown={handleKeyDown}
                        ref={searchRef}
                    />
                    <InputRightElement
                        right={8}
                        onClick={handleClearSearchInput}
                        _hover={{ cursor: 'pointer' }}
                    >
                        <SmallCloseIcon />
                    </InputRightElement>
                    <InputRightElement
                        data-test-id='search-button'
                        onClick={handleSearchInput}
                        _hover={{ cursor: 'pointer' }}
                    >
                        <SearchIcon />
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <AlergiesFilter type='filter' />
        </Flex>
    );
}
export default ContentFilters;
