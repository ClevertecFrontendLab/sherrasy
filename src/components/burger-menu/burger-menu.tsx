import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, useMediaQuery } from '@chakra-ui/react';

import { TestIdName } from '~/utils/testId-name.enum';

import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { MenuDishes } from '../menu-dishes/menu-dishes';
import { ScrollArea } from '../scrollarea/scrollarea';

type BurgerMenuProps = {
    isMenuOpen: boolean;
    handleMenuOpen: () => void;
};

export const BurgerMenu = ({ isMenuOpen, handleMenuOpen }: BurgerMenuProps) => {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');

    const toggleMenu = () => {
        handleMenuOpen();
    };

    return (
        <>
            <Button
                variant='chost'
                onClick={toggleMenu}
                maxW='min-content'
                pr={{ base: isMenuOpen ? 2 : 4 }}
                display={{ lg: 'none' }}
            >
                {isMenuOpen ? (
                    <CloseIcon boxSize={3} data-test-id={TestIdName.BurgerCloseIcon} />
                ) : (
                    <HamburgerIcon boxSize={5} data-test-id={TestIdName.BurgerOpenIcon} />
                )}
            </Button>
            {isDesktop && <Box display={{ lg: 'none' }} data-test-id={TestIdName.BurgerNav} />}
            {isMenuOpen && (
                <Flex
                    bg='white'
                    minW={{ base: '344px' }}
                    maxW={{ base: '344px' }}
                    h={{ base: 'calc(100vh - 150px)', sm: 'calc(100vh - 156px)' }}
                    justify='center'
                    position='absolute'
                    right={2}
                    top={16}
                    borderTopRadius={0}
                    borderBottomRadius={8}
                    data-test-id={TestIdName.BurgerNav}
                >
                    <ScrollArea extraStylesType='burger-menu'>
                        <Flex direction='column' pl={5} pt={4} pb={3} overflowY='auto'>
                            <Breadcrumbs />
                            <MenuDishes isBurgerMenu={true} />
                        </Flex>
                    </ScrollArea>
                </Flex>
            )}
        </>
    );
};
