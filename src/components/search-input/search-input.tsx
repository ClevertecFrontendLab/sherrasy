import { SmallCloseIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ChangeEvent, KeyboardEvent, useCallback, useMemo, useRef } from 'react';

import { SearchIcon } from '~/assets/icons/icons';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    setSearchRecipeString,
    updateHasRecipes,
    updateIsFiltering,
} from '~/store/recipes/recipes-slice';
import { getActiveFilters, getHasRecipes, getRecipesSearchString } from '~/store/recipes/selectors';
import { TestIdName } from '~/utils/constant';

type SearchInputProps = {
    handleFilterRecipes: () => void;
};

export const SearchInput = ({ handleFilterRecipes }: SearchInputProps) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    const searchString = useAppSelector(getRecipesSearchString);
    const hasRecipes = useAppSelector(getHasRecipes);
    const filters = useAppSelector(getActiveFilters);

    const isSearchDisabled = useMemo(
        () => (searchString?.trim().length || 0) < 3 && !filters.allergens,
        [searchString, filters.allergens],
    );

    const isEmpty = useMemo(
        () => hasRecipes === 'false' && searchString,
        [hasRecipes, searchString],
    );

    const isNotEmpty = useMemo(
        () => hasRecipes === 'true' && searchString,
        [hasRecipes, searchString],
    );

    const handleSearchInput = useCallback(() => {
        handleFilterRecipes();
    }, [dispatch, handleFilterRecipes]);

    const handleClearSearchInput = useCallback(() => {
        dispatch(setSearchRecipeString(''));
        dispatch(updateHasRecipes('undefined'));
        dispatch(updateIsFiltering(false));
    }, [dispatch]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && searchString && searchString.trim().length >= 3) {
                e.preventDefault();
                handleSearchInput();
            }
        },
        [searchString, handleSearchInput],
    );

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            dispatch(setSearchRecipeString(value));
        },
        [dispatch],
    );

    const inputProps = useMemo(
        () => ({
            variant: 'outline',
            placeholder: 'Название или ингридиент...',
            color: 'lime.800',
            _placeholder: { color: 'lime.800' },
            _focusVisible: {
                borderColor: isEmpty ? 'red.500' : isNotEmpty ? 'lime.600' : 'blackAlpha.600',
            },
            border: isEmpty || isNotEmpty ? '2px' : '1px',
            borderColor: isEmpty ? 'red.500' : isNotEmpty ? 'lime.600' : 'blackAlpha.600',
            borderRadius: '0.25rem',
            'data-test-id': TestIdName.SearchInput,
            onKeyDown: handleKeyDown,
            ref: searchRef,
            onChange: handleChange,
            value: searchString || '',
        }),
        [isEmpty, isNotEmpty, handleKeyDown, handleChange, searchString],
    );

    return (
        <InputGroup size={{ base: 'sm', lg: 'lg' }} borderColor='blackAlpha.600' maxW='100%'>
            <Input {...inputProps} />
            {searchString && (
                <InputRightElement
                    right={8}
                    onClick={handleClearSearchInput}
                    _hover={{ cursor: 'pointer' }}
                >
                    <SmallCloseIcon />
                </InputRightElement>
            )}
            <InputRightElement
                data-test-id={TestIdName.SearchBtn}
                onClick={!isSearchDisabled ? handleSearchInput : undefined}
                _hover={{ cursor: isSearchDisabled ? 'default' : 'pointer' }}
                opacity={isSearchDisabled ? 0.5 : 1}
                pointerEvents={isSearchDisabled ? 'none' : 'auto'}
            >
                <SearchIcon />
            </InputRightElement>
        </InputGroup>
    );
};
