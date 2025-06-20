import { Box, Heading, HStack } from '@chakra-ui/react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { BookmarkIconSolid, HeartEyesIconSolid } from '~/assets/icons/icons';
import { ProfileStat } from '~/types/profile.type';
import { groupStatsByWeek } from '~/utils/helpers/format-date';
import { getBookmarkText, getLikeText } from '~/utils/helpers/get-plural-label-name';

type GraphType = 'likes' | 'bookmarks';
type ProfileGraphsProps = {
    stats: ProfileStat[];
    type: GraphType;
};

export const ProfileGraphs = ({ stats, type }: ProfileGraphsProps) => {
    const countStats = (stats: ProfileStat[]) => stats.reduce((sum, item) => sum + item.count, 0);
    const isLikes = type === 'likes';
    const count = countStats(stats);
    const label = isLikes ? getLikeText(count) : getBookmarkText(count);
    const stroke = isLikes ? '#8C54FF' : '#2DB100';
    const weeklyStats = groupStatsByWeek(stats);

    const dataMax = Math.max(...weeklyStats.map((item) => item.count), 0);

    const baseStep = 20;
    let yMax = 120;
    let step = baseStep;

    if (dataMax > yMax) {
        yMax = Math.ceil(dataMax / 120) * 120;
        step = yMax / 6;
    }

    const yTicks = [];
    for (let i = 0; i <= 6; i++) {
        yTicks.push(i * step);
    }

    return (
        <Box className='profile-stats-graphs' w='100%' overflowX='auto'>
            <Box className='stat-graph-container' minWidth='max-content'>
                <HStack>
                    {isLikes ? <HeartEyesIconSolid /> : <BookmarkIconSolid />}
                    <Heading size='xs' lineHeight={4} fontWeight='semibold' color='lime.600'>
                        {label}
                    </Heading>
                </HStack>
                <Box style={{ width: '100%', height: 300, minWidth: '55rem' }} mt='0.875rem'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <LineChart data={weeklyStats}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis
                                dataKey='displayDate'
                                tick={{ fontSize: 12 }}
                                interval={0}
                                height={60}
                                tickMargin={8}
                                tickLine={false}
                                axisLine={{ stroke: '#ffffd3' }}
                            />
                            <YAxis
                                domain={[0, yMax]}
                                ticks={yTicks}
                                allowDecimals={false}
                                tickLine={false}
                                tick={{ fontSize: 12 }}
                                tickMargin={22}
                                axisLine={{ stroke: '#ffffd3' }}
                            />
                            <Line
                                type='monotone'
                                dataKey='count'
                                stroke={stroke}
                                strokeWidth={2}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </Box>
    );
};
