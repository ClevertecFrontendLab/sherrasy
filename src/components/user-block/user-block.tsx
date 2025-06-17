import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import userAvatar from '~/assets/images/avatar/photo-dekstop.jpg';
import { AppRoute } from '~/utils/constant';
import { getBloggerCardName } from '~/utils/helpers/blogger-author-helpers';

export const UserBlock = () => {
    const name = getBloggerCardName('Екатерина', 'Константинопольская');
    const navigate = useNavigate();
    const handleProfileRedirect = () => {
        navigate(AppRoute.Profile);
    };
    return (
        <HStack spacing={2} align='center' mr='40px' onClick={handleProfileRedirect}>
            <Avatar name={name} size={{ base: 'sm', sm: 'md' }} src={userAvatar} />
            <VStack align='start' spacing={0}>
                <Text
                    fontSize={{ base: 'sm', sm: 'lg' }}
                    fontWeight={500}
                    lineHeight={{ base: 6, sm: 7 }}
                    letterSpacing='-0.0313rem'
                >
                    {name}
                </Text>
                <Text fontSize='sm' lineHeight={5} color='blackAlpha.700'>
                    @bake_and_pie
                </Text>
            </VStack>
        </HStack>
    );
};
