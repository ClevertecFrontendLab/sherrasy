import { veganList } from '~/components/cards/mock-cards.json';
import ContentHeader from '~/components/content-header/content-header';
import Layout from '~/components/layout/layout';
import data from '~/components/menu-dishes/mock-dishes.json';
import RecipesTabs from '~/components/recipes-tabs/recipes-tabs';
import RelevantKitchenSection from '~/components/relevant-kitchen-section/relevant-kitchen-section';

function VeganPage() {
    const tabsNames = data.find(({ tag }) => tag === 'vegan')?.elements || [];
    const contentData = {
        headline: 'Веганская кухня',
        description:
            ' Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.',
    };
    return (
        <>
            <Layout>
                <ContentHeader
                    headline={contentData.headline}
                    description={contentData.description}
                />
                <RecipesTabs tabsNames={tabsNames} recipes={veganList} />
                <RelevantKitchenSection />
            </Layout>
        </>
    );
}
export default VeganPage;
