import React from 'react';
import Chessboard from 'chessboardjsx';

const Chess = require('chess.js');

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chess: new Chess(),
      fen: 'start',
      // square styles for active drop square
      dropSquareStyle: {},
      // custom square styles
      squareStyles: {},
      // square with the currently clicked piece
      pieceSquare: '',
      // currently clicked square
      square: '',
      // array of past game moves
      history: []
    };

    this.handleMove = this.handleMove.bind(this);
    this.showHistory = this.showHistory.bind(this);
  }

  componentDidMount() {
    this.setState({ fen: this.state.chess.fen() });
  }

  handleMove({ sourceSquare, targetSquare }) {
    // see if the move is legal
    console.log(sourceSquare, targetSquare);
    const move = this.state.chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;
    this.setState(({ history, pieceSquare }) => ({
      fen: this.state.chess.fen(),
      history: this.state.chess.history({ verbose: true })
      // squareStyles: squareStyling({ pieceSquare, history })
    }));
    if (this.state.history.length !== 0 && this.state.history[this.state.history.length - 1].san.includes('#')) {
      console.log('mate');
    }
  }

  showHistory() {
    console.log(this.state.history);

  }

  render() {
    console.log(this.state.fen);
    return (
        <>
          <Chessboard
            width={400}
            position={this.state.fen}
            onPieceClick={() => { console.log(this.state.chess.pgn()); }}
            onDrop={this.handleMove}
          />
          <button onClick={this.showHistory}>History</button>
        </>
    );

  }
}
