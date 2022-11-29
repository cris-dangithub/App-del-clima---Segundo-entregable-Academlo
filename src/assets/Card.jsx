import React, { useState } from 'react'

export const Card = (
  { name, country, icon, description, wind, clouds, pressure, temperature, backgroundCard }) => {
  const [isCelcius, setIsCelcius] = useState(true)
  const iconLink = `http://openweathermap.org/img/wn/${icon}@4x.png`
  const handleClick = () => setIsCelcius(!isCelcius)
  const objStyleCrd = {
    backgroundColor: backgroundCard,
    color: "white"
  }
  const windIcon = <i className='bx bx-wind' ></i>
  const cloudIcon = <i className='bx bxs-cloud' ></i>
  const pressIcon = <img className='pressicon' src="https://cdn-user-icons.flaticon.com/86475/86475228/1669747766004.svg?token=exp=1669748690~hmac=4c0a196df1362926ca6ed13699a51b8f" />
  const temperatureIcon = <i className="fa-solid fa-temperature-empty"></i>
  return (
    <div className="card" style={objStyleCrd}>
      <h1 className='card__title'>Weather App</h1>
      <h2 className='card__ubication'>{name}, {country}</h2>
      <section className='card__description'>
        <img className='description__icon' src={iconLink} alt="icon" />
        <section className='description__text'>
          <h3 className='text__title'>{description[0].toUpperCase() + description.slice(1)}</h3>
          <ul className='text__list'>
            <li>{windIcon} Wind speed {wind} m/s</li>
            <li>{cloudIcon} Clouds {clouds}%</li>
            <li>{pressIcon} Pressure {pressure} hPa</li>
          </ul>
        </section>
      </section>
      <h3 className='card__temperature'>{temperatureIcon} {isCelcius ? `${temperature?.celcius} °C` : `${temperature?.fahrenheit} °F`}</h3>
      <button className='card__button' onClick={handleClick}>Change to {isCelcius ? `°F` : `°C`}</button>

    </div>
  )
}
