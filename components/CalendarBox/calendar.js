const DAYS_ON_WEEK = 7,
    DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const areEqual = (a, b) => {
    if (!a || !b) return false;

    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    )
}

const isLeap = (year) => {
    return !((year % 4) || (!(year % 100) && (year % 400)))
}


const getDaysIsMonth = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();

    if (isLeap(year) && month == 1) {
        return DAYS_IN_MONTH[month] + 1
    }
    else {
        return DAYS_IN_MONTH[month]
    }
}

const getDateOfWeek = (date) => {
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0) return 6
    return dayOfWeek - 1
}

export const getMonthData = (year, month) => {
    const result = [];

    const date = new Date(year, month);

    const daysInMonth = getDaysIsMonth(date);
    const monthStartOn = getDateOfWeek(date);
    let day = 1;

    for (let i = 0; i < (daysInMonth + monthStartOn) / DAYS_ON_WEEK; i++) {
        result[i] = [];

        for (let k = 0; k < DAYS_ON_WEEK; k++) {
            if ((i === 0 && k < monthStartOn) || day > daysInMonth) {
                result[i][k] = null;
            }
            else {
                result[i][k] = new Date(year, month, day++);
            }
        }
    }
    return result;
}