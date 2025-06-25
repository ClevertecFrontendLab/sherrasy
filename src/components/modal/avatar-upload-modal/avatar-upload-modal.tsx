import {
    Avatar,
    Box,
    Button,
    Heading,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useBreakpointValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import React, { CSSProperties, useRef, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

import { ImageIcon } from '~/assets/icons/icons';
import { useUploadPhotoMutation } from '~/query/services/profile';
import { updateImagePath } from '~/utils/helpers/format-images';
import { TestIdName } from '~/utils/testId-name.enum';

import { getCroppedImage } from './crop-image';

const CROP_SIZE = {
    base: 108,
    md: 206,
};

export const AvatarUploadModal = ({ initialImage }: { initialImage?: string }) => {
    const [uploadPhoto] = useUploadPhotoMutation();
    const [imageUrl, setImageUrl] = useState(initialImage);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(reader.result as string);
                onOpen();
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = (_: unknown, croppedPixels: Area) => {
        setCroppedAreaPixels(croppedPixels);
    };

    const handleCropAndSave = async () => {
        if (selectedFile && croppedAreaPixels) {
            const croppedImage = await getCroppedImage(selectedFile, croppedAreaPixels);
            const formData = new FormData();
            formData.append('file', croppedImage);

            await uploadPhoto(formData);
            setImageUrl(URL.createObjectURL(croppedImage));
            onClose();
        }
    };

    const cropSize = useBreakpointValue(CROP_SIZE) ?? 206;
    const cropperStyles: Record<string, CSSProperties> = {
        cropAreaStyle: {
            maxWidth: `${cropSize - 20}px`,
            maxHeight: `${cropSize - 20}px`,
            minWidth: `${cropSize - 20}px`,
            minHeight: `${cropSize - 20}px`,
            boxShadow: '0 0 0 9999em rgba(45, 177, 0, 0.5)',
        },
        mediaStyle: {
            width: `${cropSize}px`,
            height: `${cropSize}px`,
            objectFit: 'cover',
        },
        containerStyle: {
            width: `${cropSize}px`,
            height: `${cropSize}px`,
            position: 'relative',
        },
    };

    return (
        <Box position='relative' w='8rem' h='8rem'>
            <Avatar
                src={updateImagePath(initialImage || imageUrl || '')}
                size='2xl'
                bg='blackAlpha.400'
            >
                <IconButton
                    icon={<ImageIcon w='0.75rem' h='0.625rem' />}
                    size='xs'
                    colorScheme='black'
                    position='absolute'
                    bottom='5px'
                    right='5px'
                    borderRadius='full'
                    aria-label='Upload image'
                    onClick={() => inputRef.current?.click()}
                    outline='3px solid white'
                    color='lime.50'
                    _hover={{ bg: 'gray.700' }}
                />
            </Avatar>
            <Input
                type='file'
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                display='none'
            />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent maxW={{ base: '19.75rem', lg: '24.375rem' }} py={4}>
                    <ModalHeader>
                        <ModalCloseButton data-test-id={TestIdName.ModalClose} />
                        <Heading as='h2' fontSize='2xl' textAlign='center' flexDirection='column'>
                            Изменить <br />
                            изображение профиля
                        </Heading>
                    </ModalHeader>
                    <ModalBody overflow='hidden' py={4}>
                        <VStack gap={{ base: 4, lg: 8 }}>
                            {selectedFile && (
                                <Cropper
                                    image={selectedFile}
                                    cropShape='round'
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                    showGrid={false}
                                    style={cropperStyles}
                                />
                            )}
                            <Button
                                onClick={handleCropAndSave}
                                colorScheme='black'
                                variant='solid'
                                size='lg'
                                w='100%'
                            >
                                Кадрировать и сохранить
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};
