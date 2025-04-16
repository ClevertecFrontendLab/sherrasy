import { Card, CardBody, Text } from '@chakra-ui/react';

type NutritionCardProps = {
    name: string;
    amount: number;
};

function NutritionCard({ name, amount }: NutritionCardProps) {
    return (
        <Card direction='column'>
            <CardBody>
                <Text>{name}</Text>
                <Text>{amount}</Text>
                <Text>{name === 'калорийность' ? 'ккал' : 'грамм'}</Text>
            </CardBody>
        </Card>
    );
}

export default NutritionCard;
