import { Flex, Heading } from '@chakra-ui/react';

import { RecipeStep } from '~/types/recipe.interface';

import StepCard from '../cards/step-card';

type RecipeStepsProps = {
    steps: RecipeStep[];
};

function RecipeSteps({ steps }: RecipeStepsProps) {
    return (
        <Flex direction='column'>
            <Heading> Шаги приготовления</Heading>
            {steps.map((step) => (
                <StepCard key={step.stepNumber} step={step} />
            ))}
        </Flex>
    );
}

export default RecipeSteps;
