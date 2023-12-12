import React from 'react';
import Square from './Square';
import './static/style/main.css';

class App extends React.Component {
  currentPlayer = "X";
  grid = [['','',''],['','',''],['','','']];

  constructor(props) {
    super(props);

    this.state = {
      grid: [['','',''],['','',''],['','','']],
      currentPlayer: "X",
      win: "",
      tie: false
    }

    this.updateGrid = this.updateGrid.bind(this);
    this.reset = this.reset.bind(this);
  }

  render() {
    let status = "Next Player: " + this.state.currentPlayer;

    if(this.state.win === "" && this.state.tie === false) {
      status = "Next player: " + this.state.currentPlayer;
    } else if (this.state.win === "" && this.state.tie === true) {
      status = "Tie"
    } else {
      status = "Winner: " + this.state.win;
    }

    return (
      <>
        <div id="article">
          <div className="status">
            {status}
          </div>
          { this.renderGrid() }
          <button className="reset" onClick={this.reset}> reset </button>
        </div>
      </>
    )
  }

  reset() {
    console.log(this.grid);
    this.setState({
      ...this.state,
      grid: [['','',''],['','',''],['','','']]
    })
  }

  checkValues(args: []) {
    var len = args.length;
    for (var i = 1; i< len; i++){
      if (args[i] === null || args[i] !== args[i-1] || args[i] === "")
         return false;
    }
    return true;
  }

  checkTie() {
    let grid = this.state.grid;
    let tie = true;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] === "") {
          tie = false;
        }
      }
    }
    return tie;
  }

  checkWin() {
    let grid = this.state.grid;
    let win = "";
    for (let i = 0; i < grid.length; i++) {
      if (this.checkValues([grid[i][0], grid[i][1], grid[i][2]])) {
        win = grid[i][0];
      } if (this.checkValues([grid[0][i], grid[1][i], grid[2][i]])) {
        win = grid[0][i];
      }
    }
    // Diagonal checks
    if (this.checkValues([grid[0][0], grid[1][1], grid[2][2]])) {
      win = grid[0][0];
    }

    if (this.checkValues([grid[0][2], grid[1][1], grid[2][0]])) {
      win = grid[0][2];
    }

    console.log(win, "win")
    return win;
  }

  updateGrid(x, y) {
    let newGrid = this.state.grid;
    newGrid[x][y] = this.state.currentPlayer;

    let currentPlayer = "";
    if (this.state.currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }

    let win = this.checkWin();
    let tie = this.checkTie();

    this.setState({
      ...this.state,
      grid: newGrid,
      currentPlayer: currentPlayer, 
      win: win,
      tie: tie
    })
  }

  renderGrid() {
    let content = this.state.grid.map((element, i) => {
      return (
        <div>
          {element.map((cell, j) => { return <Square content={this.state.grid[i][j]} onClick={this.state.win ? () => {}: this.updateGrid} pos={[i, j]}/>})}
        </div>
      );
    });

    return <div class="grid">{content}</div>;
  }
}
export default App