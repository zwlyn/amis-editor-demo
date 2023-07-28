/*
 * @Author: zhaowei 1666013677@qq.com
 * @Date: 2023-06-01 13:44:29
 * @LastEditors: zhaowei 1666013677@qq.com
 * @LastEditTime: 2023-06-01 15:40:51
 * @FilePath: \amis-editor-demo\src\renderer\game-renderer.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Renderer} from 'amis';
import {RendererProps} from 'amis';
import React from 'react';
import {useState} from 'react';
export interface GameRendererProps extends RendererProps {
  target?: string;
}

@Renderer({
  test: /\bgame-renderer$/,
  name: 'game-renderer'
})
export default class GameRenderer extends React.Component<GameRendererProps> {
  static defaultProps = {
    target: 'world'
  };

  render() {
    const {target} = this.props;
    function Square({value, onSquareClick}: {value: string, onSquareClick: () => void}){
        return <button className='square-item' onClick={onSquareClick}>{value}</button>
    }
    function Board(){
        const [squares, setSquares] = useState(Array(9).fill(''))
        function calculateWinner(squares: string[]) {
            const lines = [
              [0, 1, 2],
              [3, 4, 5],
              [6, 7, 8],
              [0, 3, 6],
              [1, 4, 7],
              [2, 5, 8],
              [0, 4, 8],
              [2, 4, 6]
            ];
            for (let i = 0; i < lines.length; i++) {
              const [a, b, c] = lines[i];
              if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
              }
            }
            return null;
          }
        const handleClick = (i: number) => {
            const netSquares = squares.slice()
            netSquares[i] = i % 2 === 0? 'O':'X'
            setSquares(netSquares)
            if(calculateWinner(netSquares)){
                alert(calculateWinner(netSquares) + ' win!')
                return
            }
        }
        return (
            <>
            <div className='square-row'>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}></Square>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}></Square>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}></Square>
            </div>
            <div className='square-row'>
            <Square value={squares[3]} onSquareClick={() => handleClick(3)}></Square>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}></Square>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}></Square>
            </div>
            <div className='square-row'>
            <Square value={squares[6]} onSquareClick={() => handleClick(6)}></Square>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}></Square>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}></Square>
            </div>
            </>
        )
    }
    return (
    <div>
        <Board></Board>
    </div>
    );
  }
}
