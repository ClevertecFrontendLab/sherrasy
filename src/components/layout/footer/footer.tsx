import { Avatar, Box, Button, Circle, Flex, Text, useMediaQuery } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { HomeIcon, PenIcon, SearchIcon } from '~/assets/icons/icons';
import userAvatar from '~/assets/images/avatar/photo-dekstop.jpg';
import { AppRoute } from '~/utils/constant';
import { TestIdName } from '~/utils/testId-name.enum';

import styles from './footer.module.css';

export const Footer = () => {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const navigate = useNavigate();
    const handleCreateNewClick = () => navigate(AppRoute.NewRecipe);
    const handleMainClick = () => navigate(AppRoute.Main);
    return (
        <Box
            minW='100%'
            maxH='84px'
            data-test-id={TestIdName.Footer}
            sx={{ position: 'fixed !important' }}
            display={isDesktop ? 'none' : 'block'}
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
                            onClick={handleMainClick}
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
                    onClick={handleCreateNewClick}
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
                    <Flex
                        h={{ base: '61px' }}
                        direction='column'
                        align='center'
                        justify='center'
                        gap={{ base: 1.5, sm: 1 }}
                    >
                        <Avatar
                            name='Екатерина Константинопольская'
                            src={userAvatar}
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
};
