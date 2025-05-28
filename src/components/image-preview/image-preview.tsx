import { Box, Center, Image } from '@chakra-ui/react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { ImageIcon } from '~/assets/icons/icons';
import { useUniversalModal } from '~/hooks/useUniversalModal';
import { updateImagePath } from '~/utils/helpers/format-images';

interface ImagePreviewProps<T extends FieldValues> {
    name: Path<T>;
    formMethods: UseFormReturn<T>;
    isCard?: boolean;
    testId?: string;
}

export const ImagePreview = <T extends FieldValues>({
    name,
    formMethods,
    isCard,
}: ImagePreviewProps<T>) => {
    const {
        formState: { errors },
        watch,
    } = formMethods;
    const { openModal } = useUniversalModal();
    const handleOpenModal = () => {
        openModal('imageLoad');
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
            >
                {value ? (
                    <Image
                        src={updateImagePath(value)}
                        alt='yeedaa-preview'
                        objectFit='cover'
                        w='100%'
                        h='100%'
                        rounded='md'
                    />
                ) : (
                    <Box textAlign='center'>
                        <ImageIcon w={{ base: 4, lg: 8 }} h={{ base: 4, lg: 7 }} />
                    </Box>
                )}
            </Center>
        </>
    );
};
