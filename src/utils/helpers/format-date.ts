import 'dayjs/locale/ru';

import dayjs from 'dayjs';

const DEFAULT_DATE_PARAMS = {
    locale: 'ru',
    format: 'DD MMMM HH:MM',
};

export const getFormattedDate = (date: string) =>
    dayjs(date).locale(DEFAULT_DATE_PARAMS.locale).format(DEFAULT_DATE_PARAMS.format);
