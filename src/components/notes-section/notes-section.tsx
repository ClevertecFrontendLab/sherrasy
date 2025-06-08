import {
    Button,
    Collapse,
    Heading,
    HStack,
    SimpleGrid,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';

import { useHashScroll } from '~/hooks/useHashScroll';
import { Note } from '~/types/blogger.type';

import { NoteCard } from '../cards/note-card';

type NotesSectionProps = {
    notes: Note[];
};

const DEFAULT_COLLAPSE_HEIGHTS = {
    base: 376,
    sm: 246,
    lg: 206,
    xl: 166,
};

export const NotesSection = ({ notes }: NotesSectionProps) => {
    useHashScroll();

    const [isCollapsed, setIsCollapsed] = useState(true);
    const notesAmount = notes.length;
    const isBtnVisible = notesAmount > 3;
    const toggleText = isCollapsed ? 'Показать больше' : 'Свернуть';
    const collapseHeight = useBreakpointValue(DEFAULT_COLLAPSE_HEIGHTS);

    const toggleCollapse = () => setIsCollapsed((prev) => !prev);

    return (
        <Stack
            bgColor='blackAlpha.50'
            borderRadius='1rem'
            w='100%'
            align='center'
            p={{ base: 4, md: 6 }}
            pt={{ base: 6, sm: 5 }}
            gap={{ base: 2, sm: 3, md: 4 }}
            id='notes'
        >
            <HStack alignItems='center' m={0} w='100%' mb={{ base: 4, md: 3 }}>
                <Heading fontSize={{ base: 20, md: 36 }} lineHeight='none' fontWeight={400}>
                    Заметки
                </Heading>
                <Text
                    lineHeight='none'
                    color='blackAlpha.600'
                    fontSize={{ base: 20, md: 30 }}
                    fontWeight={400}
                >
                    ({notesAmount})
                </Text>
            </HStack>
            <Collapse
                in={!isCollapsed}
                startingHeight={notesAmount !== 0 ? collapseHeight : 0}
                style={{ width: '100%' }}
            >
                {notes.length && (
                    <SimpleGrid
                        gap={4}
                        templateColumns={{
                            base: '1',
                            md: 'repeat(3, 1fr)',
                        }}
                    >
                        {notes.map((note, i) => (
                            <NoteCard key={`${note.date}-${i}`} note={note} />
                        ))}
                    </SimpleGrid>
                )}
            </Collapse>

            {isBtnVisible && (
                <Button
                    w='fit-content'
                    size={{ base: 'xs', md: 'sm' }}
                    variant='ghost'
                    mt={{ base: 3, sm: 0 }}
                    onClick={toggleCollapse}
                >
                    {toggleText}
                </Button>
            )}
        </Stack>
    );
};
