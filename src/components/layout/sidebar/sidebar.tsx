import { Button, Circle, Flex, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { BookmarkIcon, HeartEyesIcon, PenIcon, PeopleIcon } from '~/assets/icons/icons';
import { AppRoute } from '~/utils/constant';
import { isRecipeEditOrCreatePath } from '~/utils/helpers/helpers';

import styles from './sidebar.module.css';

const bookmarks = 185;
const people = 589;
const likes = 587;

export const Sidebar = () => {
    const { pathname } = useLocation();
    const isHidden = isRecipeEditOrCreatePath(pathname);
    const navigate = useNavigate();
    const handleCreateNewClick = () => navigate(AppRoute.NewRecipe);
    if (isHidden) return null;
    return (
        <Flex
            direction={{ lg: 'column' }}
            align='center'
            justify={{ lg: 'space-between' }}
            h={{ lg: 'calc(100vh - 80px)' }}
            w={{ lg: '180px' }}
            position='fixed'
            top={{ lg: '96px' }}
            right={{
                lg: 0,
                '2xl': 'calc((100vw - 1920px)/2)',
            }}
            zIndex={{ base: '10' }}
        >
            <Flex flexDirection={{ lg: 'column' }} gap={{ lg: 6 }}>
                <Button
                    variant='ghost'
                    leftIcon={<BookmarkIcon color='black' />}
                    w='min-content'
                    color='lime.600'
                    bg='transparent'
                    fontSize={{ lg: 'md' }}
                    iconSpacing={{ lg: '8px' }}
                    pl={0}
                >
                    {bookmarks}
                </Button>
                <Button
                    variant='ghost'
                    leftIcon={<PeopleIcon color='black' />}
                    w='min-content'
                    color='lime.600'
                    bg='transparent'
                    fontSize={{ lg: 'md' }}
                    iconSpacing={{ lg: '8px' }}
                    pl='1px'
                    pr={4}
                >
                    {people}
                </Button>
                <Button
                    variant='ghost'
                    leftIcon={<HeartEyesIcon color='black' />}
                    w='min-content'
                    color='lime.600'
                    bg='transparent'
                    fontSize={{ lg: 'md' }}
                    iconSpacing={{ lg: '8px' }}
                    pl='2px'
                >
                    {likes}
                </Button>
            </Flex>
            <Button
                variant='сhost'
                justifySelf='flex-end'
                color='blackAlpha.700'
                size='lg'
                w='208px'
                h='208px'
                className={styles.sidebarBtn}
                onClick={handleCreateNewClick}
            >
                <Flex direction='column' align='center' justify='baseline' gap={3} mr={7} mb={0}>
                    <Circle size='3rem' className={styles.sidebarIcon}>
                        <PenIcon color='black' boxSize={6} />
                    </Circle>
                    <Text fontSize='xs' lineHeight={4} fontWeight='normal' color='blackAlpha.700'>
                        Записать рецепт
                    </Text>
                </Flex>
            </Button>
        </Flex>
    );
};

export const SidebarMobile = () => (
    <Flex
        direction={{ base: 'row' }}
        alignSelf='end'
        align='center'
        right={{
            base: '60px',
            xs: '64px',
            sm: '76px',
        }}
        zIndex={{ base: '10' }}
    >
        <Flex gap={{ base: 0 }}>
            <Button
                variant='ghost'
                leftIcon={<BookmarkIcon color='black' />}
                w='min-content'
                color='lime.600'
                bg='transparent'
                fontSize={{ base: 'xs' }}
                iconSpacing={{ base: '7px' }}
                pl={0}
            >
                {bookmarks}
            </Button>
            <Button
                variant='ghost'
                leftIcon={<PeopleIcon color='black' />}
                w='min-content'
                color='lime.600'
                bg='transparent'
                fontSize={{ base: 'xs' }}
                iconSpacing={{ base: '5px' }}
                pl='1px'
                pr={{ base: 3, xs: 4, sm: 3, md: 4 }}
            >
                {people}
            </Button>
            <Button
                variant='ghost'
                leftIcon={<HeartEyesIcon color='black' />}
                w='min-content'
                color='lime.600'
                bg='transparent'
                fontSize={{ base: 'xs' }}
                iconSpacing={{ base: '7px' }}
                pl='2px'
            >
                {likes}
            </Button>
        </Flex>
    </Flex>
);
