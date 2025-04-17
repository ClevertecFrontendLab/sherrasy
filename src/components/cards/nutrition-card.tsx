import { Card, CardBody, Text } from '@chakra-ui/react';

type NutritionCardProps = {
    name: string;
    amount: number;
};

function NutritionCard({ name, amount }: NutritionCardProps) {
    return (
        <Card textAlign='start' px={3} py={4} borderRadius='0.875rem' variant='outline'>
            <CardBody
                p={0}
                display='flex'
                flexDirection={{ base: 'row', sm: 'column' }}
                alignItems='center'
                justifyContent='space-between'
            >
                <Text
                    fontSize={{ base: 'sm' }}
                    lineHeight={5}
                    color='blackAlpha.600'
                    w={{ base: '117px' }}
                >
                    {name}
                </Text>
                <Text fontSize={{ base: '2xl' }} lineHeight={8} fontWeight={500} color='lime.800'>
                    {amount}
                </Text>
                <Text
                    fontSize={{ base: 'xs' }}
                    lineHeight={4}
                    textTransform='uppercase'
                    w={{ base: '61px' }}
                >
                    {name === 'калорийность' ? 'ккал' : 'грамм'}
                </Text>
            </CardBody>
        </Card>
    );
}

export default NutritionCard;
