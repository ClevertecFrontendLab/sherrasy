import { ReactNode } from 'react';

import {
    AperitifIcon,
    DessertsIcon,
    DrinksIcon,
    FirstCourseIcon,
    GrilledIcon,
    HealthyIcon,
    KidsIcon,
    NationalIcon,
    PreparationsIcon,
    SaladsIcon,
    SauceIcon,
    SecondCourseIcon,
    VeganIcon,
} from '~/assets/icons/icons';

export const iconsByTag: { [key: string]: ReactNode } = {
    salad: <SaladsIcon />,
    aperitif: <AperitifIcon />,
    'first-course': <FirstCourseIcon />,
    'second-course': <SecondCourseIcon />,
    dessert: <DessertsIcon />,
    grilled: <GrilledIcon />,
    vegan: <VeganIcon />,
    kids: <KidsIcon />,
    healthy: <HealthyIcon />,
    national: <NationalIcon />,
    sauce: <SauceIcon />,
    drinks: <DrinksIcon />,
    preparations: <PreparationsIcon />,
};
