import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [city, setCity] = useState("Manali");
  const [wheatherData, setWheatherData] = useState(null);
  const currentDate = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const shownDate = `${month} ${day},${year} `;

  const apiKey = "3dfe7e94ab12739cf7e7fcb0a5be5060";

  const fetchWheatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );

      const data = await response.json();
      console.log(data);
      setWheatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWheatherData();
  }, []);

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWheatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return "/thunder.png"; // Path to your sunny weather icon
      case "Rain":
        return "/rain.png"; // Path to your rainy weather icon
      case "Mist":
        return "/Tornado.png"; // Path to your snowy weather icon

      case "clear sky":
        return "/sunny.png"; // Path to your haze weather icon
      // Add more cases for other weather conditions as needed

      case "smoke":
        return "/rain.png";
      default:
        return "/sunny.png";
    }
  };
  return (
    <div>
      <div className="container">
        {wheatherData && (
          <>
            <h1 className="containerDate">{shownDate}</h1>
            <div className="wheatherData">
              <h2 className="containerCity">{wheatherData.name}</h2>
              <img
                className="container_img"
                src={getWeatherIconUrl(wheatherData.weather[0].main)}
                width="180px"
                alt="Weather Icon"
              />
              <h2 className="containerDeg">
                {wheatherData.main
                  ? `${(wheatherData.main.temp - 273.15).toFixed(2)}°C`
                  : "Loading..."}
              </h2>
              <h2 className="countryMsg">
                {" "}
                {wheatherData.weather
                  ? wheatherData.weather[0].description
                  : "Loading..."}{" "}
              </h2>

              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text "
                  className="input"
                  placeholder="Enter City Name"
                  onChange={handleInputChange}
                />
                <button type="submit" className="button">
                  Get
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
