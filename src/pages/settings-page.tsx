import { Flex } from '@chakra-ui/react';

import { Layout } from '~/components/layout/page-layout/layout';
import { ProfileOtherActions } from '~/components/profile-other-actions/profile-other-actions';
import { getCurrentUserId } from '~/utils/helpers/blogger-author-helpers';

export const SettingsPage = () => {
    const currentUserId = getCurrentUserId() ?? '';
    console.log(currentUserId);

    return (
        <Layout>
            <Flex direction='column' justify='center' align='center' mt={{ base: 4, lg: 6, xl: 8 }}>
                Настройки
            </Flex>
            <ProfileOtherActions />
        </Layout>
    );
};
