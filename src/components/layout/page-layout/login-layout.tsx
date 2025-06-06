import { Flex, Image, Show, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import logo from '~/assets/images/logo/logo.svg';
import { AlertToastContainer } from '~/components/alert-error/alert-toast-container';
import { getAppLoading } from '~/store/app-status/selectors';
import { useAppSelector } from '~/store/hooks';

import { OverlayWithLoader } from '../overlay/overlayWithLoader';
import { LoginSidebar } from '../sidebar/login-sidebar';

type LayoutProps = PropsWithChildren;

export const LoginLayout = ({ children }: LayoutProps) => {
    const isLoading = useAppSelector(getAppLoading);
    return (
        <>
            <OverlayWithLoader isOpen={isLoading} />
            <Flex direction='column' minH='100vh' maxH='100vh'>
                <Flex flex={1} overflowY='hidden'>
                    <Flex
                        flex='1'
                        direction='column'
                        alignItems='center'
                        justifyContent='start'
                        overflowY='auto'
                        w={{ base: '100%', lg: '50%' }}
                        maxW='100%'
                        overflowX='hidden'
                        bgGradient='linear-gradient(208deg, #eaffc7 0%, #29813fd6 100%)'
                        position='relative'
                    >
                        <Image
                            src={logo}
                            alt='yee-daa logo'
                            minH={{ base: '2.375rem', lg: '4rem' }}
                            mt={{ base: '4.5rem', sm: '8.75rem', lg: '10.625rem' }}
                            mb={{ base: 3, xs: 4 }}
                        />
                        {children}
                        <Text
                            position='absolute'
                            fontSize='xs'
                            fontWeight='semibold'
                            lineHeight={4}
                            color='black'
                            bottom={5}
                            left={5}
                            zIndex={1}
                        >
                            Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                        </Text>
                        <AlertToastContainer />
                    </Flex>
                    <Show above='lg'>
                        <LoginSidebar />
                    </Show>
                </Flex>
            </Flex>
        </>
    );
};
