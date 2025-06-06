import {
    Badge,
    Box,
    Card,
    CardBody,
    HStack,
    IconButton,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react';
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';

import { RemoveIcon } from '~/assets/icons/icons';
import { RecipeStep } from '~/types/recipe.interface';
import { TestIdName } from '~/utils/testId-name.enum';

import { RecipeFormData } from '../forms/validation-scheme/recipe.scheme';
import { ImagePreview } from '../image-preview/image-preview';
import { FormTextarea } from '../inputs/form-textarea/form-textarea';

type StepCardProps = {
    step: RecipeStep;
    isLast: boolean;
};

type StepCardForm = {
    index: number;
    formMethods: UseFormReturn<RecipeFormData>;
    fields: FieldArrayWithId<RecipeFormData, 'steps', 'id'>[];
    onRemove: () => void;
};

export const StepCard = ({ step, isLast }: StepCardProps) => {
    const { image, stepNumber, description } = step;
    return (
        <Card direction='row' variant='recipeStep'>
            {image && (
                <Image
                    objectFit='cover'
                    w={{ base: '9.875rem', lg: '21.625rem' }}
                    minH={{ base: '7.75rem', xs: '8rem', md: '8.0625rem', lg: '15.25rem' }}
                    src={image}
                    alt={`Фото шаг ${stepNumber}`}
                />
            )}
            <Stack>
                <CardBody>
                    <Badge
                        py={0}
                        px={{ base: '8px', lg: 2 }}
                        variant={isLast ? 'hCard' : 'time'}
                        maxW='min-content'
                    >
                        <Text>Шаг {stepNumber}</Text>
                    </Badge>
                    <Text pt={3} fontSize={{ base: 'sm' }} lineHeight={{ base: 5 }} noOfLines={4}>
                        {description}
                    </Text>
                </CardBody>
            </Stack>
        </Card>
    );
};

export const StepCardForm = ({ index, formMethods, fields, onRemove }: StepCardForm) => {
    const testIds = {
        block: `${TestIdName.RecipeStepsImageBlock}-${index}`,
        input: `${TestIdName.RecipeStepsImageBlock}-${index}-${TestIdName.InputFile}`,
        preview: `${TestIdName.RecipeStepsImageBlock}-${index}-${TestIdName.PreviewImage}`,
    };
    return (
        <Card
            w='100%'
            minW={{ base: '100%', sm: '604px', lg: '658px' }}
            maxH={{ base: undefined, sm: '180px' }}
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            key={index}
            variant='recipeStep'
        >
            <Box position='relative' w={{ base: '100%', sm: '52%' }}>
                <ImagePreview<RecipeFormData>
                    isCard
                    name={`steps.${index}.image`}
                    formMethods={formMethods}
                    testIds={testIds}
                />
            </Box>
            <CardBody display='flex' gap={4} flexDirection='column' p={4}>
                <HStack justifyContent='space-between' alignItems='center'>
                    <Badge py={0} px={{ base: '8px', lg: 2 }} variant='time' maxW='min-content'>
                        <Text>Шаг {fields?.[index]?.stepNumber}</Text>
                    </Badge>
                    {fields.length > 1 && index > 0 && (
                        <IconButton
                            aria-label='Удалить'
                            icon={<RemoveIcon />}
                            variant='ghost'
                            colorScheme='lime'
                            h={8}
                            onClick={onRemove}
                            data-test-id={`${TestIdName.RecipeStepsRemoveButton}-${index}`}
                        />
                    )}
                </HStack>
                <FormTextarea<RecipeFormData>
                    name={`steps.${index}.description`}
                    testId={`${TestIdName.RecipeStepsDescription}-${index}`}
                    formMethods={formMethods}
                />
            </CardBody>
        </Card>
    );
};
