import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { ProfileForm } from '~/components/forms/profile-form';
import { OverlayWithLoader } from '~/components/layout/overlay/overlayWithLoader';
import { Layout } from '~/components/layout/page-layout/layout';
import { ProfileGraphs } from '~/components/profile-graphs/profile-graphs';
import { ProfileOtherActions } from '~/components/profile-other-actions/profile-other-actions';
import { useGetProfileQuery, useGetStatsQuery } from '~/query/services/profile';
import { ProfileStats } from '~/types/profile.type';

export const SettingsPage = () => {
    const navigate = useNavigate();
    const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery();
    const { data: statsData } = useGetStatsQuery();
    if (isLoadingProfile) return <OverlayWithLoader isOpen={isLoadingProfile} />;
    if (!profileData) {
        navigate(-1);
        return;
    }
    const sampleData: ProfileStats = {
        bookmarks: [
            { date: '2025-06-16', count: 10 },
            { date: '2025-06-17', count: 25 },
            { date: '2025-06-18', count: 35 },
            { date: '2025-06-19', count: 50 },
            { date: '2025-06-20', count: 65 },
            { date: '2025-06-21', count: 72 },
        ],
        likes: [
            { date: '2025-06-16', count: 15 },
            { date: '2025-06-17', count: 30 },
            { date: '2025-06-18', count: 45 },
            { date: '2025-06-19', count: 60 },
            { date: '2025-06-20', count: 75 },
            { date: '2025-06-22', count: 90 },
        ],
        recommendationsCount: 0,
    };
    return (
        <Layout>
            <Flex direction='column' justify='center' align='center' mt={{ base: 4, lg: 6, xl: 8 }}>
                <ProfileForm />
            </Flex>
            {statsData && <ProfileGraphs stats={sampleData} />}
            <ProfileOtherActions />
        </Layout>
    );
};
