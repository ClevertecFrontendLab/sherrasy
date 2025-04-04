import { Avatar, Box, Button, Flex } from '@chakra-ui/react';

import { HomeIcon, PenIcon, SearchIcon } from '~/assets/icons/icons';

function Footer() {
    // const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    // if (isDesktop) {
    //     return <></>;
    // }
    return (
        <Box position='absolute' bottom={0} minW='100%' data-test-id='footer'>
            <Flex p={4} bg='lime.50' align='center' justify='center'>
                <Button leftIcon={<HomeIcon />}>Главная</Button>
                <Button leftIcon={<SearchIcon />}>Поиск</Button>
                <Button leftIcon={<PenIcon />}>Записать</Button>
                <Button
                    leftIcon={
                        <Avatar name='Екатерина Константинопольская' src='/photo-dekstop.jpg' />
                    }
                >
                    Профиль
                </Button>
            </Flex>
        </Box>
    );
}
export default Footer;
