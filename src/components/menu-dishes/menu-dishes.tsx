import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    List,
    ListItem,
    Menu,
    MenuButton,
    MenuList,
    Spacer,
    Text,
} from '@chakra-ui/react';

import data from './mock-dishes.json';

function MenuDishes() {
    return (
        <Flex direction='column' minW='256px' maxW='256px' minH='80vh'>
            <Menu isOpen flip={false}>
                <MenuButton />
                <MenuList maxH='644px' overflowY='auto' p={0}>
                    <Accordion allowToggle variant='ghost' w='auto'>
                        {data.map((item) => (
                            <AccordionItem border='none' key={item.groupName}>
                                <AccordionButton
                                    data-test-id={item.tag === 'vegan' ? 'vegan-cuisine' : item.tag}
                                    _expanded={{ bg: 'lime.100', fontWeight: '600' }}
                                >
                                    <Box flex='1' textAlign='left'>
                                        {item.groupName}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <List spacing={1}>
                                        {item.elements.map((subcategory) => (
                                            <ListItem key={`${subcategory}-${item.tag}`}>
                                                <Text>{subcategory}</Text>
                                            </ListItem>
                                        ))}
                                    </List>
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </MenuList>
            </Menu>
            <Spacer />
            <Box>
                <Text color='blackAlpha.400' fontSize='xs' lineHeight={4}>
                    Версия программы 03.25
                </Text>
                <Text color='blackAlpha.700' fontSize='xs' lineHeight={4}>
                    Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                </Text>
                <Text> Выйти</Text>
            </Box>
        </Flex>
    );
}
export default MenuDishes;
