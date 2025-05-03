import { Badge, Image, Text } from '@chakra-ui/react';

import { useGetCategoriesQuery } from '~/query/services/categories';
import { getCategories } from '~/store/categories/selectors';
import { useAppSelector } from '~/store/hooks';
import { getCatSubPairs } from '~/utils/helpers';

type BadgesListProps = {
    categoriesIds: string[];
    type: string;
};
export const BadgesList = ({ categoriesIds, type }: BadgesListProps) => {
    const { data: dataCategories = [], isError: hasCatError } = useGetCategoriesQuery();
    const backupCategories = useAppSelector(getCategories);
    const categories = hasCatError ? backupCategories : dataCategories;
    const pairs = getCatSubPairs(categories, categoriesIds);
    return (
        <>
            {pairs.map(({ category, subcategory }) => (
                <Badge
                    key={`${category._id}-${subcategory._id}`}
                    py='1px'
                    px={{ base: '0.25rem', lg: 2 }}
                    variant={type}
                    maxW='min-content'
                    display='flex'
                    flexDirection='row'
                >
                    <Image
                        boxSize={type === 'rkCardShort' ? 6 : 4}
                        mr={{ base: 0.5, lg: 1.5 }}
                        src={category.icon}
                        alt=''
                    />
                    {type !== 'rkCardShort' && <Text isTruncated>{category.title}</Text>}
                </Badge>
            ))}
        </>
    );
};
