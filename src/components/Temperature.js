import React from 'react'

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

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

function BoilingVerdic(props) {
  if (props.celsius >= 100) {
    return <p>The Water would boil.</p>
  }
  return <p>The Water would not boil.</p>
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.onTemperatureChange(event.target.value);
  }
  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}: </legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    )
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      scale: 'c'
    }
  }
  handleCelsiusChange = (temperature) => {
    this.setState({ scale: 'c', temperature });
  }
  handleFaChange = (temperature) => {
    this.setState({ scale: 'f', temperature });
  }
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const cel = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fa = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div className='new-component'>
        <TemperatureInput scale='c' temperature={cel} onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput scale='f' temperature={fa} onTemperatureChange={this.handleFaChange} />
        <BoilingVerdic celsius={parseFloat(cel)} />
      </div>
    )
  }
}
export default Calculator;