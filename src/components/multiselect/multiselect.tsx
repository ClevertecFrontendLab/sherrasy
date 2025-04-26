import { ChevronDownIcon, ChevronUpIcon, CloseIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    Tag,
    TagLabel,
    useDisclosure,
} from '@chakra-ui/react';
import { KeyboardEvent, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { updateFilter, updateIsFiltering } from '~/store/recipes/recipes-slice';
import { getRecipesFilters } from '~/store/recipes/selectors';
import { MultiselectItem } from '~/types/filter-item.type';
import { RecipeFilters } from '~/types/state.type';

type MultiSelectProps = {
    data: MultiselectItem[];
    type: ComponentType;
    text: string;
    isActive?: boolean;
};

export type ComponentType = 'categories' | 'allergies-drawer' | 'allergies-filter' | 'author';

export type TestIdKeys = 'menu' | 'checkbox' | 'list' | 'input' | 'addBtn';

const dataTestIdByType: Record<ComponentType, Record<TestIdKeys, string>> = {
    author: { menu: '', checkbox: 'checkbox', list: '', input: '', addBtn: '' },
    categories: {
        menu: 'filter-menu-button-категория',
        checkbox: 'checkbox',
        list: '',
        input: '',
        addBtn: '',
    },
    'allergies-drawer': {
        menu: 'allergens-menu-button-filter',
        list: '',
        checkbox: `allergen`,
        input: 'add-other-allergen',
        addBtn: 'add-allergen-button',
    },
    'allergies-filter': {
        menu: 'allergens-menu-button',
        list: 'allergens-menu',
        checkbox: `allergen`,
        input: 'add-other-allergen',
        addBtn: 'add-allergen-button',
    },
};
const MultiSelect = ({ data, type, text, isActive = true }: MultiSelectProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const isAllergiesSelect = type.includes('allergies');
    const key = (isAllergiesSelect ? 'allergens' : type) as keyof RecipeFilters;
    const filterStatus = isAllergiesSelect ? 'active' : 'pending';
    const selectedItems =
        useAppSelector((state) => getRecipesFilters(state, filterStatus))[key] ?? [];
    const updateData = (values: string[]) => {
        dispatch(updateFilter({ key, value: values, type: filterStatus }));
        dispatch(updateIsFiltering());
    };

    const handleSelect = (values: string | string[]) => {
        const selectedValues = Array.isArray(values) ? values : [values];
        updateData(selectedValues);
    };

    const removeItem = (itemToRemove: string) => {
        const selectedValues = selectedItems.filter((item) => item !== itemToRemove);
        updateData(selectedValues);
    };

    const getNameById = (id: string) => data.find((item) => item.id === id)?.name || id;

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
                variant='outlineMenu'
                width='100%'
                textAlign='left'
                fontWeight='normal'
                size={{ base: 'sm', lg: 'md' }}
                maxW={{ lg: '14.625rem' }}
                borderRadius='0.25rem'
                isDisabled={!isActive}
                data-test-id={dataTestIdByType[type].menu}
            >
                {selectedItems.length > 0 ? (
                    <Flex wrap='wrap' gap={2} zIndex={10000}>
                        {selectedItems.map((item) => (
                            <Tag
                                key={item}
                                size='md'
                                variant='outline'
                                colorScheme='lime'
                                color='lime.600'
                                maxW='15.5rem'
                                data-test-id='filter-tag'
                            >
                                <TagLabel
                                    whiteSpace='nowrap'
                                    overflow='hidden'
                                    textOverflow='ellipsis'
                                    display='inline-block'
                                    maxW='12.5rem'
                                >
                                    {getNameById(item)}
                                </TagLabel>
                                <CloseIcon
                                    boxSize={2}
                                    onClick={() => {
                                        removeItem(item);
                                    }}
                                    style={{ pointerEvents: 'auto' }}
                                />
                            </Tag>
                        ))}
                    </Flex>
                ) : (
                    text
                )}
            </MenuButton>
            <MenuList minWidth='240px' data-test-id={dataTestIdByType[type].list} zIndex={8}>
                <MenuOptionGroup type='checkbox' value={selectedItems} onChange={handleSelect}>
                    {data.map(({ id, name }, i) => (
                        <MenuItemOption
                            key={id}
                            value={id}
                            data-test-id={
                                isAllergiesSelect
                                    ? `${dataTestIdByType[type].checkbox}-${i}`
                                    : `${dataTestIdByType[type].checkbox}-${name.toLowerCase()}`
                            }
                        >
                            {name}
                        </MenuItemOption>
                    ))}
                </MenuOptionGroup>
                {isAllergiesSelect && (
                    <Box>
                        <InputGroup>
                            <Input
                                ref={inputRef}
                                placeholder='Другой аллерген'
                                onKeyDown={handleKeyDown}
                                data-test-id={dataTestIdByType[type].input}
                            />
                            <InputRightElement>
                                <IconButton
                                    aria-label='Add custom item'
                                    icon={<SmallAddIcon />}
                                    size='sm'
                                    onClick={handleAddCustomItem}
                                    variant='ghost'
                                    data-test-id={dataTestIdByType[type].addBtn}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                )}
            </MenuList>
        </Menu>
    );
};

export default MultiSelect;
