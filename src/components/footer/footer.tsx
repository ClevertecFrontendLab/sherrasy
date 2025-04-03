import { Box, Flex, useMediaQuery } from '@chakra-ui/react';

function Footer() {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    if (isDesktop) {
        return <></>;
    }
    return (
        <Box position='absolute' bottom={0} minW='100%'>
            <Flex p={4} bg='lime.50' align='center' justify='center'>
                <div>Главная</div>
                <div>Поиск</div>
                <div>Записать</div>
                <div>Профиль</div>
            </Flex>
        </Box>
    );
}
export default Footer;
