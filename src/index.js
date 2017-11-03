import React from 'react';
import ReactDom from 'react-dom';
import './index.css'

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);

    //binding
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTeamperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;

    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />

        <BoilingVerdict celsius={parseFloat(temperature)} />
      </fieldset>
    )
  }
}

function BoilingVerdict(props) {
  if (props.celsius >= 100)
    return <p>The water would boil.</p>;
  
  return <p>The water would not boil.</p>;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      celsius: '',
      fahrenheit: ''
    }

    //bind
    this.handleCelsius = this.handleCelsius.bind(this);
    this.handleFahrenheit = this.handleFahrenheit.bind(this);
  }

  handleCelsius(celsius) {
    const fahrenheit = tryConvert(celsius, toFahrenheit);
    this.setState({ celsius, fahrenheit });
  }

  handleFahrenheit(fahrenheit) {
    const celsius = tryConvert(fahrenheit, toCelsius);
    this.setState({ celsius, fahrenheit });
  }

  render() {
    return (
      <div>
        <TemperatureInput onTeamperatureChange={this.handleCelsius} scale="c" temperature={this.state.celsius}/>
        <br/><br/>
        <TemperatureInput onTeamperatureChange={this.handleFahrenheit} scale="f" temperature={this.state.fahrenheit}/>
      </div>
    )
  }
}

ReactDom.render(
  <Calculator />,
  document.getElementById('root')
);

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}