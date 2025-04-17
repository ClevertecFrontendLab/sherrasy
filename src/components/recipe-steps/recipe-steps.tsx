import { Flex, Heading } from '@chakra-ui/react';

import { RecipeStep } from '~/types/recipe.interface';

import StepCard from '../cards/step-card';

type RecipeStepsProps = {
    steps: RecipeStep[];
};

function RecipeSteps({ steps }: RecipeStepsProps) {
    const checkIsLast = (step: number) => step === steps[steps.length - 1].stepNumber;
    return (
        <Flex
            direction='column'
            mt={{ base: 1 }}
            pl={{ base: 4, sm: 5, lg: '17.75rem' }}
            pr={{ base: 4, sm: 5, lg: '17.375rem' }}
        >
            <Heading fontSize={{ base: '2xl' }} mb={{ base: 4 }}>
                Шаги приготовления
            </Heading>
            <Flex direction='column' gap={{ base: 5 }}>
                {steps.map((step) => (
                    <StepCard
                        key={step.stepNumber}
                        step={step}
                        isLast={checkIsLast(step.stepNumber)}
                    />
                ))}
            </Flex>
        </Flex>
    );
}

export default RecipeSteps;
