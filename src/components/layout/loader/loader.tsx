import { Circle, Spinner } from '@chakra-ui/react';

import { TestIdName } from '~/utils/testId-name.enum';

type LoaderProps = {
    type: 'app' | 'search';
};

export const Loader = ({ type }: LoaderProps) => {
    const isAppLoader = type === 'app';
    return (
        <Circle
            size={{ base: '134px', sm: `${isAppLoader ? '206px' : null}` }}
            bg='transparent'
            backgroundImage={`radial-gradient(${isAppLoader ? '70% 70%' : '50% 50%'} at 50% 50%, #c4ff61 10%, rgba(255, 255, 255, 0) 70%)`}
            display='flex'
            alignItems='center'
            justifyContent='center'
            data-test-id={type === 'app' ? TestIdName.LoaderApp : TestIdName.LoaderSearch}
        >
            <Spinner
                thickness='2px'
                speed='0.75s'
                color='black'
                size={isAppLoader ? { base: 'lg', sm: 'xl' } : { base: 'md', sm: 'lg' }}
            />
        </Circle>
    );
};
