import React from 'react';
import Chessboard from 'chessboardjsx';

export default function Home(props) {
  return (
    <>
    <Chessboard
      width={400}
      position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    />
    </>
  );
}
