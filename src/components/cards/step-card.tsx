import { Badge, Card, CardBody, Image, Stack, Text } from '@chakra-ui/react';

import { RecipeStep } from '~/types/recipe.interface';

type StepCardProps = {
    step: RecipeStep;
    isLast: boolean;
};

function StepCard({ step, isLast }: StepCardProps) {
    const { image, stepNumber, description } = step;
    return (
        <Card
            direction='row'
            overflow='hidden'
            variant='outline'
            minW={['19.375rem', '20.5rem', '37.25rem', '37.75rem', '36.125rem', null, '41.75rem']}
            maxW={['19.375rem', '20.5rem', '37.25rem', '37.75rem', '36.125rem', null, '41.75rem']}
            maxH={{ base: '7.75rem', xs: '8rem', md: '8.0625rem', lg: '15.25rem' }}
        >
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
                <CardBody p={{ base: 2, lg: '1.375rem', xl: '1.25rem 1.5rem' }}>
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
}

export default StepCard;
