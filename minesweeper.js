import Coord from "./coord";

class Minesweeper{
  constructor(gridSize){
    this.columns = gridSize.columns
    this.rows = gridSize.rows
  }

  static createGame(gridSize, mines = []) {
    const newGame = new Minesweeper(gridSize)
    newGame.prepareBoard(mines)
    return newGame
  }

  prepareBoard(mines = []) {
    this.grid = this.generateEmptyGrid(this.columns, this.rows)

    mines.forEach(coord => {
      // Put mines
      this.grid[coord.row][coord.column] = '*'

      // Calculate numbers
      this.calculateNeighbours(coord, this.grid)
    })
  }

  exposedGrid() {
    if (this.columns === 0 || this.rows === 0){
      return ""
    }

    // Convert grid to string
    let gridStr = ''
    this.grid.forEach(rowCells => {
      rowCells.forEach( cell => {
        if (cell === 0){
          gridStr += '.'
        } else {
          gridStr += cell
        }
      })
      gridStr += "\n"
    })
    return gridStr
  }

  calculateNeighbours(coord, grid) {
    this.getNeighboursFor(coord).forEach(coord=> {
      if (Number.isInteger(grid[coord.row][coord.column])) {
        grid[coord.row][coord.column] += 1
      }
    })
  }

  getNeighboursFor(coord) {
    let neighbours = [
      new Coord(coord.column-1, coord.row-1), new Coord(coord.column, coord.row-1), new Coord(coord.column+1, coord.row-1),
      new Coord(coord.column-1, coord.row),                                         new Coord(coord.column+1, coord.row),
      new Coord(coord.column-1, coord.row+1), new Coord(coord.column, coord.row+1), new Coord(coord.column+1, coord.row+1),
    ]

    return neighbours.filter( neighbour => {
      return (neighbour.row >= 0 &&
        neighbour.column >= 0 &&
        neighbour.row < this.rows &&
        neighbour.column < this.columns
      )
    })
  }

  generateEmptyGrid(columns, rows) {
    let grid = []

    for(let i=0; i<rows; i++) {
      grid[i] = []
      for(let j=0; j<columns; j++) {
        grid[i][j] = 0
      }
    }

    return grid
  }
}

export default Minesweeper