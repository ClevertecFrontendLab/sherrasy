import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
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
        <Tabs index={activeTabIndex} isLazy mt={5} color='lime.800'>
            <TabList>
                {tabsNames.map((name) => (
                    <Tab
                        key={name}
                        _selected={{ color: 'lime.600', borderColor: 'lime.600' }}
                        onClick={() => handleSubcategoryClick(name)}
                    >
                        {name}
                    </Tab>
                ))}
            </TabList>
            <TabPanels>
                {tabsNames.map((name) => (
                    <TabPanel key={`${name}-panel`}>
                        <RecipesList recipes={recipes} />
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}
export default RecipesTabs;
