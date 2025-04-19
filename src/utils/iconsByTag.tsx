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
    salads: <SaladsIcon />,
    snacks: <AperitifIcon />,
    'first-dish': <FirstCourseIcon />,
    'second-dish': <SecondCourseIcon />,
    dessert: <DessertsIcon />,
    grilled: <GrilledIcon />,
    vegan: <VeganIcon />,
    kids: <KidsIcon />,
    healthy: <HealthyIcon />,
    national: <NationalIcon />,
    sauce: <SauceIcon />,
    drinks: <DrinksIcon />,
    preserves: <PreparationsIcon />,
};
