
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale);

export const formatAgo = (date:Date, lang = 'en_US') => {
    return format(date, lang);
};