const API_KEY = "da9dc732fee0306ae0addec8f7134d65";

const makeURL=(iconId)=> `https://openweathermap.org/img/wn/${iconId}@2x.png`

const url = (city,units) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
   };

const getFormattedData = async (city, units ) => {
//   const URL = `https://api.openweathermap.org/data/2.5/weather?
//     q=${city}&appid=${API_KEY}&units=${units}`;

  const data = await fetch(url(city,units))
    .then((res) => res.json())
    .then((data) => data);

    console.log(data)
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure,humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    iconURL:makeURL(icon),
    temp,
    feels_like,
    temp_max,
    temp_min,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};

export { getFormattedData };
