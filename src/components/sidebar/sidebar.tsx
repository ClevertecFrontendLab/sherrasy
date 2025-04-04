import { Button, Flex, Spacer } from '@chakra-ui/react';

import { BookmarkIcon, HeartEyesIcon, PenIcon, PeopleIcon } from '~/assets/icons/icons';

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
            <Button leftIcon={<PenIcon />}>Записать рецепт</Button>
        </Flex>
    );
}
export default Sidebar;
