import { Card, CardBody, Text } from '@chakra-ui/react';

type NutritionCardProps = {
    name: string;
    amount: number;
};

export const NutritionCard = ({ name, amount }: NutritionCardProps) => (
    <Card variant='nutrition'>
        <CardBody>
            <Text
                fontSize={{ base: 'sm' }}
                lineHeight={5}
                color='blackAlpha.600'
                w={{ base: '117px' }}
            >
                {name}
            </Text>
            <Text
                fontSize={{ base: '2xl', sm: '4xl' }}
                lineHeight={{ base: 8, sm: 10 }}
                fontWeight={500}
                color='lime.800'
            >
                {amount}
            </Text>
            <Text
                fontSize={{ base: 'xs', sm: 'sm' }}
                lineHeight={{ base: 4, sm: 5 }}
                textTransform='uppercase'
                w={{ base: '61px' }}
            >
                {name === 'калорийность' ? 'ккал' : 'грамм'}
            </Text>
        </CardBody>
    </Card>
);
