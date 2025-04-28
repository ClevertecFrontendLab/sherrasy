import { SmallCloseIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputRightElement, useDisclosure } from '@chakra-ui/react';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import { SearchIcon } from '~/assets/icons/icons';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setSearchRecipeString, updateIsFiltering } from '~/store/recipes/recipes-slice';
import { getFilteredRecipes, getRecipesSearchString } from '~/store/recipes/selectors';

import { AlergiesFilter } from '../allergies-filter/allergies-filter';
import { FilterDrawer } from '../filter-drawer/filter-drawer';

export const ContentFilters = () => {
    const searchRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');
    const searchString = useAppSelector(getRecipesSearchString);
    const filteredRecipies = useAppSelector(getFilteredRecipes);
    const isEmpty = (!filteredRecipies || !filteredRecipies.length) && searchString;
    const isNotEmpty = filteredRecipies && filteredRecipies.length > 0 && searchString;
    const isSearchDisabled = inputValue.trim().length < 3;
    const { isOpen: isOpenDrawer, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const handleSearchInput = () => {
        const value = inputValue.trim();
        if (value.length >= 3) {
            dispatch(setSearchRecipeString(value));
            dispatch(updateIsFiltering());
        }
    };

    const handleClearSearchInput = () => {
        setInputValue('');
        dispatch(setSearchRecipeString(null));
        dispatch(updateIsFiltering());
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.length >= 3) {
            e.preventDefault();
            handleSearchInput();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        dispatch(setSearchRecipeString(null));
        dispatch(updateIsFiltering());
    }, [dispatch]);

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
                />
                <InputGroup
                    size={{ base: 'sm', lg: 'lg' }}
                    borderColor='blackAlpha.600'
                    maxW='100%'
                >
                    <Input
                        variant='outline'
                        placeholder='Название или ингридиент...'
                        color='lime.800'
                        _placeholder={{ color: 'lime.800' }}
                        _focusVisible={{
                            borderColor: isEmpty
                                ? 'red.500'
                                : isNotEmpty
                                  ? 'lime.600'
                                  : 'blackAlpha.600',
                        }}
                        border={isEmpty || isNotEmpty ? '2px' : '1px'}
                        borderColor={
                            isEmpty ? 'red.500' : isNotEmpty ? 'lime.600' : 'blackAlpha.600'
                        }
                        borderRadius='0.25rem'
                        data-test-id='search-input'
                        onKeyDown={handleKeyDown}
                        onChange={handleInputChange}
                        ref={searchRef}
                        value={inputValue}
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
                        onClick={!isSearchDisabled ? handleSearchInput : undefined}
                        _hover={{ cursor: isSearchDisabled ? 'default' : 'pointer' }}
                        opacity={isSearchDisabled ? 0.5 : 1}
                        pointerEvents={isSearchDisabled ? 'none' : 'auto'}
                    >
                        <SearchIcon />
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <AlergiesFilter type='filter' isDrawerActive={isOpenDrawer} />
        </Flex>
    );
};
