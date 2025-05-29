import * as yup from 'yup';

import { ValidationMessage } from '~/utils/forms.constant';

export const recipeSchema = yup.object().shape({
    title: yup
        .string()
        .required(ValidationMessage.Required)
        .max(50, ValidationMessage.MaxNameLength),
    description: yup
        .string()
        .required(ValidationMessage.Required)
        .max(500, ValidationMessage.MaxDecriptionLength),

    time: yup
        .number()
        .required(ValidationMessage.Required)
        .positive(ValidationMessage.TimeLimit)
        .max(10000, ValidationMessage.TimeLimit),

    categoriesIds: yup
        .array()
        .required(ValidationMessage.Required)
        .min(3, ValidationMessage.CategoriesLength)
        .of(yup.string().required(ValidationMessage.Required)),

    portions: yup.number().positive(undefined).required(ValidationMessage.Required),

    image: yup.string().required(ValidationMessage.Required),

    ingredients: yup
        .array()
        .of(
            yup.object().shape({
                title: yup
                    .string()
                    .required(ValidationMessage.Required)
                    .max(50, ValidationMessage.MaxNameLength),
                count: yup
                    .number()
                    .required(ValidationMessage.Required)
                    .positive(ValidationMessage.IngredientsAmount),
                measureUnit: yup.string().required(ValidationMessage.Required),
            }),
        )
        .required(ValidationMessage.Required),

    steps: yup
        .array()
        .of(
            yup.object().shape({
                stepNumber: yup.number().required(ValidationMessage.Required),
                description: yup
                    .string()
                    .required(ValidationMessage.Required)
                    .max(300, ValidationMessage.MaxStepDecriptionLength),
                image: yup.string(),
            }),
        )
        .required(ValidationMessage.Required),
});

export type RecipeFormData = yup.InferType<typeof recipeSchema>;
