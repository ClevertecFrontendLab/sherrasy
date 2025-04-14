import ContentHeader from '~/components/content-header/content-header';
import CookBlogSection from '~/components/cook-blog-section/cook-blog-section';
import JuicySection from '~/components/juicy-section/juicy-section';
import Layout from '~/components/layout/layout';
import NewSection from '~/components/new-section/new-section';
import RelevantKitchenSection from '~/components/relevant-kitchen-section/relevant-kitchen-section';

function MainPage() {
    return (
        <>
            <Layout>
                <ContentHeader headline='Приятного аппетита!' />
                <NewSection />
                <JuicySection />
                <CookBlogSection />
                <RelevantKitchenSection />
            </Layout>
        </>
    );
}
export default MainPage;
