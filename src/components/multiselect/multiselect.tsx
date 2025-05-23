import { ChevronDownIcon, ChevronUpIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    Icon,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { KeyboardEvent, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { updateFilter } from '~/store/recipes/recipes-slice';
import { getActiveFilters, getPendingFilters } from '~/store/recipes/selectors';
import { MultiselectItem } from '~/types/filter-item.type';
import { RecipeFilters } from '~/types/state.type';
import { TestIdName } from '~/utils/testId-name.enum';

import { ScrollArea } from '../scrollarea/scrollarea';

type MultiSelectProps = {
    data: MultiselectItem[];
    type: ComponentType;
    text: string;
    isActive?: boolean;
    isDrawerActive?: boolean;
};

export type ComponentType = 'categories' | 'allergies-drawer' | 'allergies-filter' | 'author';

export type TestIdKeys = 'menu' | 'checkbox' | 'list';

const dataTestIdByType: Record<ComponentType, Record<TestIdKeys, string>> = {
    author: { menu: '', checkbox: 'checkbox', list: '' },
    categories: {
        menu: TestIdName.FilterCategory,
        checkbox: TestIdName.Checkbox,
        list: '',
    },
    'allergies-drawer': {
        menu: TestIdName.AllergensMenuBtnFilter,
        list: '',
        checkbox: TestIdName.AllergensCheckbox,
    },
    'allergies-filter': {
        menu: TestIdName.AllergensMenuBtn,
        list: TestIdName.AllergensMenu,
        checkbox: TestIdName.AllergensCheckbox,
    },
};
export const MultiSelect = ({
    data,
    type,
    text,
    isActive = true,
    isDrawerActive,
}: MultiSelectProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const isAllergiesSelect = type.includes('allergies');
    const key = (isAllergiesSelect ? 'allergens' : type) as keyof RecipeFilters;
    const filterStatus = isAllergiesSelect ? 'active' : 'pending';
    const selectedItems =
        useAppSelector(filterStatus === 'active' ? getActiveFilters : getPendingFilters)[key] ?? [];
    const updateData = (values: string[]) => {
        dispatch(updateFilter({ key, value: values, type: filterStatus }));
    };
    const isIdShowing =
        (type === 'allergies-drawer' && isDrawerActive) ||
        (type === 'allergies-filter' && !isDrawerActive);
    const inputTestId = isIdShowing ? TestIdName.AllergensAddInput : '';
    const buttonTestId = isIdShowing ? TestIdName.AllergensAddBtn : '';

    const returnFocusToInput = () => {
        setTimeout(() => {
            inputRef.current?.focus();
            if (window.Cypress) {
                document
                    .querySelector<HTMLInputElement>(`[data-test-id="${inputTestId}"]`)
                    ?.focus();
            }
        }, 50);
    };

    const handleSelect = (values: string | string[]) => {
        const selectedValues = Array.isArray(values) ? values : [values];
        updateData(selectedValues);
        returnFocusToInput();
    };

    const removeItem = (itemToRemove: string) => {
        const selectedValues = selectedItems.filter((item) => item !== itemToRemove);
        updateData(selectedValues);
    };

    const getNameById = (id: string) => data.find((item) => item.id === id)?.name || id;

    const getNameByCategories = (id: string) =>
        data.find((item) => item.elements === id)?.name || id;

    const handleAddCustomItem = () => {
        const value = inputRef.current?.value.trim();
        if (value && !selectedItems.includes(value)) {
            const selectedValues = [...selectedItems, value];
            updateData(selectedValues);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCustomItem();
        }
    };

    return (
        <Menu
            closeOnSelect={false}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            variant='customMenu'
            colorScheme='blackAlpha'
        >
            <MenuButton
                as={Button}
                rightIcon={
                    !isOpen ? <ChevronDownIcon boxSize={5} /> : <ChevronUpIcon boxSize={5} />
                }
                borderColor={selectedItems.length > 0 ? 'lime.150' : undefined}
                py={1}
                variant='outlineMenu'
                color='blackAlpha.700'
                width='100%'
                textAlign='left'
                fontWeight='normal'
                size={{ base: 'sm', lg: 'md' }}
                lineHeight={6}
                maxW={{ lg: `${type === 'allergies-filter' ? '14.625rem' : '100%'}` }}
                borderRadius='0.25rem'
                isDisabled={!isActive}
                data-test-id={dataTestIdByType[type].menu}
            >
                {selectedItems.length > 0 ? (
                    <Flex wrap='wrap' gap={2}>
                        {selectedItems.map((item: string) => (
                            <Tag
                                key={item}
                                size='md'
                                colorScheme='lime'
                                data-test-id={
                                    !isDrawerActive && type === 'allergies-filter'
                                        ? 'filter-tag'
                                        : ''
                                }
                            >
                                <TagLabel display='inline-block'>
                                    {type === 'categories'
                                        ? getNameByCategories(item)
                                        : getNameById(item)}
                                </TagLabel>
                                {!isDrawerActive && type === 'allergies-filter' && (
                                    <TagCloseButton
                                        as={Icon}
                                        onClick={() => {
                                            removeItem(item);
                                        }}
                                        style={{ pointerEvents: 'auto' }}
                                    />
                                )}
                            </Tag>
                        ))}
                    </Flex>
                ) : (
                    text
                )}
            </MenuButton>

            <MenuList
                minWidth='240px'
                minW={{ base: '308px', sm: '351px' }}
                maxW={{ base: '308px', sm: '351px' }}
                data-test-id={dataTestIdByType[type].list}
                zIndex={8}
            >
                <ScrollArea extraStylesType='multiselect'>
                    <MenuOptionGroup
                        overflowY='auto'
                        type='checkbox'
                        value={selectedItems}
                        onChange={handleSelect}
                    >
                        {data.map(({ id, elements, name }, i) => (
                            <MenuItemOption
                                key={id}
                                value={type === 'categories' ? elements : id}
                                data-test-id={
                                    isAllergiesSelect
                                        ? `${isIdShowing ? `${dataTestIdByType[type].checkbox}-${i}` : ''}`
                                        : `${dataTestIdByType[type].checkbox}-${name.toLowerCase()}`
                                }
                            >
                                <Text
                                    maxW='90%'
                                    whiteSpace='nowrap'
                                    overflow='hidden'
                                    textOverflow='ellipsis'
                                    fontSize='sm'
                                >
                                    {name}
                                </Text>
                            </MenuItemOption>
                        ))}
                    </MenuOptionGroup>
                </ScrollArea>
                {isAllergiesSelect && (
                    <Flex alignItems='center' p={2} pl={6} w='100%' gap={2}>
                        <Input
                            ref={inputRef}
                            placeholder='Другой аллерген'
                            onKeyDown={handleKeyDown}
                            data-test-id={inputTestId}
                            size='sm'
                            flex={1}
                            autoFocus={isOpen}
                            _placeholder={{ color: 'lime.800' }}
                            _focusVisible={{ borderColor: 'lime.600' }}
                            color='lime.800'
                            borderRadius={6}
                        />
                        <IconButton
                            aria-label='Add custom item'
                            icon={<SmallAddIcon minW={3} minH={3} />}
                            size='sm'
                            onClick={handleAddCustomItem}
                            variant='ghost'
                            data-test-id={buttonTestId}
                            p={0}
                            minW='24px !important'
                            h='24px !important'
                            borderRadius='50%'
                            color='white'
                            bg='lime.600'
                        />
                    </Flex>
                )}
            </MenuList>
        </Menu>
    );
};
