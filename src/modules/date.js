import { parse, format, formatDistance, formatRelative, subDays } from 'date-fns';
const default_format = 'DD/MM/YYYY';

const date = {
    format: (date, date_format, options=null) => {
        if(date==='now'){
            date = +new Date()
        }
        if(date){
            if (!date_format){
                date_format = default_format
            } else {
                if (date_format === 'full' || date_format === 'timestamp') date_format = 'DD/MM/YYYY HH:mm:ss'
                if (date_format==='time') date_format = 'HH:mm:ss'
            }
            return format(date, date_format, options)
        }
    },
    parse: (date_string, options=null) => {
        return parse(date_string, options)
    }
}

export default date
