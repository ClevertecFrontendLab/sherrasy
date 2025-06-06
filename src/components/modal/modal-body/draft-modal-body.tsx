import { Button, VStack } from '@chakra-ui/react';

import { EditIcon } from '~/assets/icons/icons';

type DraftModalBodyProps = {
    handleSaveDraft: () => void;
    handleExit: () => void;
};
export const DraftModalBody = ({ handleSaveDraft, handleExit }: DraftModalBodyProps) => (
    <VStack w='100%' gap={4} mt={8}>
        <Button colorScheme='black' w='100%' onClick={handleSaveDraft} size='lg'>
            <EditIcon color='white' mr={2} />
            Сохранить черновик
        </Button>
        <Button variant='chost' colorScheme='black' w='100%' onClick={handleExit} size='lg'>
            Выйти без сохранения
        </Button>
    </VStack>
);
