import { Button } from '@chakra-ui/react';

import { EditIcon } from '~/assets/icons/icons';

type DraftModalBodyProps = {
    handleSaveDraft?: () => void;
    handleExit?: () => void;
};
export const DraftModalBody = ({ handleSaveDraft, handleExit }: DraftModalBodyProps) => (
    <>
        <Button mt={8} colorScheme='black' w='100%' onClick={handleSaveDraft}>
            <EditIcon color='white' />
            Сохранить черновик
        </Button>
        <Button mt={4} variant='chost' colorScheme='black' w='100%' onClick={handleExit}>
            Выйти без сохранения
        </Button>
    </>
);
