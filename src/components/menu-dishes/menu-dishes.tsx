import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Flex,
    Image,
    List,
    ListItem,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { ExitIcon } from '~/assets/icons/icons';
import { getCategories } from '~/store/categories/selectors';
import { useAppSelector } from '~/store/hooks';
import { PathParams } from '~/types/params.type';
import { TestIdName } from '~/utils/constant';

import { ScrollArea } from '../scrollarea/scrollarea';

type MenuDishesProps = {
    isBurgerMenu: boolean;
};

export const MenuDishes = ({ isBurgerMenu }: MenuDishesProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { categoryId, subcategoryId } = useParams<PathParams>();
    const subcategoryParam = subcategoryId;
    const [activeIndex, setActiveIndex] = useState<number | number[]>(-1);
    const data = useAppSelector(getCategories);

    const handleMenuClick = (category: string, subcategory: string) => {
        const link = `/${category}/${subcategory}`;
        navigate(link, { state: { keepMenuOpen: isBurgerMenu } });
    };

    useEffect(() => {
        if (!data) return;
        const currentIndex = data.findIndex(
            (item) => categoryId === item.category && location.pathname !== '/',
        );

        if (currentIndex !== -1) {
            setActiveIndex(currentIndex);
        } else {
            setActiveIndex(-1);
        }
    }, [pathname, categoryId, data]);

    return (
        <Flex
            direction='column'
            justify='space-between'
            borderRight='1px solid'
            w={{ base: '18.875rem', sm: '19.625rem', lg: '16rem', xl: '16.125rem', '2xl': '16rem' }}
            h={{ base: 'calc(100vh - 240px)', lg: 'calc(100vh - 80px)' }}
            borderColor='blackAlpha.100'
            position={{ lg: 'fixed' }}
            left={isBurgerMenu ? 'auto' : 0}
            mt={{ base: 5, sm: 8, lg: 0 }}
            bg='white'
        >
            <ScrollArea extraStylesType='menu'>
                <Accordion
                    ml={{ base: 0, lg: 1, xl: 2, '2xl': 1 }}
                    allowToggle
                    variant='ghost'
                    overflowY='auto'
                    index={activeIndex}
                    onChange={(index) => setActiveIndex(index)}
                >
                    {data &&
                        data.map(
                            ({
                                title: groupName,
                                category: tag,
                                subCategories: elements,
                                icon,
                            }) => (
                                <AccordionItem border='none' key={groupName} minH='3rem'>
                                    <AccordionButton
                                        data-test-id={tag === 'vegan' ? 'vegan-cuisine' : tag}
                                        _expanded={{ bg: 'lime.100', fontWeight: '600' }}
                                        _hover={{ bg: 'lime.50' }}
                                        onClick={() => handleMenuClick(tag, elements[0].category)}
                                        pt={{ base: 3, xl: 2 }}
                                        pr={2}
                                        pl={{ base: 0, lg: 4 }}
                                    >
                                        <Flex flex='1' textAlign='left'>
                                            <Image mr={3} boxSize={6} src={icon} />
                                            <Text fontSize='md' lineHeight={6}>
                                                {groupName}
                                            </Text>
                                        </Flex>
                                        <AccordionIcon
                                            boxSize={{ base: 6, xl: 7 }}
                                            mr={{ xl: 2 }}
                                        />
                                    </AccordionButton>
                                    <AccordionPanel pb={2} pr={1}>
                                        <List spacing={3}>
                                            {elements?.map(({ category: id, title: name }) => (
                                                <ListItem
                                                    key={`${id}-${tag}`}
                                                    onClick={() => handleMenuClick(tag, id)}
                                                    pl={{
                                                        base: subcategoryParam === id ? 3 : 5,
                                                        lg: subcategoryParam === id ? 7 : 9,
                                                    }}
                                                    data-test-id={
                                                        subcategoryParam === id &&
                                                        `${id}-${TestIdName.MenuActive}`
                                                    }
                                                    _hover={{ cursor: 'pointer' }}
                                                >
                                                    <Text
                                                        fontWeight={
                                                            subcategoryParam === id ? 600 : 400
                                                        }
                                                        borderLeftStyle='solid'
                                                        borderLeftWidth={
                                                            subcategoryParam === id ? '8px' : '1px'
                                                        }
                                                        borderColor='lime.300'
                                                        pl={3}
                                                    >
                                                        {name}
                                                    </Text>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </AccordionPanel>
                                </AccordionItem>
                            ),
                        )}
                </Accordion>
            </ScrollArea>
            <Spacer />
            <Box px={{ base: 1, lg: 7 }} py={{ base: 2, lg: 5 }} w={{ lg: '240px' }} bottom={0}>
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
};
