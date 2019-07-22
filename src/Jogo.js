import React from 'react';
import Tabuleiro from './Tabuleiro';
import { hostname } from 'os';

class Jogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historico: [{
        campos: Array(9).fill(null),
      }],
      NumeroPassos: 0,
      proximoX: true,
    }
  }  

  quandoClickar(i) {
    const historico = this.state.historico.slice(0,this.state.NumeroPassos + 1);
    const estadoAtual = historico[historico.length - 1];
    const campos = estadoAtual.campos.slice();
    if(declarandoVencedor(campos) || campos[i]) {
        return;
    }
    if(this.state.proximoX) {
        campos[i] = 'X';
    }else{
        campos[i] = 'O';
    }
    this.setState({
        historico : historico.concat([{
          campos: campos,
        }]),
        NumeroPassos: historico.length,
        proximoX: !this.state.proximoX,
    });
  }
  pulePara(passo) {
    this.setState({
      NumeroPassos: passo,
      proximoX: (passo % 2) === 0,
    })
  }
  render() {
      const historico = this.state.historico;
      const estadoAtual = historico[this.state.NumeroPassos];
      const ganhador = declarandoVencedor(estadoAtual.campos);

      const movimentos = historico.map((passo, movimento) => {
        const desc = movimento ? "Go to move #" + movimento:
        "Go to game start";
        
        return ( <li key={movimento}> <button onClick={() => this.pulePara(movimento)}>{desc}</button></li>)
      })
      let status;
      if(ganhador) {
        status = 'Ganhador é : ' + ganhador;
      }else{
        let velha = verificarVelha(estadoAtual.campos);
        if(velha) {
            status = "Que pena, deu velha!"
        }else{
            status = 'Próximo a jogar: ' + (this.state.proximoX ? 'X' : 'O');
        }
      }
      return (
        <div className="game">
          <div className="game-board">
            <Tabuleiro 
            campos = {estadoAtual.campos}
            onClick={(i) => this.quandoClickar(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>  
            <ol>{movimentos}</ol>
          </div>
        </div>
      );
    }
  }
function verificarVelha(campos) {
  for(let i = 0; i < campos.length; i++) {
    if(campos[i] === null) {
        return false;
    }
  }
  return true;
}
function declarandoVencedor(campos) {
  const linhas = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
  ];
  for(let i = 0; i < linhas.length; i++) {
    const [a,b,c] = linhas[i];
    if(campos[a] && campos[a] === campos[b] && campos[b] === campos[c]) {
        return campos[a];
    }
  }
  return null;
}
export default Jogo;