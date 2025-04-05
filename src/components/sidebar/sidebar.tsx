import { Button, Circle, Flex, Spacer, Text } from '@chakra-ui/react';

import { BookmarkIcon, HeartEyesIcon, PenIcon, PeopleIcon } from '~/assets/icons/icons';

import styles from './sidebar.module.css';

function Sidebar() {
    const bookmarks = 185;
    const people = 589;
    const likes = 587;
    return (
        <Flex direction='column'>
            <Button leftIcon={<BookmarkIcon color='black' />} color='lime.600' bg='transparent'>
                {bookmarks}
            </Button>
            <Button leftIcon={<PeopleIcon color='black' />} color='lime.600' bg='transparent'>
                {people}
            </Button>
            <Button leftIcon={<HeartEyesIcon color='black' />} color='lime.600' bg='transparent'>
                {likes}
            </Button>
            <Spacer />
            <Button variant='unstyled' color='blackAlpha.700' className={styles.sidebarBtn}>
                <Flex direction='column' align='center' justify='center'>
                    <Circle size='2.5rem' className={styles.sidebarIcon}>
                        <PenIcon color='black' />
                    </Circle>
                    <Text fontSize='xs'>Записать рецепт</Text>
                </Flex>
            </Button>
        </Flex>
    );
}
export default Sidebar;
