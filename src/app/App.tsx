import { Route, Routes } from 'react-router';

import JuicyPage from '~/pages/juicy-page';
import MainPage from '~/pages/main-page';
import VeganPage from '~/pages/vegan-page';
import { useGetPostsQuery } from '~/query/services/posts.ts';
import { AppRoute } from '~/utils/constant';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <Routes>
            <Route path={AppRoute.Main} element={<MainPage />} />
            <Route path={AppRoute.Vegan} element={<VeganPage />} />
            <Route path={AppRoute.Juiciest} element={<JuicyPage />} />
        </Routes>
    );
}

export default App;
