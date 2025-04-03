import { Heading } from '@chakra-ui/react';

import Footer from '~/components/footer/footer';
import Header from '~/components/header/header';

function JuicyPage() {
    return (
        <>
            <Header />
            <Heading>Самое сочное</Heading>
            <Footer />
        </>
    );
}
export default JuicyPage;
