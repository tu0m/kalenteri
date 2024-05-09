import { useState, useEffect } from 'react'

export default function Photo({ date }) {

    function getImageUrl(date) {
        const month = date.slice(5, 7) // '01..'12'
        return new URL(`/assets/${month}.jpg`, import.meta.url).href
    }

    return (
        <div id="photo">
            <img src={getImageUrl(date)} alt="photo"></img>
        </div>
    )
}
