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
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { ExitIcon } from '~/assets/icons/icons';
import { iconsByTag } from '~/utils/iconsByTag';

import data from './mock-dishes.json';

function MenuDishes() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const subcategoryParam = searchParams.get('subcategory');
    const [activeIndex, setActiveIndex] = useState<number | number[]>(-1);

    const handleMenuClick = (category: string, subcategory?: string) => {
        const link = subcategory ? `/${category}?subcategory=${subcategory}` : `/${category}`;
        navigate(link);
    };

    useEffect(() => {
        const currentIndex = data.findIndex(
            (item) => location.pathname.includes(item.tag) && location.pathname !== '/',
        );

        if (currentIndex !== -1) {
            setActiveIndex(currentIndex);
        } else {
            setActiveIndex(-1);
        }
    }, [pathname]);

    return (
        <Flex
            direction='column'
            justify='space-between'
            borderRight='1px solid'
            w='16rem'
            h='calc(100vh - 80px)'
            borderColor='blackAlpha.100'
            position={{ lg: 'fixed' }}
            left={0}
            bg='white'
        >
            <Accordion
                allowToggle
                variant='ghost'
                overflowY='auto'
                index={activeIndex}
                onChange={(index) => setActiveIndex(index)}
            >
                {data.map((item) => (
                    <AccordionItem border='none' key={item.groupName}>
                        <AccordionButton
                            data-test-id={item.tag === 'vegan' ? 'vegan-cuisine' : item.tag}
                            _expanded={{ bg: 'lime.100', fontWeight: '600' }}
                            onClick={() => handleMenuClick('vegan')}
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
                                        onClick={() => handleMenuClick('vegan', subcategory)}
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
            <Spacer />
            <Box p={6} pb={8} w='13.5rem' bottom={0}>
                <Text color='blackAlpha.400' fontSize='xs' lineHeight={4}>
                    Версия программы 03.25
                </Text>
                <Text py={4} color='blackAlpha.700' fontSize='xs' lineHeight={4}>
                    Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                </Text>
                <Button variant='ghost' leftIcon={<ExitIcon />} p={0} fontSize='xs'>
                    Выйти
                </Button>
            </Box>
        </Flex>
    );
}
export default MenuDishes;
