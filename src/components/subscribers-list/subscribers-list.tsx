import { Center, Grid, Heading, HStack } from '@chakra-ui/react';
import { useMemo } from 'react';

import { PeopleIcon } from '~/assets/icons/icons';
import { useGetAllUsersQuery } from '~/query/services/profile';
import { getSubscribersText } from '~/utils/helpers/get-plural-label-name';
import { getSubscribersList } from '~/utils/helpers/helpers';

import { SubscriberCard } from '../cards/user-cards/subscriber-card';

export const SubscribersList = ({ subscribers }: { subscribers: string[] }) => {
    const { data: allUsers } = useGetAllUsersQuery();

    const users = useMemo(() => {
        if (!allUsers) return [];
        return getSubscribersList(allUsers, subscribers);
    }, [allUsers, subscribers]);

    const count = subscribers.length;
    const label = getSubscribersText(count);

    return (
        <Center display='flex' flexDirection='column'>
            <HStack w='100%'>
                <PeopleIcon />
                <Heading size='xs' lineHeight={4} fontWeight='semibold' color='lime.600'>
                    {label}
                </Heading>
            </HStack>
            {count > 0 && (
                <Grid
                    templateColumns={{
                        base: '1fr',
                        sm: 'repeat(2, 1fr)',
                        xl: 'repeat(3, 1fr)',
                    }}
                    gap={4}
                    width='100%'
                    maxW='100%'
                    autoRows='1fr'
                >
                    {users.map((user) => (
                        <SubscriberCard key={user.id} user={user} />
                    ))}
                </Grid>
            )}
        </Center>
    );
};
