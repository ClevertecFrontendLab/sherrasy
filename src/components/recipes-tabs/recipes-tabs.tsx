import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { RecipeWithImage } from '~/types/recipe.interface';

import RecipesList from '../recipes-list/recipes-list';

type RecipesTabsProps = {
    tabsNames: string[];
    recipes: RecipeWithImage[];
};

function RecipesTabs({ tabsNames, recipes }: RecipesTabsProps) {
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
            mt={{ base: 8, lg: 4 }}
            color='lime.800'
            size={{ base: 'sm', lg: 'md' }}
            align='center'
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
                    {tabsNames.map((name) => (
                        <Tab
                            key={name}
                            _selected={{ color: 'lime.600', borderColor: 'lime.600' }}
                            minW='max-content'
                            onClick={() => handleSubcategoryClick(name)}
                            borderBottomColor='blackAlpha.400'
                        >
                            {name}
                        </Tab>
                    ))}
                </TabList>
            </Box>
            <TabPanels p={0}>
                {tabsNames.map((name) => (
                    <TabPanel p={0} pt={{ base: 6, md: '22px' }} key={`${name}-panel`}>
                        <RecipesList recipes={recipes} />
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}
export default RecipesTabs;
