import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { OverlayWithLoader } from '~/components/layout/overlay/overlayWithLoader';
import { Layout } from '~/components/layout/page-layout/layout';
import { NotesSection } from '~/components/notes-section/notes-section';
import { UserBlockProfile } from '~/components/user-block/user-block-profile';
import { useGetProfileQuery, useGetStatsQuery } from '~/query/services/profile';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const { data: profileData, isLoading } = useGetProfileQuery();
    const { data } = useGetStatsQuery();
    if (isLoading) return <OverlayWithLoader isOpen={isLoading} />;
    if (!profileData) {
        navigate(-1);
        return;
    }
    console.log(data);
    return (
        <Layout>
            <Flex direction='column' justify='center' align='center' mt={{ base: 4, lg: 6, xl: 8 }}>
                <UserBlockProfile profile={profileData} />{' '}
            </Flex>
            <NotesSection notes={profileData?.notes ?? []} />
        </Layout>
    );
};
