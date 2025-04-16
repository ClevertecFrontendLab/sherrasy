import { Badge, Card, CardBody, Image, Stack, Text } from '@chakra-ui/react';

import { RecipeStep } from '~/types/recipe.interface';

type StepCardProps = {
    step: RecipeStep;
};

function StepCard({ step }: StepCardProps) {
    const { image, stepNumber, description } = step;
    return (
        <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
            {image && (
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={image}
                    alt={`Фото шаг ${stepNumber}`}
                />
            )}
            <Stack>
                <CardBody>
                    <Badge py='1px' px={{ base: '0.25rem', lg: 2 }} variant='time'>
                        <Text>Шаг {stepNumber}</Text>
                    </Badge>
                    <Text py='2'>{description}</Text>
                </CardBody>
            </Stack>
        </Card>
    );
}

export default StepCard;
