import { ChevronDownIcon, CloseIcon, SmallAddIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import { KeyboardEvent, useRef, useState } from 'react';

import { MultiselectItem } from '~/types/filter-item.type';

type MultiSelectProps = {
    data: MultiselectItem[];
    type: string;
    text: string;
    isActive?: boolean;
};

const MultiSelect = ({ data, type, text, isActive = true }: MultiSelectProps) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSelect = (values: string | string[]) => {
        const selectedValues = Array.isArray(values) ? values : [values];
        setSelectedItems(selectedValues);
    };

    const removeItem = (itemToRemove: string) => {
        setSelectedItems(selectedItems.filter((item) => item !== itemToRemove));
    };

    const getNameById = (id: string) => data.find((item) => item.id === id)?.name || id;

    const handleAddCustomItem = () => {
        const value = inputRef.current?.value.trim();
        if (value && !selectedItems.includes(value)) {
            setSelectedItems([...selectedItems, value]);
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
        <Menu closeOnSelect={false}>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon boxSize={5} />}
                width='100%'
                textAlign='left'
                bg='white'
                border='1px'
                _hover={{ outline: 'lime.150' }}
                _expanded={{ outline: 'lime.150', bgColor: 'white' }}
                minH='2.5rem'
                h='auto'
                fontWeight='normal'
                size={{ base: 'sm', lg: 'md' }}
                maxW={{ lg: '14.625rem' }}
                borderRadius='0.25rem'
                variant='outline'
                borderColor='blackAlpha.600'
                isDisabled={!isActive}
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
            <MenuList minWidth='240px'>
                <MenuOptionGroup type='checkbox' value={selectedItems} onChange={handleSelect}>
                    {data.map(({ id, name }) => (
                        <MenuItemOption key={id} value={id}>
                            {name}
                        </MenuItemOption>
                    ))}
                </MenuOptionGroup>
                {type === 'allergies' && (
                    <Box>
                        <InputGroup>
                            <Input
                                ref={inputRef}
                                placeholder='Другой аллерген'
                                onKeyDown={handleKeyDown}
                            />
                            <InputRightElement>
                                <IconButton
                                    aria-label='Add custom item'
                                    icon={<SmallAddIcon />}
                                    size='sm'
                                    onClick={handleAddCustomItem}
                                    variant='ghost'
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
