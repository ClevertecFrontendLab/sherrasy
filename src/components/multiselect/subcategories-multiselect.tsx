import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    Tag,
    TagLabel,
    Text,
    useDisclosure,
    useMediaQuery,
} from '@chakra-ui/react';
import { FieldError, FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';

import { getCategories } from '~/store/categories/selectors';
import { useAppSelector } from '~/store/hooks';
import { InputNameToLabel } from '~/utils/forms.constant';
import { TestIdName } from '~/utils/testId-name.enum';

import { ScrollArea } from '../scrollarea/scrollarea';

interface SubcategoriesMultiSelectProps<T extends FieldValues> {
    name: Path<T>;
    formMethods: UseFormReturn<T>;
}

export const SubcategoriesMultiSelect = <T extends FieldValues>({
    name,
    formMethods,
}: SubcategoriesMultiSelectProps<T>) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isDesktop] = useMediaQuery('(min-width: 1440px)', {
        fallback: false,
    });
    const categories = useAppSelector(getCategories);
    const {
        formState: { errors },
        setValue,
        watch,
    } = formMethods;
    const subcategories = categories.flatMap((item) => item.subCategories);
    const selectedItems: string[] = watch(name) || [];
    const maxVisible = isDesktop ? 2 : 1;
    const isInvalid = !!errors[name];
    const errorText = (errors[name] as FieldError)?.message;
    const placeholderText = 'Выберите из списка...';
    const handleSelect = (values: string | string[]) => {
        const selectedValues = Array.isArray(values) ? values : [values];
        setValue(name, selectedValues as PathValue<T, Path<T>>, { shouldDirty: true });
    };

    const getNameById = (id: string) => subcategories.find((item) => item._id === id)?.title || id;

    return (
        <FormControl isInvalid={isInvalid}>
            <Flex direction='row' justifyContent='space-between'>
                <FormLabel
                    color='black'
                    fontSize={{ base: 'sm', lg: 'md' }}
                    lineHeight={{ base: 5, lg: 6 }}
                    fontWeight='semibold'
                    htmlFor={name.toString()}
                >
                    {InputNameToLabel[name]}
                </FormLabel>
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
                            !isOpen ? (
                                <ChevronDownIcon boxSize={5} />
                            ) : (
                                <ChevronUpIcon boxSize={5} />
                            )
                        }
                        border={isInvalid ? '2px' : '1px'}
                        borderColor={
                            selectedItems.length > 0
                                ? 'lime.150'
                                : isInvalid
                                  ? 'red.500'
                                  : undefined
                        }
                        py={1}
                        variant='outlineMenu'
                        color='blackAlpha.700'
                        width='100%'
                        textAlign='left'
                        fontWeight='normal'
                        size={{ base: 'sm', lg: 'md' }}
                        lineHeight={6}
                        minWidth={{ base: '12.375rem', sm: '14.5rem', lg: '21.875rem' }}
                        maxW='21.875rem'
                        borderRadius='0.25rem'
                        data-test-id={TestIdName.RecipeCategories}
                    >
                        {selectedItems.length > 0 ? (
                            <Flex wrap='wrap' gap={2} alignItems='center'>
                                {selectedItems.slice(0, maxVisible).map((item) => (
                                    <Tag key={item} size='md' colorScheme='lime'>
                                        <TagLabel display='inline-block'>
                                            {getNameById(item)}
                                        </TagLabel>
                                    </Tag>
                                ))}
                                {selectedItems.length > maxVisible && (
                                    <Tag size='md' colorScheme='lime'>
                                        <TagLabel display='inline-block'>
                                            +{selectedItems.length - maxVisible}
                                        </TagLabel>
                                    </Tag>
                                )}
                            </Flex>
                        ) : (
                            placeholderText
                        )}
                    </MenuButton>

                    <MenuList
                        minWidth='240px'
                        minW={{ base: '308px', sm: '351px' }}
                        maxW={{ base: '308px', sm: '351px' }}
                        zIndex={8}
                    >
                        <ScrollArea extraStylesType='multiselect'>
                            <MenuOptionGroup
                                overflowY='auto'
                                type='checkbox'
                                value={selectedItems}
                                onChange={handleSelect}
                            >
                                {subcategories.map(({ _id, title }) => (
                                    <MenuItemOption key={_id} value={_id}>
                                        <Text
                                            maxW='90%'
                                            whiteSpace='nowrap'
                                            overflow='hidden'
                                            textOverflow='ellipsis'
                                            fontSize='sm'
                                        >
                                            {title}
                                        </Text>
                                    </MenuItemOption>
                                ))}
                            </MenuOptionGroup>
                        </ScrollArea>
                    </MenuList>
                </Menu>
            </Flex>
            {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
        </FormControl>
    );
};
