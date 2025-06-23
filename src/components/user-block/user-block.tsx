import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useGetProfileQuery } from '~/query/services/profile';
import { AppRoute } from '~/utils/constant';
import { getBloggerCardName } from '~/utils/helpers/blogger-author-helpers';
import { updateImagePath } from '~/utils/helpers/format-images';

export const UserBlock = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetProfileQuery();
    if (isLoading || !data) return null;
    const { firstName = '', lastName = '', login = '', photoLink = '' } = data;
    const name = getBloggerCardName(firstName, lastName);
    const handleProfileRedirect = () => {
        navigate(AppRoute.Profile);
    };
    return (
        <HStack spacing={2} align='center' mr='40px' onClick={handleProfileRedirect}>
            <Avatar name={name} size={{ base: 'sm', sm: 'md' }} src={updateImagePath(photoLink)} />
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
                    @{login}
                </Text>
            </VStack>
        </HStack>
    );
};
