import { Box, Center, Image } from '@chakra-ui/react';
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';

import { ImageIcon } from '~/assets/icons/icons';
import { useUniversalModal } from '~/hooks/useUniversalModal';
import { updateImagePath } from '~/utils/helpers/format-images';
import { TestIdName } from '~/utils/testId-name.enum';

import { ImageModalBody } from '../modal/modal-body/image-modal-body';
import { UniversalModal } from '../modal/universal-modal';

interface ImagePreviewProps<T extends FieldValues> {
    name: Path<T>;
    formMethods: UseFormReturn<T>;
    testIds: {
        block: string;
        input: string;
        preview: string;
    };
    isCard?: boolean;
}

export const ImagePreview = <T extends FieldValues>({
    name,
    formMethods,
    testIds,
    isCard,
}: ImagePreviewProps<T>) => {
    const {
        formState: { errors },
        watch,
        setValue,
    } = formMethods;
    const { isOpen, openModal, closeModal, config } = useUniversalModal();
    const handleOpenModal = () => {
        openModal('imageLoad');
    };
    const handleCloseModal = () => {
        closeModal();
    };

    const handleImageSave = (url: string) => {
        setValue(name, url as PathValue<T, Path<T>>, { shouldDirty: true });
        closeModal();
    };

    const handleImageDelete = () => {
        setValue(name, '' as PathValue<T, Path<T>>, { shouldDirty: true });
        closeModal();
    };

    const isInvalid = !!errors[name];
    const value = watch(name);
    const currentWidth = isCard ? '100%' : { base: '328px', sm: '232px', md: '353px', xl: '553px' };
    return (
        <>
            <Center
                h={isCard ? { base: '160px', sm: '100%' } : { base: '224px', md: '410px' }}
                w={currentWidth}
                minW={currentWidth}
                bg='blackAlpha.200'
                rounded='md'
                cursor='pointer'
                onClick={handleOpenModal}
                _hover={{ bg: 'blackAlpha.300' }}
                position='relative'
                borderWidth={isInvalid ? '2px' : undefined}
                borderColor={isInvalid ? 'red.500' : undefined}
                data-test-id={testIds.block}
            >
                {value ? (
                    <Image
                        src={updateImagePath(value)}
                        alt='yeedaa-preview'
                        objectFit='cover'
                        w='100%'
                        h='100%'
                        rounded='md'
                        data-test-id={testIds.preview}
                    />
                ) : (
                    <Box textAlign='center'>
                        <ImageIcon w={{ base: 4, lg: 8 }} h={{ base: 4, lg: 7 }} />
                    </Box>
                )}
            </Center>
            <UniversalModal
                isOpen={isOpen}
                onClose={handleCloseModal}
                config={config}
                testId={TestIdName.RecipeImageModal}
            >
                <ImageModalBody
                    url={value}
                    inputTestId={testIds.input}
                    handleSaveImage={handleImageSave}
                    handleDeleteImage={handleImageDelete}
                />
            </UniversalModal>
        </>
    );
};
