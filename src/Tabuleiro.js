import React from 'react';
import Campo from './Campo';

class Tabuleiro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campos: Array(9).fill(null),
            proximoX: true,
        };
    }
    renderSquare(i) {
      return ( 
      <Campo valor={this.state.campos[i]}
       onClick={() => this.quandoClickar(i)}
      />
      );
    }
    quandoClickar(i) {
        const campos = this.state.campos.slice();
        if(declarandoVencedor(campos) || campos[i]) {
            return;
        }
        if(this.state.proximoX) {
            campos[i] = 'X';
        }else{
            campos[i] = 'O';
        }
        this.setState({
            campos: campos,
            proximoX: !this.state.proximoX,
        });
    }
  
    render() {
      
      const ganhador = declarandoVencedor(this.state.campos);
      let status;
      if(ganhador) {
        status = 'Ganhador é : ' + ganhador;
      }else{
        let velha = verificarVelha(this.state.campos);
        if(velha) {
            status = "Que pena, deu velha!"
        }else{
            status = 'Próximo a jogar: ' + (this.state.proximoX ? 'X' : 'O');
        }
      }
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
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
  export default Tabuleiro;