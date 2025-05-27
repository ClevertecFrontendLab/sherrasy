import * as yup from 'yup';

import { ValidationMessage } from '~/utils/forms.constant';

export const recipeSchema = yup.object().shape({
    title: yup.string().required(' ').max(50, ValidationMessage.MaxNameLength),
    description: yup.string().required(' ').max(500, ValidationMessage.MaxDecriptionLength),

    time: yup
        .number()
        .required(' ')
        .positive(ValidationMessage.TimeLimit)
        .max(10000, ValidationMessage.TimeLimit),

    categoriesIds: yup
        .array()
        .required(' ')
        .min(3, ValidationMessage.CategoriesLength)
        .of(yup.string().required(' ')),

    portions: yup.number().required(' '),

    image: yup.string().required(' '),

    ingredients: yup
        .array()
        .required(' ')
        .of(
            yup.object().shape({
                title: yup.string().required(' ').max(50, ValidationMessage.MaxNameLength),
                count: yup.number().required(' ').positive(ValidationMessage.IngredientsAmount),
                measureUnit: yup.string().required(' '),
            }),
        ),

    steps: yup
        .array()
        .required(' ')
        .of(
            yup.object().shape({
                stepNumber: yup.number().required(' '),
                description: yup
                    .string()
                    .required(' ')
                    .max(300, ValidationMessage.MaxStepDecriptionLength),
                image: yup.string(),
            }),
        ),
});

export type RecipeFormData = yup.InferType<typeof recipeSchema>;
