window.addEventListener("load", (evt) => {
    const inputForm = document.getElementById("main-form");
    const submitBtn = document.getElementById("button");
    const nameInput = document.getElementById("name-input");
    const cityInput = document.getElementById("city-input");
    const weatherInfo = document.getElementById("weather-div");
    const inputDiv = document.getElementById("input-div");
    const btnDiv = document.getElementById("button-div");
    const footerMes = document.getElementById("footer-mes");
    const apiKey = "4f234aec516be627535d63df70ad2362";
    const limit = 1;

    const date = new Date();
    footerMes.innerText = `©Kufre ${date.getFullYear()}`

    async function locationFinder(city) {
        try {
            if (city) {
                const locationFinderAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`;
                const res1 = await fetch(locationFinderAPI);
                const locationData = await res1.json();
                if (locationData.length != 0) {
                    const countryInfoAPI = `https://restcountries.com/v3.1/alpha/${locationData[0].country}`;
                    const weatherInfoAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${locationData[0].lat}&lon=${locationData[0].lon}&appid=${apiKey}`;
                    const result = await Promise.all([
                        fetch(countryInfoAPI),
                        fetch(weatherInfoAPI)
                    ]);
                    const resultPromises = result.map((result) => result.json());
                    finalData = await Promise.all(resultPromises);
                    return finalData;
                }
                else {
                    return -1;
                }
            }
            else {
                return -1;
            }

        } catch (error) {
            console.error(error)
        }
    };
    function nameEditor(nameText) {
        const name = nameText.trim();
        const nameArray = name.split(" ");
        const filteredNames = nameArray.filter(value => {
            return value != "";
        });
        const initial = filteredNames[0].slice(0, 1).toUpperCase();
        const remainder = filteredNames[0].slice(1).toLowerCase();
        const capitalizedName = initial + remainder;
        return capitalizedName;
    };
    function tempConv(K) {
        const C = K - 273.15;
        return C.toFixed(2);
    };
    function speedConv(S) {
        const speedKmHr = S * 3.6;
        return speedKmHr.toFixed(2);
    };
    function timeConv(msec) {
        const date = new Date((msec * 1000));
        hrs = date.getUTCHours();
        mins = date.getUTCMinutes();
        time = `${hrs}:${mins}`;
        return time;
    };
    inputForm.addEventListener("submit", (e) => {
        e.preventDefault();
        submitBtn.remove();

        const userCity = cityInput.value.trim().toLowerCase();

        locationFinder(userCity).then((combinedData) => {
            if (combinedData === -1 && !nameInput.value) {
                alert("Pls enter your name or nickname");
                btnDiv.append(submitBtn);
            }
            else if (!nameInput.value && cityInput.value) {
                alert("Kindly enter your name or nickname");
                btnDiv.append(submitBtn);
            }
            else if (!cityInput.value && nameInput.value) {
                alert("Pls enter a city");
                btnDiv.append(submitBtn);
            }
            else if (combinedData != -1) {
                inputDiv.style.display = "none";
                weatherInfo.removeAttribute("style")
                const name = nameEditor(nameInput.value);
                const countryData = combinedData[0];
                const finalWeatherData = combinedData[1];

                const finalWeatherInfo = {
                    main: finalWeatherData.weather[0].main,
                    description: finalWeatherData.weather[0].description,
                    icon: finalWeatherData.weather[0].icon,
                    temp: finalWeatherData.main.temp,
                    feelsLike: finalWeatherData.main.feels_like,
                    maxTemp: finalWeatherData.main.temp_max,
                    minTemp: finalWeatherData.main.temp_min,
                    pressure: finalWeatherData.main.pressure,
                    humidity: finalWeatherData.main.humidity,
                    windSpeed: finalWeatherData.wind.speed,
                    clouds: finalWeatherData.clouds.all,
                    sunrise: finalWeatherData.sys.sunrise,
                    sunset: finalWeatherData.sys.sunset,
                    cityname: finalWeatherData.name
                };
                const finalCountryInfo = {
                    countryname: countryData[0].name.common,
                    borders: countryData[0].borders,
                    capital: countryData[0].capital[0],
                    continent: countryData[0].continents[0],
                    population: countryData[0].population,
                    officialName: countryData[0].name.official,
                    map: countryData[0].maps.googleMaps
                };

                document.getElementById("greetings-text").innerText = `Hello ${name},`
                document.getElementById("image").src = `https://openweathermap.org/img/wn/${finalWeatherInfo.icon}@2x.png`;
                document.getElementById("main-weather").innerText = `${finalWeatherInfo.main}`
                document.getElementById("min-weather").innerText = `${finalWeatherInfo.description}`
                document.getElementById("main-temp").innerText = `${tempConv(finalWeatherInfo.temp)} °C`
                document.getElementById("city-country").innerText = `${finalWeatherInfo.cityname}, ${finalCountryInfo.countryname}`
                document.getElementById("feels-like").innerText = `${tempConv(finalWeatherInfo.feelsLike)} °C`
                document.getElementById("min-temp").innerText = `${tempConv(finalWeatherInfo.minTemp)} °C`
                document.getElementById("max-temp").innerText = `${tempConv(finalWeatherInfo.maxTemp)} °C`
                document.getElementById("pressure").innerText = `${finalWeatherInfo.pressure} mbar`
                document.getElementById("humidity").innerText = `${finalWeatherInfo.humidity} %`
                document.getElementById("cloudiness").innerText = `${finalWeatherInfo.clouds} %`
                document.getElementById("windspeed").innerText = `${speedConv(finalWeatherInfo.windSpeed)} Km/Hr`
                document.getElementById("sunrise").innerText = `${timeConv(finalWeatherInfo.sunrise)} UTC`
                document.getElementById("sunset").innerText = `${timeConv(finalWeatherInfo.sunset)} UTC`
                document.getElementById("facts-one").innerText = `${finalWeatherInfo.cityname} is a city in ${finalCountryInfo.countryname}`;
                document.getElementById("facts-two").innerText = `${finalCountryInfo.countryname} is in ${finalCountryInfo.continent} Continent. Its official name is ${finalCountryInfo.officialName} and the capital is ${finalCountryInfo.capital}. Its population is ${finalCountryInfo.population}.`;
                const findBtn = document.getElementById("find-btn");

                findBtn.addEventListener("click", (e) => {
                    weatherInfo.style.display = "none";
                    inputDiv.style.display = "flex";
                    cityInput.value = "";
                    cityInput.focus();
                    btnDiv.append(submitBtn);
                })
            }
            else {
                alert("Invalid City");
                btnDiv.append(submitBtn);
            };
        })
            .catch((e) => console.log(e));
    });
});
