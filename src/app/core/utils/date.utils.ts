import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export function currentDate() {
    const today = moment().format('dddd, DD/MM/YYYY');
    const formattedDate = today.charAt(0).toUpperCase() + today.slice(1);
    return formattedDate;
}