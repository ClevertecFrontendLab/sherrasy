import {
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    NumberInput,
    NumberInputField,
    Select,
    useMediaQuery,
} from '@chakra-ui/react';
import { Controller, UseFormReturn } from 'react-hook-form';

import { AddItemIcon, RemoveIcon } from '~/assets/icons/icons';
import { RecipeMeasureUnit } from '~/types/recipe.interface';
import { TestIdName } from '~/utils/testId-name.enum';

import { RecipeFormData } from '../forms/validation-scheme/recipe.scheme';

type RecipeIngredientRowProps = {
    index: number;
    formMethods: UseFormReturn<RecipeFormData>;
    onRemove: () => void;
    onAdd: () => void;
    isLast: boolean;
    measureUnits?: RecipeMeasureUnit[];
};

export const RecipeIngredientRow = ({
    index,
    formMethods,
    onRemove,
    onAdd,
    isLast,
    measureUnits,
}: RecipeIngredientRowProps) => {
    const {
        control,
        register,
        watch,
        formState: { errors },
    } = formMethods;
    const measureUnitValue = watch(`ingredients.${index}.measureUnit`);
    const INGREDIENTS_HEADINGS = ['Ингредиент', 'Количество', 'Единица измерения'];
    const [isMobile] = useMediaQuery('(max-width: 767px)');
    const showLabel = index === 0 && !isMobile;
    const errorText = {
        title: errors.ingredients?.[index]?.title?.message,
        count: errors.ingredients?.[index]?.count?.message,
        measureUnit: errors.ingredients?.[index]?.measureUnit?.message,
    };
    return (
        <Flex
            w='100%'
            gap={{ base: 4, sm: 0 }}
            mb={2}
            flexDir='row'
            flexWrap='wrap'
            position='relative'
        >
            <FormControl
                isInvalid={!!errors.ingredients?.[index]?.title}
                w='min-content'
                mr={{ base: 0, sm: 4 }}
            >
                {showLabel && (
                    <FormLabel
                        ml={6}
                        mb={4}
                        color='lime.600'
                        lineHeight={6}
                        fontSize='xs'
                        fontWeight='bold'
                    >
                        {INGREDIENTS_HEADINGS[0]}
                    </FormLabel>
                )}
                <Input
                    placeholder='Ингредиент'
                    {...register(`ingredients.${index}.title` as const)}
                    data-test-id={`${TestIdName.RecipeIngredientsTitle}-${index}`}
                    w={{ base: '20.5rem', sm: '15.0625rem', lg: '18.4375rem' }}
                    maxW={{ lg: '18.4375rem' }}
                />
                {errorText && <FormErrorMessage>{errorText.title}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={!!errors.ingredients?.[index]?.count} w='min-content'>
                {showLabel && (
                    <FormLabel
                        ml={3}
                        mb={4}
                        color='lime.600'
                        lineHeight={6}
                        fontSize='xs'
                        fontWeight='bold'
                    >
                        {INGREDIENTS_HEADINGS[1]}
                    </FormLabel>
                )}
                <Controller
                    control={control}
                    name={`ingredients.${index}.count`}
                    render={({ field: { onChange, value } }) => (
                        <NumberInput value={value} onChange={onChange} w='5rem' maxW='5rem'>
                            <NumberInputField
                                placeholder='100'
                                data-test-id={`${TestIdName.RecipeIngredientsCount}-${index}`}
                            />
                        </NumberInput>
                    )}
                />
                {errorText && <FormErrorMessage>{errorText.count}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.ingredients?.[index]?.measureUnit} w='min-content'>
                {showLabel && (
                    <FormLabel
                        ml={8}
                        mb={4}
                        color='lime.600'
                        lineHeight={6}
                        fontSize='xs'
                        fontWeight='bold'
                    >
                        {INGREDIENTS_HEADINGS[2]}
                    </FormLabel>
                )}
                <Controller
                    control={control}
                    name={`ingredients.${index}.measureUnit`}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            w={{ base: '192px', sm: '215px' }}
                            maxW={{ sm: '215px' }}
                            placeholder='Единица измерения'
                            color={!measureUnitValue ? 'blackAlpha.700' : 'current'}
                            _placeholder={{ color: 'blackAlpha.700' }}
                            sx={{
                                option: {
                                    color: 'black',
                                },
                            }}
                            onChange={onChange}
                            value={value}
                            isTruncated={true}
                            data-test-id={`${TestIdName.RecipeIngredientsMeasureUnit}-${index}`}
                        >
                            {measureUnits?.map((unit) => (
                                <option key={unit.name} value={unit.name}>
                                    {unit.name}
                                </option>
                            ))}
                        </Select>
                    )}
                />
                {errorText && <FormErrorMessage>{errorText.measureUnit}</FormErrorMessage>}
            </FormControl>
            {isLast ? (
                <IconButton
                    aria-label='Добавить'
                    isRound
                    variant='dark'
                    icon={<AddItemIcon w={8} h={8} />}
                    onClick={onAdd}
                    position='absolute'
                    right={-2}
                    bottom={0}
                    data-test-id={TestIdName.RecipeAddIngredientsButton}
                />
            ) : (
                <IconButton
                    aria-label='Удалить'
                    variant='ghost'
                    colorScheme='lime'
                    icon={<RemoveIcon w={{ base: 4 }} h={{ base: 4 }} />}
                    onClick={onRemove}
                    position='absolute'
                    right={-2}
                    bottom={0}
                    data-test-id={`${TestIdName.RecipeIngredientsRemoveIngredients}-${index}`}
                />
            )}
        </Flex>
    );
};
