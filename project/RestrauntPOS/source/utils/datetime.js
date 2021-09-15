const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

export function currentTimeWithDMDY() {
    let currentDate = new Date()
    let day = currentDate.getDay()
    let month = currentDate.getMonth()
    let date = currentDate.getDate()
    let year = currentDate.getFullYear()
    return `${DAYS[day]}, ${MONTHS[month]} ${date}, ${year}`
}