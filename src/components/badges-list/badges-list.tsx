import { Badge, Image, Text } from '@chakra-ui/react';

import { useUniqueBadges } from '~/hooks/useUniqueBadges';
import { getCategories } from '~/store/categories/selectors';
import { useAppSelector } from '~/store/hooks';

type BadgesListProps = {
    categoriesIds: string[];
    type: string;
};
export const BadgesList = ({ categoriesIds, type }: BadgesListProps) => {
    const categories = useAppSelector(getCategories);
    const uniqueBadges = useUniqueBadges(categories, categoriesIds);
    return (
        <>
            {uniqueBadges.map(({ _id, icon, title }) => (
                <Badge
                    key={`${_id}-${title}`}
                    py='1px'
                    px={{ base: '0.25rem', lg: 2 }}
                    variant={type}
                    minW='40px'
                    display='flex'
                    flexDirection='row'
                >
                    <Image
                        boxSize={type === 'rkCardShort' ? 6 : 4}
                        mr={{ base: 0.5, lg: 1.5 }}
                        src={icon}
                        alt=''
                    />
                    {type !== 'rkCardShort' && <Text isTruncated>{title}</Text>}
                </Badge>
            ))}
        </>
    );
};
