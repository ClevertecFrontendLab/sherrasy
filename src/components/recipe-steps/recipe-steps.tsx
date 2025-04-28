import { Flex, Heading } from '@chakra-ui/react';

import { RecipeStep } from '~/types/recipe.interface';

import { StepCard } from '../cards/step-card';

type RecipeStepsProps = {
    steps: RecipeStep[];
};

export const RecipeSteps = ({ steps }: RecipeStepsProps) => {
    const checkIsLast = (step: number) => step === steps[steps.length - 1].stepNumber;
    return (
        <Flex
            direction='column'
            mt={{ base: 6, lg: 9, xl: '2.375rem' }}
            pl={{ base: 4, sm: 5, lg: '17.75rem' }}
            pr={{ base: 4, sm: 5, lg: '17.375rem' }}
        >
            <Heading
                fontWeight={{ base: 'medium', xl: 'semibold' }}
                fontSize={{ base: '2xl', lg: '5xl' }}
                lineHeight={{ base: 8, lg: 'none' }}
                mb={{ base: '1.125rem', xl: '1.375rem' }}
                alignSelf='start'
            >
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
};
