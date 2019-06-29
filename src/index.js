import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//player 1 X
//player 2 O


class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
        }
    }

    setter = () => {
        if(this.state.value !== null){
            return;
        }
        if(!this.props.turn){
            this.setState({value: 'X'});
        }
        else{
            this.setState({value: 'O'});
        }
        this.props.toggleTurn(this.props.row, this.props.col)
    }

    render() {
        console.log('rendering this.props.index: ', this.props.row, ',', this.props.col);
        return (
            <button
                className="square"
                onClick={this.setter}>
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            turn: false,
            status: 'turn X',
            board: [
                [null,null,null],
                [null,null,null],
                [null,null,null]
            ]
        }
    }

    toggleTurn = (i,j) => {
        console.log('in toggle turn i => ', i, ' j => ', j);
        //change the board state here for the entire board
        //call the compute method call after changing the entire state
        let updateBoard = this.state.board;
        console.log('updateBoard: ', updateBoard);
        updateBoard[i][j] = 'O';
        let status = 'turn X';

        if(!this.state.turn){
            status = 'turn O';
            updateBoard[i][j] = 'X';
        }
        this.setState({ turn: !this.state.turn, status: status, board: updateBoard});
    }

    compute = () => {

    }

    renderSquare(i,j) {

        return <Square row={i} col={j} turn={this.state.turn} toggleTurn={this.toggleTurn}/>;
    }

    render() {
        //const status = 'Next player: X';
        console.log('rendering board! ');
        return (
            <div>
                <div className="status">{this.state.status}</div>
                <div className="board-row">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(0, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(2, 0)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
