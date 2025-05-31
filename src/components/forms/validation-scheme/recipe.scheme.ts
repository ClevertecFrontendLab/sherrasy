import * as yup from 'yup';

export const recipeSchema = yup.object().shape({
    title: yup.string().max(50).required(),
    description: yup.string().max(500).required(),
    time: yup.number().positive().max(10000).required(),
    categoriesIds: yup.array().min(3).of(yup.string().required()).required(),
    portions: yup.number().positive().required(),
    image: yup.string().required(),
    ingredients: yup
        .array()
        .of(
            yup.object().shape({
                title: yup.string().max(50).required(),
                count: yup.number().positive().required(),
                measureUnit: yup.string().required(),
            }),
        )
        .required(),
    steps: yup
        .array()
        .of(
            yup.object().shape({
                stepNumber: yup.number().min(1).required(),
                description: yup.string().max(300).required(),
                image: yup.string(),
            }),
        )
        .required(),
});

export const draftRecipeSchema = yup.object().shape({
    title: yup.string().max(50).required(),
    description: yup.string().max(500),
    portions: yup.number().positive(),
    time: yup.number().positive().max(10000),
    ingredients: yup.array().of(
        yup.object().shape({
            title: yup.string().max(50),
            count: yup.number().min(0.01),
            measureUnit: yup.string(),
        }),
    ),
    image: yup.string(),
    categoriesIds: yup.array().of(yup.string()),
    steps: yup.array().of(
        yup.object().shape({
            stepNumber: yup.number().min(1),
            description: yup.string().max(300),
            image: yup.string(),
        }),
    ),
});

export type RecipeFormData = yup.InferType<typeof recipeSchema>;
export type RecipeDraftFormData = yup.InferType<typeof draftRecipeSchema>;
