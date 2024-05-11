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

    // first row
    for (let day of getWeekdays()) {
        gridContent.push(<div key={day}><h2 className='font-s'>{day}</h2></div>)
    }
    }

    // prev month
    for (let i = currMonthStart - 1; i >= 0; i--) {
        let prevMonthDate = `${month == 0 ? year - 1 : year}-${month == 1 ? 12 : month - 1}-${(daysInPrevMonth - i).toString().padStart(2, 0)}`
        gridContent.push(
            <GridCell key={prevMonthDate} date={prevMonthDate} isPassive='true'></GridCell>
        )
    }

    // curr month
    for (let i = 1; i <= daysInCurrMonth; i++) {
        let currMonthDate = `${year}-${month}-${i.toString().padStart(2, 0)}`
        gridContent.push(
            <GridCell key={currMonthDate} date={currMonthDate} isToday={currMonthDate == date}></GridCell>
        )
    }

    //next month
    for (let i = 1; gridContent.length < gridSize; i++) {
        let nextMonthDate = `${month == 12 ? year + 1 : year}-${month == 12 ? 1 : month}-${i}`
        gridContent.push(
            <GridCell key={nextMonthDate} date={nextMonthDate} isPassive='true'></GridCell>
        )
    }

    function GridCell({ date, isPassive = null, isToday = null }) {

        return (
            <div className={isPassive ? 'passive' : null} id={date}>
                <div>
                    <h2 style={{ fontWeight: isToday ? "bold" : null }}>{date.match(/\d+$/)[0].replace(/^0+/, '')}</h2>
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
