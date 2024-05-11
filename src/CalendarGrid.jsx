import { useState, useEffect } from 'react'

export default function CalendarGrid({ date }) {

    const year = Number(date.slice(0, 4))
    const month = Number(date.slice(5, 7))
    // const day = date.slice(8, 10)

    const currMonthStart = [6, 0, 1, 2, 3, 4, 5][new Date(year, month - 1, 1).getDay()] // shift array so that monday is 0 and sunday is 6
    const daysInCurrMonth = new Date(year, month, 0).getDate()
    const daysInPrevMonth = new Date(year, month == 0 ? 11 : month - 1, 0).getDate()

    let gridContent = []
    const gridSize = 7 * 7

    // https://www.abeautifulsite.net/posts/getting-localized-month-and-day-names-in-the-browser/
    function getWeekdays(locale = 'fi', format = 'short') {
        const formatter = new Intl.DateTimeFormat(locale, { weekday: format, timeZone: 'UTC' });
        const days = [1, 2, 3, 4, 5, 6, 7].map(day => {
            const dd = day < 10 ? `0${day}` : day;
            return new Date(`2001-01-${dd}T00:00:00+00:00`);
        });
        return days.map(date => formatter.format(date));
    }

    // https://www.geeksforgeeks.org/calculate-current-week-number-in-javascript/
    function getWeekNumber(date) {
        const currentDate = new Date(date);
        const januaryFirst = new Date(currentDate.getFullYear(), 0, 1);
        const daysToNextMonday = (januaryFirst.getDay() === 1) ? 0 : (7 - januaryFirst.getDay()) % 7;
        const nextMonday = new Date(currentDate.getFullYear(), 0, januaryFirst.getDate() + daysToNextMonday);

        return (currentDate < nextMonday)
            ? 52
            : (currentDate > nextMonday
                ? Math.ceil((currentDate - nextMonday) / (24 * 3600 * 1000) / 7)
                : 1);
    }

    // TODO: add support for sundays as well
    function isMonday(date) {
        return new Date(date).getDay() == 1
    }

    // first row
    for (let day of getWeekdays()) {
        gridContent.push(<div key={day}><h2 className='font-s'>{day}</h2></div>)
    }

    function twoDigits(value) {
        return value.toString().padStart(2, 0)
    }

    // prev month
    for (let i = currMonthStart - 1; i >= 0; i--) {
        const prevMonthDate = `${month == 0 ? year - 1 : year}-${twoDigits(month == 1 ? 12 : month - 1)}-${twoDigits(daysInPrevMonth - i)}`
        const props = {
            key: prevMonthDate,
            date: prevMonthDate,
            isPassive: true,
            ...(isMonday(prevMonthDate) && { weekNo: getWeekNumber(prevMonthDate) })
        }

        gridContent.push(
            <GridCell {...props}></GridCell>
        )
    }

    // curr month
    for (let i = 1; i <= daysInCurrMonth; i++) {
        const currMonthDate = `${year}-${twoDigits(month)}-${twoDigits(i)}`
        const props = {
            key: currMonthDate,
            date: currMonthDate,
            isToday: currMonthDate == date,
            ...(isMonday(currMonthDate) && { weekNo: getWeekNumber(currMonthDate) })
        }

        gridContent.push(
            <GridCell {...props}></GridCell>
        )
    }

    //next month
    for (let i = 1; gridContent.length < gridSize; i++) {
        const nextMonthDate = `${month == 12 ? year + 1 : year}-${twoDigits(month == 12 ? 1 : month + 1)}-${twoDigits(i)}`
        const props = {
            key: nextMonthDate,
            date: nextMonthDate,
            isPassive: true,
            ...(isMonday(nextMonthDate) && { weekNo: getWeekNumber(nextMonthDate) })
        }

        gridContent.push(
            <GridCell {...props}></GridCell>
        )
    }

    function GridCell({ date, isPassive = false, isToday = false, weekNo = null }) {

        return (
            <div id={date} className={`${isToday ? 'today' : ''}${isPassive ? 'passive' : ''}`}>
                <div className='top'>
                    <h2>{date.match(/\d+$/)[0].replace(/^0+/, '')}</h2>
                </div>
                <div className='mid'>
                    {/* nimipäivä and holiday here */}
                </div>
                <div className='btm font-s'>
                    {/* weather and week no here */}
                    {weekNo && <p>{weekNo}</p>}
                </div>
            </div>
        )
    }

    return (
        <div id='grid'>
            {gridContent}
        </div>
    )
}
