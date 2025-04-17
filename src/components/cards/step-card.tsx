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
            minW={['19.375rem', '20.5rem', '21.75rem', '22.25rem', '55rem', null, '41.75rem']}
            maxW={['19.375rem', '20.5rem', '21.75rem', '22.25rem', '55rem', null, '41.75rem']}
            minH={{ base: '7.75rem', xs: '8rem', md: '8.0625rem', lg: '15.25rem' }}
            maxH={{ base: '7.75rem', xs: '8rem', md: '8.0625rem', lg: '15.25rem' }}
        >
            {image && (
                <Image
                    objectFit='cover'
                    w={{ base: '158px', sm: '200px' }}
                    minH={{ base: '7.75rem', xs: '8rem', md: '8.0625rem', lg: '15.25rem' }}
                    src={image}
                    alt={`Фото шаг ${stepNumber}`}
                />
            )}
            <Stack>
                <CardBody p={2}>
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
