import { Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useGetRecipesByCategoryQuery } from '~/query/services/recipes';
import { setCurrentParams } from '~/store/categories/categories-slice';
import { useAppDispatch } from '~/store/hooks';
import { Subcategory } from '~/types/category.type';
import { PathParams } from '~/types/params.type';
import { TestIdName } from '~/utils/testId-name.enum';

import { RecipesList } from '../recipes-list/recipes-list';

type RecipesTabsProps = {
    tabsNames: Subcategory[];
};

export const RecipesTabs = ({ tabsNames }: RecipesTabsProps) => {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const dispatch = useAppDispatch();
    const { categoryId, subcategoryId } = useParams<PathParams>();
    const navigate = useNavigate();
    const currentTab = subcategoryId
        ? tabsNames.findIndex((tab) => tab.category === subcategoryId)
        : -1;
    const currentId = tabsNames.find((tab) => tab.category === subcategoryId)?._id ?? skipToken;
    const { data: recipes = [], isFetching } = useGetRecipesByCategoryQuery(currentId);
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
                borderBottomColor='blackAlpha.300'
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
                {tabsNames.map(({ title: name, category: id }, i) => (
                    <Tab
                        key={name}
                        _selected={{ color: 'lime.600', borderColor: 'lime.600' }}
                        minW='max-content'
                        onClick={() => handleSubcategoryClick(id)}
                        borderBottomColor='transparent'
                        data-test-id={`${TestIdName.Tab}-${id}-${i}`}
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
                        {!isFetching && <RecipesList recipes={recipes} isLastPage={true} />}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};
