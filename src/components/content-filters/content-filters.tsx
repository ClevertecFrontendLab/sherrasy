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
        <>
            <Flex gap={3} flex={1} w={{ base: '20.5rem', md: '28rem', lg: '32.375rem' }}>
                <Button size='sm' p={0} variant='outline' borderColor='blackAlpha.600'>
                    <FilterIcon />
                </Button>
                <InputGroup size='sm' borderColor='blackAlpha.600' maxW='100%'>
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
            <Flex gap={3} display={{ base: 'none', lg: 'flex' }}>
                <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='allergies' mb='0' w='max-content'>
                        Исключить мои аллергены
                    </FormLabel>
                    <Switch id='allergies' size='md' />
                </FormControl>
                <Select
                    size='sm'
                    borderRadius='0.25rem'
                    isTruncated
                    placeholder='Выберите из списка аллергенов...'
                    variant='outline'
                    borderColor='blackAlpha.600'
                    isDisabled
                ></Select>
            </Flex>
        </>
    );
}
export default ContentFilters;
