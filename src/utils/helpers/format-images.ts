import { FullRecipe } from '~/types/recipe.interface';

import { ApiBase } from '../constant';

export const updateImagePath = (imageSrc: string) =>
    imageSrc ? `${ApiBase.Images}${imageSrc}` : imageSrc;

export const formatRecipeWithImages = (recipe: FullRecipe) => ({
    ...recipe,
    image: updateImagePath(recipe.image),
    steps: recipe.steps?.map((step) => ({
        ...step,
        image: updateImagePath(step.image),
    })),
});

export const formatImageToServer = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
};

export const formatImageSrcToForm = (imageSrc: string) =>
    imageSrc.substring(imageSrc.indexOf('/media'));
