import { Button, VStack } from '@chakra-ui/react';

type ImageModalBody = {
    handleSaveImage: () => void;
    handleDeleteImage: () => void;
};
export const ImageModalBody = ({ handleSaveImage, handleDeleteImage }: ImageModalBody) => (
    <>
        <VStack gap='1.625rem'>
            <Button colorScheme='black' w='100%' onClick={handleSaveImage}>
                Сохранить
            </Button>
            <Button variant='chost' colorScheme='black' w='100%' onClick={handleDeleteImage}>
                Удалить
            </Button>
        </VStack>
    </>
);
