import { Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { ProfileForm } from '~/components/forms/profile-form';
import { OverlayWithLoader } from '~/components/layout/overlay/overlayWithLoader';
import { Layout } from '~/components/layout/page-layout/layout';
import { AvatarUploadModal } from '~/components/modal/avatar-upload-modal/avatar-upload-modal';
import { ProfileGraphs } from '~/components/profile-graphs/profile-graphs';
import { ProfileOtherActions } from '~/components/profile-other-actions/profile-other-actions';
import { RecommendationBanner } from '~/components/recommend-banner/recommend-banner';
import { SubscribersList } from '~/components/subscribers-list/subscribers-list';
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
            <VStack w='100%' gap={{ base: 4, lg: '2.5rem' }}>
                <VStack
                    direction='column'
                    justify='center'
                    align='center'
                    mt={{ base: 4, lg: 6, xl: 8 }}
                    w='100%'
                >
                    <Heading fontSize={{ base: 'lg', lg: 'xl' }} lineHeight={7}>
                        Авторизация и персонализация
                    </Heading>
                    <AvatarUploadModal initialImage={profileData.photoLink} />
                    <ProfileForm profile={profileData} />
                </VStack>
                {statsData && (
                    <VStack gap={4} w='100%' alignItems='start'>
                        <Heading fontSize={{ base: 'lg', lg: 'xl' }} lineHeight={7}>
                            Статистика
                        </Heading>
                        <SubscribersList subscribers={profileData.subscribers} />
                        <ProfileGraphs stats={statsData.bookmarks} type='bookmarks' />
                        <ProfileGraphs stats={statsData.likes} type='likes' />
                    </VStack>
                )}
                <RecommendationBanner
                    totalBookmarks={statsData?.bookmarks.length ?? 0}
                    totalSubscribers={profileData?.subscribers.length ?? 0}
                />
                <ProfileOtherActions />
            </VStack>
        </Layout>
    );
};
