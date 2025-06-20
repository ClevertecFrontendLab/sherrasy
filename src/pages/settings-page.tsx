import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { ProfileForm } from '~/components/forms/profile-form';
import { OverlayWithLoader } from '~/components/layout/overlay/overlayWithLoader';
import { Layout } from '~/components/layout/page-layout/layout';
import { ProfileGraphs } from '~/components/profile-graphs/profile-graphs';
import { ProfileOtherActions } from '~/components/profile-other-actions/profile-other-actions';
import { useGetProfileQuery, useGetStatsQuery } from '~/query/services/profile';

export const SettingsPage = () => {
    const navigate = useNavigate();
    const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery();
    const { data: statsData } = useGetStatsQuery();
    if (isLoadingProfile) return <OverlayWithLoader isOpen={isLoadingProfile} />;
    if (!profileData) {
        navigate(-1);
        return;
    }
    return (
        <Layout>
            <Flex direction='column' justify='center' align='center' mt={{ base: 4, lg: 6, xl: 8 }}>
                <ProfileForm />
            </Flex>
            {statsData && (
                <>
                    <ProfileGraphs stats={statsData.bookmarks} type='bookmarks' />
                    <ProfileGraphs stats={statsData.likes} type='likes' />
                </>
            )}
            <ProfileOtherActions />
        </Layout>
    );
};
