import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Flex,
    Icon,
    List,
    ListItem,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { ExitIcon } from '~/assets/icons/icons';
import { MenuItem } from '~/types/menu-item.type';
import { PathParams } from '~/types/params.type';
import { iconsByTag } from '~/utils/iconsByTag';

import ScrollArea from '../scrollarea/scrollarea';
import data from './mock-dishes.json';

function MenuDishes() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { categoryId, subcategoryId } = useParams<PathParams>();
    const subcategoryParam = subcategoryId;
    const [activeIndex, setActiveIndex] = useState<number | number[]>(-1);
    const handleMenuClick = (category: string, subcategory: string) => {
        const link = `/${category}/${subcategory}`;
        navigate(link);
    };

    useEffect(() => {
        const currentIndex = data.findIndex(
            (item) => categoryId === item.tag && location.pathname !== '/',
        );

        if (currentIndex !== -1) {
            setActiveIndex(currentIndex);
        } else {
            setActiveIndex(-1);
        }
    }, [pathname, categoryId]);

    return (
        <Flex
            direction='column'
            justify='space-between'
            borderRight='1px solid'
            w={{ lg: '16rem', xl: '16.125rem', '2xl': '16rem' }}
            h='calc(100vh - 80px)'
            borderColor='blackAlpha.100'
            position={{ lg: 'fixed' }}
            left={0}
            bg='white'
        >
            <ScrollArea>
                <Accordion
                    ml={{ lg: 1, xl: 2, '2xl': 1 }}
                    allowToggle
                    variant='ghost'
                    overflowY='auto'
                    index={activeIndex}
                    onChange={(index) => setActiveIndex(index)}
                >
                    {data.map((item: MenuItem) => (
                        <AccordionItem border='none' key={item.groupName} minH='3rem'>
                            <AccordionButton
                                data-test-id={item.tag}
                                _expanded={{ bg: 'lime.100', fontWeight: '600' }}
                                _hover={{ bg: 'lime.50' }}
                                onClick={() => handleMenuClick('vegan', item.elements[0].id)}
                                pt={3}
                                pr={2}
                            >
                                <Flex flex='1' textAlign='left'>
                                    <Icon mr={3} boxSize={6}>
                                        {iconsByTag[item.tag as string]}
                                    </Icon>
                                    <Text fontSize='md' lineHeight={6}>
                                        {item.groupName}
                                    </Text>
                                </Flex>
                                <AccordionIcon boxSize={6} />
                            </AccordionButton>
                            <AccordionPanel pb={2} pr={1}>
                                <List spacing={3}>
                                    {item.elements.map((subcategory) => (
                                        <ListItem
                                            key={`${subcategory.id}-${item.tag}`}
                                            onClick={() => handleMenuClick('vegan', subcategory.id)}
                                            pl={{ lg: subcategoryParam === subcategory.id ? 7 : 9 }}
                                            data-test-id={
                                                subcategoryParam === subcategory.id &&
                                                `tab-${subcategory}-active`
                                            }
                                        >
                                            <Text
                                                fontWeight={
                                                    subcategoryParam === subcategory.id ? 600 : 400
                                                }
                                                borderLeftStyle='solid'
                                                borderLeftWidth={
                                                    subcategoryParam === subcategory.id
                                                        ? '8px'
                                                        : '1px'
                                                }
                                                borderColor='lime.300'
                                                pl={3}
                                            >
                                                {subcategory.name}
                                            </Text>
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ScrollArea>
            <Spacer />
            <Box px={7} py={5} w='240px' bottom={0}>
                <Text color='blackAlpha.400' fontSize='xs' lineHeight={4}>
                    Версия программы 03.25
                </Text>
                <Box pb={1} pt={4} color='blackAlpha.700' fontSize='xs' lineHeight={4}>
                    <Text> Все права защищены, ученический файл,</Text>
                    <Text>©Клевер Технолоджи, 2025</Text>
                </Box>

                <Button variant='ghost' leftIcon={<ExitIcon />} p={0} fontSize='xs'>
                    Выйти
                </Button>
            </Box>
        </Flex>
    );
}
export default MenuDishes;
