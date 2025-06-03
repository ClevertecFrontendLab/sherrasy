import { Heading, Image, Link, Text, VStack } from '@chakra-ui/react';

import errorImage from '~/assets/images/error-image.svg';
import { Layout } from '~/components/layout/page-layout/layout';
import { AppRoute } from '~/utils/constant';
import { TestIdName } from '~/utils/testId-name.enum';

export const NotFoundPage = () => (
    <Layout>
        <VStack height='100%' alignItems='center' justifyContent='center' gap='2rem' p='2rem'>
            <Image
                minH={{ base: '108px', lg: '206px' }}
                maxW={{ base: '108px', lg: '206px' }}
                src={errorImage}
                alt='error-img'
            />
            <VStack maxW={{ base: '252px', lg: '332px' }} textAlign='center'>
                <Heading as='h1' fontSize='2xl' lineHeight={8} noOfLines={2}>
                    Упс! Такой страницы нет
                </Heading>
                <Text fontSize='md' lineHeight={6} noOfLines={2}>
                    Можете поискать другой рецепт{' '}
                    <Link
                        href={AppRoute.Main}
                        textDecoration='underline'
                        data-test-id={TestIdName.ErrorPageHome}
                    >
                        здесь.
                    </Link>
                </Text>
            </VStack>
        </VStack>
    </Layout>
);
