import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';

import { Profile } from '~/types/profile.type';
import { getBloggerCardName } from '~/utils/helpers/blogger-author-helpers';

type UserBlockProfileProps = {
    profile: Profile;
};
export const UserBlockProfile = ({ profile }: UserBlockProfileProps) => {
    const { firstName = '', lastName = '', login: nick = '' } = profile;
    const name = getBloggerCardName(firstName, lastName);

    return (
        <HStack
            alignItems='center'
            flexDir={{ base: 'column', sm: 'row' }}
            boxShadow='none'
            justifyContent='center'
            gap={6}
            position='relative'
        >
            <Avatar name={name} size='2xl' />
            <VStack alignItems='flex-start' w={{ base: '100%', sm: 'fit-content' }} maxW='100%'>
                <Text
                    p={0}
                    fontSize={{ base: 24, md: 48 }}
                    color='black'
                    fontWeight={700}
                    mb={3}
                    lineHeight='148%'
                    textAlign={{ base: 'center', sm: 'left' }}
                    m={{ base: '0 auto', sm: '0' }}
                    wordBreak='break-word'
                >
                    {name}
                </Text>
                <Text
                    p={0}
                    fontSize={14}
                    color='blackAlpha.700'
                    margin={{ base: '0 auto', sm: '0' }}
                >
                    @{nick}
                </Text>
                {/* <HStack p={0} justifyContent='space-between' w='100%'>

                    <HStack>
                        <HStack>
                            <HStack gap={1} >
                                <BookmarkIcon color='black' boxSize={3} />
                                <Text color='lime.600' fontWeight={600} fontSize={12}>
                                    {totalBookmarks}
                                </Text>
                            </HStack>

                            <HStack
                                alignItems='center'
                                gap={1}
                                data-test-id={TestIdName.ProfileFollowersCount}
                            >
                                <PeopleIconOutline color='black' boxSize={3} />
                                <Text color='lime.600' fontWeight={600} fontSize={12}>
                                    {totalSubscribers}
                                </Text>
                            </HStack>
                        </HStack>
                    </HStack>
                </HStack> */}
            </VStack>
        </HStack>
    );
};
