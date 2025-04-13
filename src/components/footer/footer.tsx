import { Avatar, Box, Button, Circle, Flex, Text, useMediaQuery } from '@chakra-ui/react';

import { HomeIcon, PenIcon, SearchIcon } from '~/assets/icons/icons';

import styles from './footer.module.css';

function Footer() {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    if (isDesktop) {
        return <></>;
    }
    return (
        <Box
            minW='100%'
            maxH='84px'
            data-test-id='footer'
            sx={{ position: 'fixed !important' }}
            bottom={0}
            left={0}
            right={0}
            zIndex={10}
        >
            <Flex bg='lime.50' align='center' justify={{ base: 'center', md: 'space-evenly' }}>
                <Button
                    variant='chost'
                    color='blackAlpha.700'
                    size='lg'
                    w={{ base: '5.625rem', sm: '12rem' }}
                    className={styles.footerBtn}
                >
                    <Flex direction='column' align='center' justify='center' gap={1}>
                        <Circle
                            size='2.5rem'
                            className={styles.footerIcon}
                            mt='1px'
                            _hover={{ bg: 'transparent' }}
                            _active={{
                                bg: 'transparent',
                            }}
                            _focus={{
                                bg: 'transparent',
                            }}
                        >
                            <HomeIcon color='black' />
                        </Circle>
                        <Text fontSize='xs' lineHeight={4}>
                            Главная
                        </Text>
                    </Flex>
                </Button>
                <Button
                    variant='chost'
                    color='blackAlpha.700'
                    size='lg'
                    w={{ base: '5.625rem', sm: '12rem' }}
                    className={styles.footerBtn}
                >
                    <Flex direction='column' align='center' justify='center' gap={1}>
                        <Circle size='2.5rem' className={styles.footerIcon} mt='1px'>
                            <SearchIcon color='black' boxSize={6} />
                        </Circle>
                        <Text fontSize='xs' lineHeight={4}>
                            Поиск
                        </Text>
                    </Flex>
                </Button>
                <Button
                    variant='chost'
                    color='blackAlpha.700'
                    size='lg'
                    w={{ base: '5.625rem', sm: '12rem' }}
                    className={styles.footerBtn}
                >
                    <Flex direction='column' align='center' justify='center' gap={1}>
                        <Circle size='2.5rem' className={styles.footerIcon} mt='1px'>
                            <PenIcon color='black' boxSize={6} />
                        </Circle>
                        <Text fontSize='xs' lineHeight={4}>
                            Записать
                        </Text>
                    </Flex>
                </Button>
                <Button
                    variant='chost'
                    color='blackAlpha.700'
                    size='lg'
                    w={{ base: '5.625rem', sm: '12rem' }}
                    className={styles.footerBtn}
                >
                    <Flex direction='column' align='center' justify='center' gap={1}>
                        <Avatar
                            name='Екатерина Константинопольская'
                            src='/photo-dekstop.jpg'
                            size='md'
                            maxH='2.5rem'
                            maxW='2.5rem'
                        />
                        <Text fontSize='xs' lineHeight={4}>
                            Мой профиль
                        </Text>
                    </Flex>
                </Button>
            </Flex>
        </Box>
    );
}
export default Footer;
