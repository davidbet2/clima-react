import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

class App extends Component {

  state = {
    error: '',
    consulta: {},
    resultado: {}
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.consulta !== this.state.consulta ) {
      this.consultarApi();
    }
  }

  componentDidMount() {
    this.setState({
      error: false
    })
  }

  consultarApi = () => {
    const {ciudad, pais} = this.state.consulta;
    if(!ciudad || !pais) return null;

    const appId = 'a8d7777276f55def4340a6949f2c1e65';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    fetch(url).then( respuesta => {
      return respuesta.json();
    }).then(datos => {
      this.setState({
        resultado: datos
      })
    })
    .catch(error => {
      console.log(error)
    })

  }

  datosConsulta = respuesta => {
    if(respuesta.ciudad === '' || respuesta.pais === '') {
      this.setState({
        error: true
      })
    } else {
      this.setState({
        consulta: respuesta,
        error : false
      })
    }
}

  render() {

    const {error} = this.state,
          {cod} = this.state.resultado;

    let resultado;

    if(error) {
      resultado = <Error mensaje="Ambos campos son obligatorios"/>
    } else if(cod === '404') {
      resultado = <Error mensaje="Ciudad no encontrada"/>
    } else {
      resultado = <Clima resultado={this.state.resultado}/>
    }

    return (
      <div className="App">
      <Header titulo='Clima React' ></Header>
      <Formulario
      datosConsulta = {this.datosConsulta}
      ></Formulario>
      {resultado}
      </div>
    );
  }
}

export default App;
