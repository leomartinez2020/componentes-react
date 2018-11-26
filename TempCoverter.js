import React, { Component } from 'react';
import '../Styles.css';

function convierte(escala, temperature) {
    return escala === 'c' ?
        Math.round(temperature * 9 / 5 + 32) :
        Math.round((temperature - 32.0) * 5.0 / 9.0);
}

function Resultado(props) {
  if (props.value === '') {
    return <p>&nbsp;</p>
  }
  return <p>{props.value} {escalas[props.escala]} equivale a {props.result} {escalas[props.otraEscala]}</p>
}

const escalas = {
    c: 'Celcius',
    f: 'Fahrenheit'
}

class TempCoverter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            escala: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(escala, event) {
        this.setState({
            value: event.target.value,
            escala: escala
        });
    }



    render() {
        const temp = this.state.value;
        const escala = this.state.escala;
        let otraEscala = this.state.escala === 'f' ? 'c' : 'f';
        let result = temp === '' ? '' : convierte(escala, temp).toString();
        return (
            <div className="container">
                <h1>Temperature Coverter</h1>
                <Resultado value={this.state.value} escala={escala} result={result} otraEscala={otraEscala} />
                <div className="dos-bloques">
                    <div className="un-bloque">
                        <input type="text" value={escala === 'f' ? this.state.value : result} onChange={this.handleChange.bind(this, 'f')} />
                        <p>Fahrenheit</p>
                    </div>
                    <div className="un-bloque celcius">
                    <input type="text" value={escala === 'c' ? this.state.value : result} onChange={this.handleChange.bind(this, 'c')} />
                        <p>Celcius</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default TempCoverter;
