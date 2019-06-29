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
        if(this.props.value !== null){
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
        return (
            <button
                className="square"
                onClick={this.setter}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {

    displayWinner = () => {
        let winner;
        if(this.state.turn){
            winner = "Player 1";
        }
        else{
            winner = "Player2";
        }
        alert(winner + " wins!");
    }

    getInitialState = () => {
        const initialState = {
            turn: false,
            status: 'turn X',
            board: [
                [null,null,null],
                [null,null,null],
                [null,null,null]
            ]
        };
        return initialState;
    }

    constructor(props){
        super(props);
        this.state = this.getInitialState()
    }

    resetState = () => {
        this.setState(this.getInitialState())
    }

    toggleTurn = (i,j) => {
        //change the board state here for the entire board
        //call the compute method call after changing the entire state
        let updateBoard = this.state.board;
        updateBoard[i][j] = 'O';
        let status = 'turn X';

        if(!this.state.turn){
            status = 'turn O';
            updateBoard[i][j] = 'X';
        }
        this.setState({ turn: !this.state.turn, status: status, board: updateBoard}, this.computeRow);
    }

    computeRow = () => {
        //check row
        let matchCounter;
        for(let i = 0; i < 3; i++){
            let firstValue = this.state.board[i][0];
            matchCounter = 0;
            if(firstValue === null){
                continue;
            }
            for(let j = 0; j < 3; j++){
                if(this.state.board[i][j] !== firstValue){
                    break;
                }
                matchCounter++;
            }
            if(matchCounter > 2){
                this.displayWinner();
                this.resetState();
                return;
            }
        }
        this.computeColumn();
    }

    computeColumn = () => {
        let matchCounter;
        for(let j = 0; j < 3; j++){
            let firstValue = this.state.board[0][j];
            matchCounter = 0;

            if(firstValue === null){
                continue;
            }

            for(let i = 0; i < 3; i++){
                if(this.state.board[i][j] !== firstValue){
                    break;
                }
                matchCounter++;
            }
            if(matchCounter > 2){
                this.displayWinner();
                this.resetState();
                return;
            }

        }
        this.computeDiagonal();
    }

    computeDiagonal = () => {
        let matchCounter = 0;
        //top left to bottom right
        for(let i = 0; i < 3; i++){
            let firstValue = this.state.board[0][0];
            if(firstValue === null){
                break;
            }
            if(this.state.board[i][i] !== firstValue){
                break;
            }
            matchCounter++;
        }
        if(matchCounter > 2){
            this.displayWinner();
            this.resetState();
            return;
        }
        //compute second diagonal if first diagonal is not win
        matchCounter = 0;
        let j = 2;
        for(let i = 0; i < 3; i++){
            let firstValue = this.state.board[0][2];
            if(firstValue === null){
                return;
            }
            if(this.state.board[i][j] !== firstValue){
                return;
            }
            matchCounter++;
            j--;
        }
        if(matchCounter > 2){
            this.displayWinner();
            this.resetState();
        }
    }

    renderSquare(i,j) {

        return <Square row={i} col={j} value = {this.state.board[i][j]} turn={this.state.turn} toggleTurn={this.toggleTurn}/>;
    }

    render() {
        console.log('rendering board! state => ', this.state);
        //const status = 'Next player: X';
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
