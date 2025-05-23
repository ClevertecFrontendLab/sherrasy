import { Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { AppRoute } from '~/utils/constant';

import { SignInForm } from '../forms/sign-in-form';
import { SignUpForm } from '../forms/sign-up-form';

const DEFAULT_TABS = [
    { name: 'Вход на сайт', path: AppRoute.SignIn, form: <SignInForm /> },
    { name: 'Регистрация', path: AppRoute.SignUp, form: <SignUpForm /> },
];
export const LoginTabs = () => {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const activeTabIndex = pathname === AppRoute.SignIn ? 0 : 1;
    const handleClick = (path: string) => {
        navigate(path);
    };

    return (
        <Tabs
            index={activeTabIndex}
            isLazy
            color='lime.800'
            size={{ base: 'sm', lg: 'md' }}
            w='100%'
        >
            <TabList
                borderBottomColor='blackAlpha.300'
                display='flex'
                justifyContent={{ base: 'space-evenly' }}
                sx={{
                    scrollbarWidth: 'none',
                    '::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                {DEFAULT_TABS.map(({ name, path }, i) => (
                    <Tab
                        key={`${name}-${i}`}
                        _selected={{ color: 'lime.700', borderBottomColor: 'lime.700' }}
                        minW='max-content'
                        w={{ base: '50%' }}
                        onClick={() => handleClick(path)}
                        flexShrink={0}
                        mr={isDesktop ? 4 : 0}
                    >
                        {name}
                    </Tab>
                ))}
            </TabList>
            <TabPanels p={0}>
                {DEFAULT_TABS.map(({ name, form }) => (
                    <TabPanel p={0} pt={{ base: 5, xs: 6, md: '22px' }} key={`${name}-panel`}>
                        {form}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};
