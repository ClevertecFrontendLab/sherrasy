import { Heading } from '@chakra-ui/react';

import ContentHeader from '~/components/content-header/content-header';
import CookBlogSection from '~/components/cook-blog-section/cook-blog-section';
import JuicySection from '~/components/juicy-section/juicy-section';
import Layout from '~/components/layout/layout';
import NewSection from '~/components/new-section/new-section';
import RelevantKitchenSection from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { useAppSelector } from '~/store/hooks';
import { getRecipes } from '~/store/recipes/selectors';

function MainPage() {
    const recipes = useAppSelector(getRecipes);
    if (!recipes) {
        return <Heading>An error occured</Heading>;
    }
    return (
        <>
            <Layout>
                <ContentHeader headline='Приятного аппетита!' />
                <NewSection />
                <JuicySection recipes={recipes} />
                <CookBlogSection />
                <RelevantKitchenSection recipes={recipes} />
            </Layout>
        </>
    );
}
export default MainPage;
