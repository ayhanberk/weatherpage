const container = document.querySelector('.weather-container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const APIKey = '1c3fc77c0dea43ceba045315241405';
search.addEventListener('click', () => {
    const regex = new RegExp(/^[a-zA-Z]+$/g)

    const city = document.querySelector('.search-box input').value


    const lang = "tr"

    if (city == '' || !regex.test(city))
        return;

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${city}&days=7`)
        // fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&lang=${lang}`)
        .then((response) => response.json()).then((json) => {
            console.log("cevap", json)

            if (json.error) {
                cityHide.textContent = city
                container.style.height = '400px'
                weatherBox.classList.remove('active')
                weatherDetails.classList.remove('active')
                error404.classList.add('active')
                return;
            }


            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent == city) {
                return;
            } else {
                cityHide.textContent = city;

                container.style.height = '500px'
                container.classList.add('active')
                weatherBox.classList.add('active')
                weatherDetails.classList.add('active')
                error404.classList.remove('active')

                setTimeout(() => {
                    container.classList.remove('active')
                }, 2500)



                image.src = json.current.condition.icon;
                image.style.width = "25%"
                temperature.innerHTML = `${json.current["temp_c"]}<span>°C</span>`;
                description.innerHTML = `${json.current.condition["text"]}`;
                humidity.innerHTML = `${json.current["humidity"]}%`;
                wind.innerHTML = `${json.current["wind_kph"]}Km/h`;

                const infoWeather = document.querySelector('.info-weather');
                const infoHumidity = document.querySelector('.info-humidity');
                const infoWind = document.querySelector('.info-wind');

                const elCloneInfoWeather = infoWeather.cloneNode(true);
                const elCloneInfoHumidity = infoHumidity.cloneNode(true);
                const elCloneInfoWind = infoWind.cloneNode(true);

                elCloneInfoWeather.id = 'clone-info-weather';
                elCloneInfoWeather.classList.add('active-clone');

                elCloneInfoHumidity.id = 'clone-info-humidity';
                elCloneInfoHumidity.classList.add('active-clone');

                elCloneInfoWind.id = 'clone-info-wind';
                elCloneInfoWind.classList.add('active-clone');

                setTimeout(() => {
                    infoWeather.insertAdjacentElement('afterend', elCloneInfoWeather);
                    infoHumidity.insertAdjacentElement('afterend', elCloneInfoHumidity);
                    infoWind.insertAdjacentElement('afterend', elCloneInfoWind);
                }, 2200);

                const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
                const totalCloneInfoWeather = cloneInfoWeather.length;
                const cloneInfoWeatherFirst = cloneInfoWeather[0];

                const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
                const cloneInfoHumidityFirst = cloneInfoHumidity[0];

                const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
                const cloneInfoWindFirst = cloneInfoWind[0];


                if (totalCloneInfoWeather > 0) {
                    cloneInfoWeatherFirst.classList.remove('active-clone');
                    cloneInfoHumidityFirst.classList.remove('active-clone');
                    cloneInfoWindFirst.classList.remove('active-clone');

                    setTimeout(() => {
                        cloneInfoWeatherFirst.remove(true);
                        cloneInfoHumidityFirst.remove(true);
                        cloneInfoWindFirst.remove(true);
                    }, 2200)
                }

            }

        }).catch((err) => {
            console.log('err', err)

        })
})