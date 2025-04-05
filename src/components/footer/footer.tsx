import { Avatar, Box, Button, Circle, Flex, Text, useMediaQuery } from '@chakra-ui/react';

import { HomeIcon, PenIcon, SearchIcon } from '~/assets/icons/icons';

import styles from './footer.module.css';

function Footer() {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    if (isDesktop) {
        return <></>;
    }
    return (
        <Box position='absolute' bottom={0} minW='100%' data-test-id='footer'>
            <Flex bg='lime.50' align='center' justify='center'>
                <Button variant='unstyled' color='blackAlpha.700' className={styles.footerBtn}>
                    <Flex direction='column' align='center' justify='center'>
                        <Circle size='2.5rem' className={styles.footerIcon}>
                            <HomeIcon color='black' />
                        </Circle>
                        <Text fontSize='xs'>Главная</Text>
                    </Flex>
                </Button>
                <Button variant='unstyled' color='blackAlpha.700' className={styles.footerBtn}>
                    <Flex direction='column' align='center' justify='center'>
                        <Circle size='2.5rem' className={styles.footerIcon}>
                            <SearchIcon color='black' />
                        </Circle>
                        <Text fontSize='xs'>Поиск</Text>
                    </Flex>
                </Button>
                <Button variant='unstyled' color='blackAlpha.700' className={styles.footerBtn}>
                    <Flex direction='column' align='center' justify='center'>
                        <Circle size='2.5rem' className={styles.footerIcon}>
                            <PenIcon color='black' />
                        </Circle>
                        <Text fontSize='xs'>Записать</Text>
                    </Flex>
                </Button>
                <Button variant='unstyled' color='blackAlpha.700' className={styles.footerBtn}>
                    <Flex direction='column' align='center' justify='center'>
                        <Avatar
                            name='Екатерина Константинопольская'
                            src='/photo-dekstop.jpg'
                            size='md'
                            maxH='2.5rem'
                            maxW='2.5rem'
                        />
                        <Text fontSize='xs'>Профиль</Text>
                    </Flex>
                </Button>
            </Flex>
        </Box>
    );
}
export default Footer;
