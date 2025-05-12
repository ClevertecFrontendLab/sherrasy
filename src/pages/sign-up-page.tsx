import { Flex } from '@chakra-ui/react';

import { LoginLayout } from '~/components/layout/login-layout';
import { LoginTabs } from '~/components/tabs/login-tabs';

export const SignUpPage = () => (
    <LoginLayout>
        <Flex
            h='468px'
            mt={{ base: '40px', sm: '56px', lg: '80px' }}
            w={{ base: '90%', sm: '60%' }}
        >
            <LoginTabs />
        </Flex>
    </LoginLayout>
);
