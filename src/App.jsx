import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'
import { Card } from './components/Card';
import backgrounds from './json/backgrounds.json'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [backgroundsImages, setBackgroundsImages] = useState()
  const [backroundsCard, setBackroundsCard] = useState()
  const [temperature, setTemperature] = useState()

  const success = res => {
    setCoords({
      latitude: res.coords.latitude,
      longitude: res.coords.longitude
    });
  }

  useEffect(() => {
    console.log("Entro al primer UseEffect");
    navigator.geolocation.getCurrentPosition(success)
  }, [])


  useEffect(() => {

    if (coords) {
      console.log("Entro al segundo UseEffect");
      const lat = coords.latitude;
      const lon = coords.longitude;
      const API_key = "ccf573de86bef19cc21ea41ac6c84715"
      const API_Link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
      
      axios.get(API_Link)
        .then(res => {
          setWeather(res.data)
          const mainWeather = res.data.weather[0].main
          setBackgroundsImages(backgrounds[mainWeather]["backgroundImages"])
          const kelvin = res.data.main.temp
          setBackroundsCard(backgrounds[mainWeather]["background-color"])
          setTemperature({
            celcius: (kelvin - 273.15).toFixed(1),
            fahrenheit: (1.8 * (kelvin - 273) + 32).toFixed(1)
          })

        })
        .catch(err => console.log(err))
    }
  }, [coords])

  useEffect(() => {
    if (backgroundsImages) {
      const images = document.querySelectorAll('.image')
      images.forEach((element, index) => {
        element.style.backgroundImage = `url(${backgroundsImages[index]})`
      })
      images[0].classList.add('image-Active')
      let i = 1
      let start = false
      setInterval(() => {
        if (!start) {
          images[i - 1].classList.remove('image-Active')
          images[i].classList.add('image-Active')
          i++
          if (i === backgroundsImages.length) {
            start = true
            i = 1
          }
        } else {
          images[0].classList.add('image-Active')
          images[images.length - 1].classList.remove('image-Active')
          start = false
        }
      }, 10000)

    }
  }, [backgroundsImages])


  return (
    <div className="App flexItemsCentered">
      {
        backgroundsImages ?
          <>
            <div className="backgroundsContainer">
              {backgroundsImages ? backgroundsImages.map((x, index) => <div key={index} className="image"></div>) : ""}
            </div>
            <Card
              name={weather.name}
              country={weather.sys.country}
              icon={weather.weather[0].icon}
              description={weather.weather[0].description}
              wind={weather.wind.speed}
              clouds={weather.clouds.all}
              pressure={weather.main.pressure}
              temperature={temperature}
              backgroundCard={backroundsCard}
            />
          </>
          :
          <span className="loader"></span>
      }
    </div >
  )
}

export default App
