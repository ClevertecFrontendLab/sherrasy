import { Card, CardBody, Text } from '@chakra-ui/react';

type NutritionCardProps = {
    name: string;
    amount: number;
};

function NutritionCard({ name, amount }: NutritionCardProps) {
    return (
        <Card
            textAlign='start'
            px={3}
            py={4}
            borderRadius='0.875rem'
            variant='outline'
            w={{ base: '20.5rem', sm: '10.8125rem', lg: '8.4375rem', xl: '9.3125rem' }}
        >
            <CardBody
                p={0}
                display='flex'
                flexDirection={{ base: 'row', sm: 'column' }}
                alignItems='center'
                justifyContent='space-between'
                textAlign={{ sm: 'center' }}
                gap={{ sm: 3 }}
            >
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
}

export default NutritionCard;
