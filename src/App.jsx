import { useState, useEffect } from 'react'
import Photo from './Photo.jsx'
import CalendarGrid from './CalendarGrid.jsx'

export default function App() {
  const [currentDate, setCurrentDate] = useState(getCurrentDate())

  function getCurrentDate() {
    return new Date().toISOString().slice(0, 10) // eg. 2024-05-07
  }

  function updateDate(newDate = getCurrentDate()) {
    if (currentDate != newDate) setCurrentDate(newDate)
  }

  function getMonth(date) {
    const str = Intl.DateTimeFormat('fi', { month: 'long' }).format(new Date(date))
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  function getYear(date) {
    return Intl.DateTimeFormat('fi', { year: 'numeric' }).format(new Date(date))
  }

  function CalendarTitle({ date }) {
    const month = getMonth(date)
    const year = getYear(date)
    return (
      <header>
        <h1 className='font-l'>{month}</h1>
        <p className='font-l'>{year}</p>
      </header>
    )
  }

  useEffect(() => {
    // const interval = setInterval(updateDate, 1000)
    // return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Photo date={currentDate}></Photo>
      <div id='calendar'>
        <CalendarTitle date={currentDate}></CalendarTitle>
        <CalendarGrid date={currentDate}></CalendarGrid>
      </div>
    </>
  )
}
