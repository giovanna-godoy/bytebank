import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export function currentDate() {
    const today = moment().format('dddd, DD/MM/YYYY');
    const formattedDate = today.charAt(0).toUpperCase() + today.slice(1);

    return formattedDate;
}

export function formatDate(date: string, mask?: string, format?: string) {
    return moment(date, format || 'YYYY-MM-DD').format(mask || 'DD/MM/YYYY');
}

export function convertStringDate(date: string): Date {
    return moment(date).toDate();
}