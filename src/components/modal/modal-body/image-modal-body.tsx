import { Box, Button, Center, Image, Input, VStack } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { ImageIcon } from '~/assets/icons/icons';
import { useUploadFileMutation } from '~/query/services/file';
import { formatImageToServer, updateImagePath } from '~/utils/helpers/format-images';
import { TestIdName } from '~/utils/testId-name.enum';

type ImageModalBody = {
    handleSaveImage: (url: string) => void;
    handleDeleteImage: () => void;
    inputTestId: string;
    url?: string;
};

type FileFormData = {
    file: FileList | null;
};

export const ImageModalBody = ({
    handleSaveImage,
    handleDeleteImage,
    url,
    inputTestId,
}: ImageModalBody) => {
    const [uploadFile, { data, isLoading, isSuccess }] = useUploadFileMutation();
    const { register, handleSubmit, watch, reset } = useForm<FileFormData>();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const file = watch('file')?.[0];
    const previewUrl = file ? URL.createObjectURL(file) : null;
    const showImage = !!file || !!url;
    const formattedImage = url ? updateImagePath(url) : undefined;
    const handleUpload = async () => {
        if (!file) return;
        const fileData = formatImageToServer(file);
        await uploadFile(fileData);
    };

    useEffect(() => {
        if (isSuccess) {
            handleSaveImage(data.url);
            reset();
        }
    }, [isSuccess]);

    return (
        <Center w={{ base: '15.75rem', lg: '20.75rem' }} alignItems='center'>
            <form
                onSubmit={handleSubmit(handleUpload)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '10px',
                }}
            >
                <Center
                    w='12.875rem'
                    h='12.875rem'
                    bg='blackAlpha.200'
                    rounded='md'
                    cursor='pointer'
                    onClick={() => inputRef.current?.click()}
                    _hover={{ bg: 'blackAlpha.300' }}
                    position='relative'
                    overflow='hidden'
                    data-test-id={TestIdName.RecipeImageModalImageBlock}
                    mb={2}
                >
                    <Input
                        type='file'
                        accept='image/*'
                        {...register('file')}
                        ref={(e) => {
                            register('file').ref(e);
                            inputRef.current = e;
                        }}
                        display='none'
                        data-test-id={inputTestId}
                    />
                    {showImage ? (
                        <Image
                            src={previewUrl || formattedImage}
                            alt='Preview'
                            objectFit='cover'
                            w='100%'
                            h='100%'
                            rounded='md'
                            data-test-id={TestIdName.RecipeImageModalPreviewImage}
                        />
                    ) : (
                        <Box textAlign='center'>
                            <ImageIcon w={{ base: 4, lg: 8 }} h={{ base: 4, lg: 7 }} />
                        </Box>
                    )}
                </Center>
                {(file || url) && (
                    <VStack gap='1.625rem' mt={5} w={{ base: '15.75rem', lg: '20.75rem' }}>
                        <Button
                            size='lg'
                            colorScheme='black'
                            w='100%'
                            type={file ? 'submit' : 'button'}
                            isLoading={isLoading}
                            loadingText='Загрузка...'
                            onClick={!file ? () => {} : undefined}
                        >
                            Сохранить
                        </Button>
                        <Button
                            size='lg'
                            variant='ghost'
                            colorScheme='black'
                            w='100%'
                            onClick={handleDeleteImage}
                        >
                            Удалить
                        </Button>
                    </VStack>
                )}
            </form>
        </Center>
    );
};
