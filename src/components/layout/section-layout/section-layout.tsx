import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import { ArrowRightIcon } from '~/assets/icons/icons';
import { TestIdName } from '~/utils/testId-name.enum';

type SectionType = 'juiciest' | 'new' | 'cook-blog' | 'cook-blog-favorite' | 'cook-blog-others';

type SectionLayoutProps = PropsWithChildren & {
    type: SectionType;
    title: string | null;
    isVibrant?: boolean;
    isDull?: boolean;
    btnHidden?: boolean;
    onBtnClick?: () => void;
};

const DEFAULT_CONFIG: Record<SectionType, Record<string, string | null>> = {
    new: {
        btnName: null,
        testIdBlock: null,
        testId: null,
        testIdMobile: null,
    },
    juiciest: {
        btnName: 'Вся подборка',
        testId: TestIdName.JuiciestLink,
        testIdMobile: TestIdName.JuiciestLinkMobile,
    },
    'cook-blog': {
        btnName: 'Все авторы',
        testIdBlock: TestIdName.MainPageBlogsBox,
        testId: TestIdName.MainPageBlogsButton,
        testIdMobile: TestIdName.MainPageBlogsButton,
    },
    'cook-blog-favorite': {
        btnName: null,
        testIdBlock: TestIdName.BlogsFavoritesBox,
        testId: null,
        testIdMobile: null,
    },
    'cook-blog-others': {
        btnName: null,
        testIdBlock: TestIdName.BlogsOthersBox,
        testId: null,
        testIdMobile: null,
    },
};

export const SectionLayout = ({
    type,
    title,
    isVibrant,
    isDull,
    onBtnClick,
    btnHidden,
    children,
}: SectionLayoutProps) => {
    const { btnName, testId, testIdMobile, testIdBlock } = DEFAULT_CONFIG[type];
    return (
        <Stack
            w='100%'
            pt={!isDull ? { base: 4, sm: 6 } : 0}
            borderRadius='1rem'
            mt={isVibrant ? 8 : 0}
            bg={isVibrant ? 'lime.300' : isDull ? 'blackAlpha.50' : 'white'}
            data-test-id={type.includes('cook-blog') ? testIdBlock : ''}
        >
            <Flex
                justify='space-between'
                align={{ base: 'start', sm: 'center' }}
                flexDir={{ base: 'column', sm: 'row' }}
                mb={4}
            >
                {title && (
                    <Heading
                        fontWeight='500'
                        fontSize={
                            isVibrant
                                ? { base: '2xl', lg: '3xl', xl: '4xl' }
                                : { base: '2xl', lg: '4xl', xl: '5xl' }
                        }
                        lineHeight={
                            isVibrant
                                ? { base: 8, lg: 9, '2xl': 10 }
                                : { base: 8, lg: 10, '2xl': 'none' }
                        }
                        px={isVibrant ? '4' : '0'}
                    >
                        {title}
                    </Heading>
                )}

                {btnName && type !== 'cook-blog-others' && (
                    <Button
                        size='md'
                        bg={isVibrant ? 'lime.300' : 'lime.400'}
                        onClick={onBtnClick}
                        rightIcon={<ArrowRightIcon />}
                        display={{ base: 'none', lg: 'flex' }}
                        data-test-id={testId}
                    >
                        <Text
                            fontWeight={600}
                            fontSize={{ base: 'md', '2xl': 'lg' }}
                            lineHeight={{ base: 6, '2xl': 7 }}
                        >
                            {btnName}
                        </Text>
                    </Button>
                )}
            </Flex>
            <Flex align='center' justify={type === 'new' ? 'start' : 'center'}>
                {children}
            </Flex>
            {btnName && !btnHidden && (
                <Flex p={4} justifyContent='center'>
                    <Button
                        size='md'
                        bg={isVibrant ? 'lime.300' : isDull ? 'transparent' : 'lime.400'}
                        onClick={onBtnClick}
                        rightIcon={<ArrowRightIcon />}
                        data-test-id={testIdMobile}
                        display={{ base: 'flex', lg: `${isDull ? 'inherit' : 'none'}` }}
                        alignItems='center'
                    >
                        <Text
                            fontWeight={600}
                            fontSize={{ base: 'md', '2xl': 'lg' }}
                            lineHeight={{ base: 6, '2xl': 7 }}
                        >
                            {btnName}
                        </Text>
                    </Button>
                </Flex>
            )}
        </Stack>
    );
};
