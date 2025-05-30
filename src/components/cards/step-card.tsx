import { Badge, Card, CardBody, Image, Stack, Text } from '@chakra-ui/react';

import { RecipeStep } from '~/types/recipe.interface';

type StepCardProps = {
    step: RecipeStep;
    isLast: boolean;
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
