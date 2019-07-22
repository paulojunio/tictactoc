import React from 'react';
import Campo from './Campo';

class Tabuleiro extends React.Component {
    /*constructor(props) {
        super(props);
        this.state = {
            campos: Array(9).fill(null),
            proximoX: true,
        };
    }*/
    renderSquare(i) {
      return ( 
      <Campo valor={this.props.campos[i]}
       onClick={() => this.props.onClick(i)}
      />
      );
    }
    render() {
      
      /*const ganhador = declarandoVencedor(this.state.campos);
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
      }*/
      return (
        <div>
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
  export default Tabuleiro;