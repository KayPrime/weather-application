window.addEventListener("load", (evt) => {
    const inputForm = document.getElementById("input-form");
    const submitBtn = document.getElementById("form-submit");
    const nameInput = document.getElementById("name-input");
    const cityInput = document.getElementById("city-input");
    const weatherInfo = document.querySelector(".weather-info");
    const inputDiv = document.querySelector(".input-div");
    const containerDiv = document.querySelector(".main-container");
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
                inputForm.append(submitBtn);
            }
            else if (!nameInput.value && cityInput.value) {
                alert("Kindly enter your name or nickname");
                inputForm.append(submitBtn);
            }
            else if (!cityInput.value && nameInput.value) {
                alert("Pls enter a city");
                inputForm.append(submitBtn);
            }
            else if (combinedData != -1) {
                inputDiv.remove();

                const tempEle = document.createElement("h1");
                const greetEle = document.createElement("h3");
                const cityEle = document.createElement("h4");
                const weatherEle = document.createElement("h3");
                const weatherDesEle = document.createElement("p");
                const tempHeadEle = document.createElement("h3");
                const pressureEle = document.createElement("h4");
                const humidityEle = document.createElement("h4");
                const windspeedEle = document.createElement("h4");
                const cloudEle = document.createElement("h4");
                const sunriseEle = document.createElement("h4");
                const sunsetEle = document.createElement("h4");
                const tempFeelsEle = document.createElement("h5");
                const tempMinEle = document.createElement("h5");
                const tempMaxEle = document.createElement("h5");
                const tempsFeelsValEle = document.createElement("p");
                const tempMinValEle = document.createElement("p");
                const tempMaxValEle = document.createElement("p");
                const pressureValEle = document.createElement("p");
                const humidityValEle = document.createElement("p");
                const windSpeedValEle = document.createElement("p");
                const cloudValEle = document.createElement("p");
                const sunriseValEle = document.createElement("p");
                const sunsetValEle = document.createElement("p");
                const mainInfoDiv = document.createElement("div");
                const weathInfoDispDiv = document.createElement("div");
                const weatherInfoDiv = document.createElement("div");
                const cityDiv = document.createElement("div");
                const weatherConDiv = document.createElement("div");
                const tempDiv = document.createElement("div");
                const tempMainDiv = document.createElement("div");
                const tempMinorDiv = document.createElement("div");
                const tempMinorSupDiv1 = document.createElement("div");
                const tempMinorSupDiv2 = document.createElement("div");
                const tempMinorSupDiv3 = document.createElement("div");
                const otherDataDiv = document.createElement("div");
                const otherDataSubDiv1 = document.createElement("div");
                const otherDataSubDiv2 = document.createElement("div");
                const otherDataSubDiv3 = document.createElement("div");
                const otherDataSubDiv4 = document.createElement("div");
                const otherDataSubDiv5 = document.createElement("div");
                const otherDataSubDiv6 = document.createElement("div");
                const countryFactMainDiv = document.createElement("div");
                const cityIsIn = document.createElement("h3");
                const countryFacts = document.createElement("p");
                const countryFactMinDiv = document.createElement("div");
                const searchDiv = document.createElement("div");
                const searchP = document.createElement("p");
                const searchButton = document.createElement("button");
                const greetingsDiv = document.createElement("div")
                const greetingText = document.createElement("h1");

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
                weatherInfo.append(searchDiv, greetingsDiv, mainInfoDiv, countryFactMainDiv);
                greetingsDiv.append(greetingText);
                searchDiv.append(searchP);
                searchP.append(searchButton);
                mainInfoDiv.append(weathInfoDispDiv, weatherInfoDiv);
                weatherInfoDiv.append(cityDiv, weatherConDiv, tempDiv, otherDataDiv);
                tempDiv.append(tempMainDiv, tempMinorDiv);
                weathInfoDispDiv.append(greetEle);
                cityDiv.append(cityEle);
                weatherConDiv.append(weatherEle, weatherDesEle);
                tempMainDiv.append(tempHeadEle, tempEle);
                tempMinorDiv.append(tempMinorSupDiv1, tempMinorSupDiv2, tempMinorSupDiv3);
                tempMinorSupDiv1.append(tempFeelsEle, tempsFeelsValEle);
                tempMinorSupDiv2.append(tempMinEle, tempMinValEle);
                tempMinorSupDiv3.append(tempMaxEle, tempMaxValEle);
                otherDataDiv.append(otherDataSubDiv1, otherDataSubDiv2, otherDataSubDiv3, otherDataSubDiv4, otherDataSubDiv5, otherDataSubDiv6);
                otherDataSubDiv1.append(pressureEle, pressureValEle);
                otherDataSubDiv2.append(humidityEle, humidityValEle);
                otherDataSubDiv3.append(cloudEle, cloudValEle);
                otherDataSubDiv4.append(windspeedEle, windSpeedValEle);
                otherDataSubDiv5.append(sunriseEle, sunriseValEle);
                otherDataSubDiv6.append(sunsetEle, sunsetValEle);
                countryFactMainDiv.append(countryFactMinDiv);
                countryFactMinDiv.append(cityIsIn, countryFacts);

                greetingText.innerText = `Hello ${name}`
                searchButton.innerText = `Search`
                weatherEle.innerHTML = `<img src="https://openweathermap.org/img/wn/${finalWeatherInfo.icon}@2x.png" alt="weather-symbol" style="width: 67px; height: 67px;"> ${finalWeatherInfo.main}`
                weatherDesEle.innerText = `${finalWeatherInfo.description}`
                tempHeadEle.innerText = `Temperature`
                tempEle.innerText = `${tempConv(finalWeatherInfo.temp)} °C`
                greetEle.innerText = `Current Weather Info`
                cityEle.innerText = `${finalWeatherInfo.cityname}, ${finalCountryInfo.countryname}`
                tempFeelsEle.innerText = `Feels Like`
                tempsFeelsValEle.innerText = `${tempConv(finalWeatherInfo.feelsLike)} °C`
                tempMinEle.innerText = `Min Temp`
                tempMinValEle.innerText = `${tempConv(finalWeatherInfo.minTemp)} °C`
                tempMaxEle.innerText = `Max Temp`
                tempMaxValEle.innerText = `${tempConv(finalWeatherInfo.maxTemp)} °C`
                pressureEle.innerText = `Pressure`
                pressureValEle.innerText = `${finalWeatherInfo.pressure} mbar`
                humidityEle.innerText = `Humidity`
                humidityValEle.innerText = `${finalWeatherInfo.humidity} %`
                cloudEle.innerText = `Cloudiness`
                cloudValEle.innerText = `${finalWeatherInfo.clouds} %`
                windspeedEle.innerText = `Wind Speed`;
                windSpeedValEle.innerText = `${speedConv(finalWeatherInfo.windSpeed)} Km/Hr`
                sunriseEle.innerText = `Sunrise`
                sunriseValEle.innerText = `${timeConv(finalWeatherInfo.sunrise)} UTC`
                sunsetEle.innerText = `Sunset`
                sunsetValEle.innerText = `${timeConv(finalWeatherInfo.sunset)} UTC`
                cityIsIn.innerText = `${finalWeatherInfo.cityname} is a city in ${finalCountryInfo.countryname}`;
                countryFacts.innerText = `${finalCountryInfo.countryname} is in ${finalCountryInfo.continent} Continent. Its official name is ${finalCountryInfo.officialName} and the capital is ${finalCountryInfo.capital}. Its population is ${finalCountryInfo.population}.`;

                weatherInfo.classList.add("row", "p-0", "m-0", "class100", "col-12", "col-md-10", "col-lg-10", "justify-content-center", "gap-2");
                greetingsDiv.classList.add("col-11", "d-flex", "align-items-center", "justify-content-center", "justify-content-sm-start", "p-0")
                searchDiv.classList.add("col-11", "d-flex", "align-items-center", "justify-content-sm-end", "justify-content-center", "p-0");
                searchP.classList.add("text-end", "m-0");
                searchButton.classList.add("btn", "btn-primary");
                mainInfoDiv.classList.add("col-lg-8", "col-sm-11", "d-flex", "justify-content-center", "flex-column", "text-center", "border", "border-primary", "border-2", "rounded", "p-0");
                weathInfoDispDiv.classList.add("bg-primary", "text-light", "mb-2");
                greetEle.classList.add("py-2", "m-0")
                countryFactMainDiv.classList.add("col-lg-3", "col-sm-11", "d-flex", "justify-content-center", "align-items-center", "flex-column", "text-center", "border", "border-primary", "border-2", "rounded", "p-0", "bg-primary-subtle");
                tempMinorDiv.classList.add("row", "mb-2");
                tempMinorSupDiv1.classList.add("col-md-4", "col-12", "mb-1");
                tempMinorSupDiv2.classList.add("col-md-4", "col-12", "mb-1");
                tempMinorSupDiv3.classList.add("col-md-4", "col-12", "mb-1");
                otherDataDiv.classList.add("row");
                otherDataSubDiv1.classList.add("col-lg-4", "col-md-6", "col-12", "mb-1");
                otherDataSubDiv2.classList.add("col-lg-4", "col-md-6", "col-12", "mb-1");
                otherDataSubDiv3.classList.add("col-lg-4", "col-md-6", "col-12", "mb-1");
                otherDataSubDiv4.classList.add("col-lg-4", "col-md-6", "col-12", "mb-1");
                otherDataSubDiv5.classList.add("col-lg-4", "col-md-6", "col-12", "mb-1");
                otherDataSubDiv6.classList.add("col-lg-4", "col-md-6", "col-12", "mb-1");
                tempEle.classList.add("temp-val", "m-0", "p-2", "bg-primary-subtle");
                weatherEle.classList.add("rain-main", "bg-primary", "text-light", "m-0", "p-1");
                weatherDesEle.classList.add("m-0", "p-1", "bg-primary-subtle");
                tempHeadEle.classList.add("bg-primary", "text-light", "m-0", "py-1");
                cityEle.classList.add("m-0", "py-2", "bg-primary-subtle");
                tempFeelsEle.classList.add("m-0", "py-1", "bg-primary", "text-light");
                tempsFeelsValEle.classList.add("m-0", "py-1", "bg-primary-subtle");
                tempMinEle.classList.add("m-0", "py-1", "bg-primary", "text-light");
                tempMinValEle.classList.add("m-0", "py-1", "bg-primary-subtle");
                tempMaxEle.classList.add("m-0", "py-1", "bg-primary", "text-light");
                tempMaxValEle.classList.add("m-0", "py-1", "bg-primary-subtle");
                pressureEle.classList.add("m-0", "py-1", "bg-primary", "text-light");
                pressureValEle.classList.add("m-0", "py-1", "bg-primary-subtle");
                humidityEle.classList.add("m-0", "py-1", "bg-primary", "text-light");
                humidityValEle.classList.add("m-0", "py-1", "bg-primary-subtle");
                windspeedEle.classList.add("m-0", "py-1", "bg-primary", "text-light");
                windSpeedValEle.classList.add("m-0", "py-1", "bg-primary-subtle");
                cloudEle.classList.add("m-0", "py-1", "bg-primary", "text-light");
                cloudValEle.classList.add("m-0", "py-1", "bg-primary-subtle");
                sunriseEle.classList.add("m-0", "py-1", "bg-primary", "text-light");
                sunriseValEle.classList.add("m-0", "py-1", "bg-primary-subtle");
                sunsetEle.classList.add("m-0", "py-1", "bg-primary", "text-light");
                sunsetValEle.classList.add("m-0", "py-1", "bg-primary-subtle");
                weatherConDiv.classList.add("mb-2");
                tempMainDiv.classList.add("mb-2");
                cityDiv.classList.add("mb-2");
                greetingText.classList.add("m-0", "text-success");
                countryFacts.classList.add("mx-1");

                searchButton.addEventListener("click", (e) => {
                    searchDiv.remove();
                    mainInfoDiv.remove();
                    countryFactMainDiv.remove();
                    greetingsDiv.remove();
                    weatherInfo.classList.remove("class100");
                    containerDiv.append(inputDiv);
                    cityInput.value = "";
                    cityInput.focus();
                    inputForm.append(submitBtn);
                })
            }
            else {
                alert("Invalid City");
                inputForm.append(submitBtn);
            };
        })
            .catch();
    });
});
