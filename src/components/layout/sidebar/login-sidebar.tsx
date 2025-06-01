import { Center, Image, Text } from '@chakra-ui/react';

import authImage from '~/assets/images/login-image.png';

export const LoginSidebar = () => (
    <Center w='50%' position='relative' overflow='hidden'>
        <Image
            src={authImage}
            alt='yee-daa login image'
            width='100%'
            height='100%'
            objectFit='cover'
        />
        <Text
            position='absolute'
            fontSize='xs'
            fontWeight='semibold'
            lineHeight={4}
            color='black'
            bottom={5}
            right={5}
        >
            — Лучший сервис для ваших кулинарных побед
        </Text>
    </Center>
);
