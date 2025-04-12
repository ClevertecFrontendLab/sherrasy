import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Switch,
} from '@chakra-ui/react';

import { FilterIcon, SearchIcon } from '~/assets/icons/icons';

function ContentFilters() {
    return (
        <Flex direction='column' gap={{ lg: '18px' }} mb={4}>
            <Flex gap='0.625rem' flex={1} w={{ base: '20.5rem', md: '28rem', lg: '32.375rem' }}>
                <Button
                    size={{ base: 'sm', lg: 'lg' }}
                    maxW={{ base: 4, lg: 8 }}
                    p={0}
                    variant='outline'
                    borderColor='blackAlpha.600'
                >
                    <FilterIcon boxSize={{ base: 4, lg: 6 }} />
                </Button>
                <InputGroup
                    size={{ base: 'sm', lg: 'lg' }}
                    borderColor='blackAlpha.600'
                    maxW='100%'
                >
                    <Input
                        variant='outline'
                        placeholder='Название или ингридиент...'
                        _placeholder={{ color: 'lime.800' }}
                        borderRadius='0.25rem'
                    />
                    <InputRightElement>
                        <SearchIcon />
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <Flex gap={4} display={{ base: 'none', lg: 'flex' }}>
                <FormControl display='flex' alignItems='center' justifyContent='center'>
                    <FormLabel htmlFor='allergies' mb='0' w='max-content'>
                        Исключить мои аллергены
                    </FormLabel>
                    <Switch id='allergies' size='md' maxH='20px' />
                </FormControl>
                <Select
                    size={{ base: 'sm', lg: 'md' }}
                    maxW={{ lg: '14.625rem' }}
                    borderRadius='0.25rem'
                    isTruncated
                    placeholder='Выберите из списка аллергенов...'
                    variant='outline'
                    borderColor='blackAlpha.600'
                    isDisabled
                ></Select>
            </Flex>
        </Flex>
    );
}
export default ContentFilters;
