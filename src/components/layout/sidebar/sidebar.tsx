import { Button, Circle, Flex, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import {
    BookmarkIcon,
    HeartEyesIcon,
    PenIcon,
    PeopleIcon,
    RecommendIcon,
} from '~/assets/icons/icons';
import { useGetProfileQuery, useGetStatsQuery } from '~/query/services/profile';
import { AppRoute } from '~/utils/constant';
import { isRecipeEditOrCreatePath } from '~/utils/helpers/helpers';
import { TestIdName } from '~/utils/testId-name.enum';

import styles from './sidebar.module.css';

type SidebarProps = {
    bookmarks: number;
    people: number;
    likes: number;
    recommendations: number;
    canRecommend: boolean;
    isHidden?: boolean;
    handleCreateNewClick?: () => void;
};

const SidebarDesktop = ({
    bookmarks,
    people,
    likes,
    recommendations,
    canRecommend,
    isHidden,
    handleCreateNewClick,
}: SidebarProps) => {
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
                {canRecommend && (
                    <Button
                        variant='ghost'
                        leftIcon={<RecommendIcon color='black' />}
                        w='min-content'
                        color='lime.600'
                        bg='transparent'
                        fontSize={{ lg: 'md' }}
                        iconSpacing={{ lg: '8px' }}
                        pl={0}
                    >
                        {recommendations}
                    </Button>
                )}
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
                data-test-id={TestIdName.RecipeAddRecipeButton}
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

const SidebarMobile = ({
    bookmarks,
    people,
    likes,
    recommendations,
    canRecommend,
}: SidebarProps) => (
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
            {canRecommend && (
                <Button
                    variant='ghost'
                    leftIcon={<RecommendIcon color='black' />}
                    w='min-content'
                    color='lime.600'
                    bg='transparent'
                    fontSize={{ base: 'xs' }}
                    iconSpacing={{ base: '7px' }}
                    pl={0}
                >
                    {recommendations}
                </Button>
            )}
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

export const Sidebar = ({ type }: { type: 'desktop' | 'mobile' }) => {
    const { data: profileData } = useGetProfileQuery();
    const { data: statsData } = useGetStatsQuery();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isHidden = isRecipeEditOrCreatePath(pathname);

    const bookmarks = statsData?.bookmarks.length ?? 0;
    const people = profileData?.subscribers.length ?? 0;
    const likes = statsData?.likes.length ?? 0;
    const recommendations = statsData?.recommendationsCount ?? 0;
    const canRecommend = bookmarks > 200 && people > 100;
    const handleCreateNewClick = () => navigate(AppRoute.NewRecipe);

    return type === 'desktop' ? (
        <SidebarDesktop
            bookmarks={bookmarks}
            people={people}
            likes={likes}
            recommendations={recommendations}
            canRecommend={canRecommend}
            isHidden={isHidden}
            handleCreateNewClick={handleCreateNewClick}
        />
    ) : (
        <SidebarMobile
            bookmarks={bookmarks}
            people={people}
            likes={likes}
            recommendations={recommendations}
            canRecommend={canRecommend}
        />
    );
};
