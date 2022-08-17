import "./index.css";
import { useState, useEffect } from "react";

function App() {
  function celsiusAFahrenheit(celsius) {
    let fahrenheit = celsius * 1.8 + 32;
    return fahrenheit;
  }

  function fahrenheitACelsius(fahrenheit) {
    let celsius = (fahrenheit - 32) * (5 / 9);
    return celsius;
  }

  function celsiusAKelvin(celsius) {
    return parseFloat(celsius) + 273.15;
  }

  function kelvinACelsius(kelvin) {
    return kelvin - 273.15;
  }

  function fahrenheitAKelvin(fahrenheit) {
    let celsius = fahrenheitACelsius(fahrenheit),
      kelvin = celsiusAKelvin(celsius);
    return kelvin;
  }

  function kelvinAFahrenheit(kelvin) {
    let celsius = kelvinACelsius(kelvin),
      fahrenheit = celsiusAFahrenheit(celsius);
    return fahrenheit;
  }

  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(0);
  const [kelvin, setKelvin] = useState(0);
  const [escala, setEscala] = useState(1);
  const [temperatura, setTemperatura] = useState('');

  const handleTemperaturaChange = (e) => {
      setTemperatura(e.target.value);
  };

  const handleEscalaChange = (e) => {
    setEscala(parseInt(e.target.value));
  };

  useEffect(() => {
    if (temperatura.trim() !== '' && !isNaN(temperatura)) {
      switch (escala) {
        case 1:
          setCelsius(temperatura);
          setFahrenheit(celsiusAFahrenheit(temperatura));
          setKelvin(celsiusAKelvin(temperatura));
          break;
        case 2:
          setCelsius(fahrenheitACelsius(temperatura));
          setFahrenheit(temperatura);
          setKelvin(fahrenheitAKelvin(temperatura));
          break;
        case 3:
          setCelsius(kelvinACelsius(temperatura));
          setFahrenheit(kelvinAFahrenheit(temperatura));
          setKelvin(temperatura);
          break;
      }
    } else {
      setCelsius(0);
      setFahrenheit(0);
      setKelvin(0);
    }
  }, [escala, temperatura]);

  return (
    <div className="container">
      <div className="d-flex flex-column justify-content-center vh-100">
        <div className="row p-5 justify-content-center bg-coral">
          <h1 className="text-center mb-5">Conversor de temperaturas</h1>
          <div className="col-12 col-md-5">
            <form>
              <div className="d-flex justify-content-between">
                <div className="form-floating">
                  <select
                    className="form-select w-200px"
                    id="escala"
                    value={escala}
                    onChange={handleEscalaChange}
                  >
                    <option value={1}>
                      Celsius °C
                    </option>
                    <option value={2}>Fahrenheit °F</option>
                    <option value={3}>Kelvin K</option>
                  </select>
                  <label htmlFor="escala">Escala de temperatura: </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="temperatura"
                    placeholder="Ingrese la temperatura"
                    value={temperatura}
                    onChange={handleTemperaturaChange}
                  />
                  <label htmlFor="temperatura">Ingrese la temperatura:</label>
                  <div className="invalid-feedback color-dark" id="error"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row p-5 bg-satin">
          <div className="resultados">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Grados Celsius</h5>
                <h6 className="card-subtitle mb-2 text-muted">{celsius} °C</h6>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Grados Fahrenheit</h5>
                <h6 className="card-subtitle mb-2 text-muted">{fahrenheit} °F</h6>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Grados Kelvin</h5>
                <h6 className="card-subtitle mb-2 text-muted">{kelvin} K</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
