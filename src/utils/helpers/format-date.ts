import 'dayjs/locale/ru';

import dayjs from 'dayjs';

import { ProfileStat } from '~/types/profile.type';

const DEFAULT_DATE_PARAMS = {
    locale: 'ru',
    format: 'DD MMMM HH:MM',
};

export const getFormattedDate = (date: string) =>
    dayjs(date).locale(DEFAULT_DATE_PARAMS.locale).format(DEFAULT_DATE_PARAMS.format);

export const getWeekStartDate = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
};

export const groupStatsByWeek = (stats: ProfileStat[]): ProfileStat[] => {
    if (stats.length === 0) return [];

    const weekMap = new Map<string, number>();

    stats.forEach(({ date, count }) => {
        const currentDate = new Date(date);
        const weekStart = getWeekStartDate(new Date(currentDate));
        const weekKey = weekStart.toISOString().split('T')[0];

        if (weekMap.has(weekKey)) {
            weekMap.set(weekKey, weekMap.get(weekKey)! + count);
        } else {
            weekMap.set(weekKey, count);
        }
    });

    return Array.from(weekMap.entries()).map(([weekKey, count]) => {
        const weekStartDate = new Date(weekKey);
        return {
            date: weekKey,
            count,
            displayDate: `${weekStartDate.toLocaleString('en-US', { month: 'short' })} ${weekStartDate.getDate()}`,
        };
    });
};
