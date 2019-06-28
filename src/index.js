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

    setter = () =>{
        if(this.state.value !== null){
            return;
        }
        if(!this.props.turn){
            this.setState({value: 'X'});
        }
        else{
            this.setState({value: 'O'});
        }
        this.props.toggleTurn(this.props.index)
    }

    render() {
        console.log('rendering this.props.index: ', this.props.index, ' value: ', this.props.value);
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
            status: 'turn X'
        }
    }

    toggleTurn = (index) => {
        console.log('in toggle turn!');
        let status = 'turn X';
        if(!this.state.turn){
            status = 'turn O';
        }
        this.setState({ turn: !this.state.turn, status: status});
    }


    renderSquare(i) {

        return <Square index={i} turn={this.state.turn} toggleTurn={this.toggleTurn}/>;
    }

    render() {
        //const status = 'Next player: X';
        console.log('rendering board! ');
        return (
            <div>
                <div className="status">{this.state.status}</div>
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
