import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { RecipeWithImage } from '~/types/recipe.interface';

import RecipesList from '../recipes-list/recipes-list';

type RecipesTabsProps = {
    tabsNames: string[];
    recipes: RecipeWithImage[];
};

function RecipesTabs({ tabsNames, recipes }: RecipesTabsProps) {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const [searchParams, setSearchParams] = useSearchParams();
    const subcategoryParam = searchParams.get('subcategory') ?? '';
    const currentTab = tabsNames.indexOf(subcategoryParam);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const handleSubcategoryClick = (name: string) => {
        setSearchParams(new URLSearchParams({ subcategory: name }));
    };
    useEffect(() => {
        setActiveTabIndex(currentTab !== -1 ? currentTab : 0);
    }, [subcategoryParam, currentTab]);
    return (
        <Tabs
            index={activeTabIndex}
            isLazy
            mt={{ base: 3, xs: 4 }}
            color='lime.800'
            size={{ base: 'sm', lg: 'md' }}
            align={isDesktop ? 'center' : 'start'}
        >
            <Box
                overflowY='auto'
                sx={{
                    scrollbarWidth: 'none',
                    '::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                <TabList borderBottomColor='white'>
                    {tabsNames.map((name, i) => (
                        <Tab
                            key={name}
                            _selected={{ color: 'lime.600', borderColor: 'lime.600' }}
                            minW='max-content'
                            onClick={() => handleSubcategoryClick(name)}
                            borderBottomColor='blackAlpha.400'
                            data-test-id={`tab-${name}-${i}`}
                        >
                            {name}
                        </Tab>
                    ))}
                </TabList>
            </Box>
            <TabPanels p={0}>
                {tabsNames.map((name) => (
                    <TabPanel p={0} pt={{ base: 5, xs: 6, md: '22px' }} key={`${name}-panel`}>
                        <RecipesList recipes={recipes} />
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}
export default RecipesTabs;
