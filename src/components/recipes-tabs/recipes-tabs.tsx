import { Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setCurrentParams } from '~/store/recipes/recipes-slice';
import { getFilteredRecipes } from '~/store/recipes/selectors';
import { MenuSubcategory } from '~/types/menu-item.type';
import { PathParams } from '~/types/params.type';

import RecipesList from '../recipes-list/recipes-list';

type RecipesTabsProps = {
    tabsNames: MenuSubcategory[];
};

function RecipesTabs({ tabsNames }: RecipesTabsProps) {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const dispatch = useAppDispatch();
    const { categoryId, subcategoryId } = useParams<PathParams>();
    const recipes = useAppSelector((state) => getFilteredRecipes(state, 'active'));
    const navigate = useNavigate();
    const currentTab = subcategoryId ? tabsNames.findIndex((tab) => tab.id === subcategoryId) : -1;
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const handleSubcategoryClick = (name: string) => {
        navigate(`/${categoryId}/${name}`);
    };
    useEffect(() => {
        setActiveTabIndex(currentTab !== -1 ? currentTab : 0);
        dispatch(setCurrentParams({ category: categoryId, subcategory: subcategoryId }));
        return () => {
            dispatch(setCurrentParams({}));
        };
    }, [categoryId, subcategoryId, currentTab, dispatch]);
    return (
        <Tabs
            index={activeTabIndex}
            isLazy
            mt={{ base: 3, xs: 4 }}
            color='lime.800'
            size={{ base: 'sm', lg: 'md' }}
            align={isDesktop ? 'center' : 'start'}
        >
            <TabList
                borderBottomColor='blackAlpha.320'
                display='flex'
                flexWrap={isDesktop ? 'wrap' : 'nowrap'}
                overflowX={isDesktop ? 'visible' : 'auto'}
                sx={{
                    scrollbarWidth: 'none',
                    '::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                {tabsNames.map(({ name, id }, i) => (
                    <Tab
                        key={name}
                        _selected={{ color: 'lime.600', borderColor: 'lime.600' }}
                        minW='max-content'
                        onClick={() => handleSubcategoryClick(id)}
                        borderBottomColor='transparent'
                        data-test-id={`tab-${name}-${i}`}
                        flexShrink={0}
                        mb={0}
                        mr={isDesktop ? 4 : 0}
                    >
                        {name}
                    </Tab>
                ))}
            </TabList>
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
