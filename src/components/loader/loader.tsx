import { Circle, Spinner } from '@chakra-ui/react';

export const Loader = () => (
    <Circle
        size={{ base: '134px', sm: '206px' }}
        position='absolute'
        top='37%'
        left='50%'
        bg='transparent'
        backgroundImage='radial-gradient(70% 70% at 50% 50%, #c4ff61 10%, rgba(255, 255, 255, 0) 70%)'
        display='flex'
        alignItems='center'
        justifyContent='center'
        data-test-id='app-loader'
    >
        <Spinner thickness='2px' speed='0.75s' color='black' size={{ base: 'lg', sm: 'xl' }} />
    </Circle>
);
