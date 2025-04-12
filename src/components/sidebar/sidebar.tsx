import { Button, Circle, Flex, Text } from '@chakra-ui/react';

import { BookmarkIcon, HeartEyesIcon, PenIcon, PeopleIcon } from '~/assets/icons/icons';

import styles from './sidebar.module.css';

function Sidebar() {
    const bookmarks = 185;
    const people = 589;
    const likes = 587;
    return (
        <Flex
            direction={{ base: 'row', lg: 'column' }}
            align='center'
            justify={{ lg: 'space-between' }}
            h={{ lg: 'calc(100vh - 80px)' }}
            w={{ lg: '180px' }}
            position='fixed'
            top={{ base: 3, lg: '96px' }}
            right={{ base: '64px', md: '76px', lg: 0 }}
            zIndex='10'
        >
            <Flex flexDirection={{ lg: 'column' }} gap={6}>
                <Button
                    variant='ghost'
                    leftIcon={<BookmarkIcon color='black' />}
                    w='min-content'
                    color='lime.600'
                    bg='transparent'
                    fontSize={{ base: 'xs', lg: 'md' }}
                    iconSpacing={{ base: '7px', lg: '8px' }}
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
                    fontSize={{ base: 'xs', lg: 'md' }}
                    iconSpacing={{ base: '5px', lg: '8px' }}
                    pl='1px'
                >
                    {people}
                </Button>
                <Button
                    variant='ghost'
                    leftIcon={<HeartEyesIcon color='black' />}
                    w='min-content'
                    color='lime.600'
                    bg='transparent'
                    fontSize={{ base: 'xs', lg: 'md' }}
                    iconSpacing={{ base: '7px', lg: '8px' }}
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
                display={{ base: 'none', lg: 'block' }}
            >
                <Flex direction='column' align='center' justify='baseline' gap={3} mr={7} mb={1}>
                    <Circle size='3rem' className={styles.sidebarIcon}>
                        <PenIcon color='black' boxSize={6} />
                    </Circle>
                    <Text fontSize='xs' lineHeight={4} color='blackAlpha.700'>
                        Записать рецепт
                    </Text>
                </Flex>
            </Button>
        </Flex>
    );
}
export default Sidebar;
