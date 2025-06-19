import { Box } from '@chakra-ui/react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { ProfileStat, ProfileStats } from '~/types/profile.type';

export const ProfileGraphs = ({ stats }: { stats: ProfileStats }) => {
    const countStats = (statData: ProfileStat[]) =>
        statData.reduce((sum, item) => sum + item.count, 0);
    const formatDateLabel = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
    };

    return (
        <Box className='profile-stats-graphs' w='100%'>
            <Box className='stat-graph-container'>
                <h3>{countStats(stats.bookmarks)} сохранений</h3>
                <Box style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <LineChart
                            data={stats.bookmarks}
                            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                        >
                            <CartesianGrid
                                strokeDasharray='3 3'
                                vertical={false}
                                stroke='#f0f0f0'
                            />
                            <XAxis
                                dataKey='date'
                                tick={{ fontSize: 12 }}
                                tickFormatter={formatDateLabel}
                                interval={0}
                                textAnchor='start'
                                height={60}
                                tickMargin={10}
                            />
                            <YAxis
                                domain={[0, 'dataMax + 20']}
                                tickCount={7}
                                allowDecimals={false}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                formatter={(value: number) => [`${value} сохранений`, '']}
                                labelFormatter={(label) => `Дата: ${formatDateLabel(label)}`}
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                }}
                            />
                            <Line
                                type='monotone'
                                dataKey='count'
                                stroke='#8884d8'
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </Box>

            <Box className='stat-graph-container'>
                <h3>{countStats(stats.likes)} лайка</h3>
                <Box style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <LineChart
                            data={stats.likes}
                            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                        >
                            <CartesianGrid
                                strokeDasharray='3 3'
                                vertical={false}
                                stroke='#f0f0f0'
                            />
                            <XAxis
                                dataKey='date'
                                tick={{ fontSize: 12 }}
                                tickFormatter={formatDateLabel}
                                interval={0}
                                textAnchor='start'
                                height={60}
                                tickMargin={10}
                            />
                            <YAxis
                                domain={[0, 'dataMax + 20']}
                                tickCount={7}
                                allowDecimals={false}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                formatter={(value: number) => [`${value} лайков`, '']}
                                labelFormatter={(label) => `Дата: ${formatDateLabel(label)}`}
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                }}
                            />
                            <Line
                                type='monotone'
                                dataKey='count'
                                stroke='#82ca9d'
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </Box>
    );
};
