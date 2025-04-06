import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Flex,
    List,
    ListItem,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router';

import { ExitIcon } from '~/assets/icons/icons';
import { iconsByTag } from '~/utils/iconsByTag';

import data from './mock-dishes.json';

function MenuDishes() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const subcategoryParam = searchParams.get('subcategory');
    const handleSubcategoryClick = (category: string, subcategory: string) => {
        navigate(`/${category}?subcategory=${subcategory}`);
    };
    return (
        <Flex
            direction='column'
            minW='16rem'
            maxW='16rem'
            minH='80vh'
            maxH='80vh'
            borderRight='1px solid'
            borderColor='blackAlpha.100'
        >
            <Box
                maxH='644px'
                overflowY='auto'
                p={0}
                bg='white'
                border='1px solid'
                borderColor='blackAlpha.100'
                borderBottomRightRadius='10px'
                position='absolute'
            >
                <Accordion allowToggle variant='ghost' w='auto'>
                    {data.map((item) => (
                        <AccordionItem border='none' key={item.groupName}>
                            <AccordionButton
                                data-test-id={item.tag === 'vegan' ? 'vegan-cuisine' : item.tag}
                                _expanded={{ bg: 'lime.100', fontWeight: '600' }}
                            >
                                <Box flex='1' textAlign='left'>
                                    {iconsByTag[item.tag as string]} {item.groupName}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <List spacing={1}>
                                    {item.elements.map((subcategory) => (
                                        <ListItem
                                            key={`${subcategory}-${item.tag}`}
                                            onClick={() =>
                                                handleSubcategoryClick('vegan', subcategory)
                                            }
                                        >
                                            <Text
                                                fontWeight={
                                                    subcategoryParam === subcategory ? '600' : 400
                                                }
                                            >
                                                {subcategory}
                                            </Text>
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Box>
            <Spacer />
            <Box>
                <Text color='blackAlpha.400' fontSize='xs' lineHeight={4}>
                    Версия программы 03.25
                </Text>
                <Text color='blackAlpha.700' fontSize='xs' lineHeight={4}>
                    Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                </Text>
                <Button variant='unstyled' leftIcon={<ExitIcon />} w='min-content'>
                    Выйти
                </Button>
            </Box>
        </Flex>
    );
}
export default MenuDishes;
