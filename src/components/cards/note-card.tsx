import { Card, CardBody, CardHeader, CardProps, Text } from '@chakra-ui/react';

import { Note } from '~/types/blogger.type';
import { getFormattedDate } from '~/utils/helpers/format-date';
import { TestIdName } from '~/utils/testId-name.enum';

type NoteCardProps = {
    note: Note;
} & CardProps;

export const NoteCard = ({ note }: NoteCardProps) => {
    const { date, text } = note;
    return (
        <Card
            w='100%'
            maxW='100%'
            minH={{ base: '12.75rem', sm: '15.25rem', lg: '12.75rem', xl: '10.25rem' }}
            p={6}
        >
            <CardHeader p={6} pb={4}>
                <Text fontSize='sm' color='lime.600' data-test-id={TestIdName.NotesCardDate}>
                    {getFormattedDate(date)}
                </Text>
            </CardHeader>
            <CardBody p={6} pt={0}>
                <Text
                    fontSize={{ base: 'sm' }}
                    lineHeight={{ base: 5 }}
                    w='92%'
                    data-test-id={TestIdName.NotesCardText}
                >
                    {text}
                </Text>
            </CardBody>
        </Card>
    );
};
