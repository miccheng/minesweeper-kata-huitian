import Minesweeper from './minesweeper'
import Coord from './coord'

test('0, 0 will return empty response', async () => {
  const gridSize = {
    columns: 0,
    rows: 0
  }
  const minesweeper = await Minesweeper.createGame(gridSize)

  expect(minesweeper.exposedGrid()).toEqual('')
})

test('3, 2 will return grid of .s', async () => {
  const gridSize = {
    columns: 3,
    rows: 2
  }
  const minesweeper = await Minesweeper.createGame(gridSize)

  expect(minesweeper.exposedGrid()).toEqual("...\n...\n")
})

test('3, 2 with 1 mine will return grid with mines', async () => {
  const gridSize = {
    columns: 3,
    rows: 2
  }
  const mines = [
    new Coord(1, 0)
  ]
  const minesweeper = await Minesweeper.createGame(gridSize, mines)

  expect(minesweeper.exposedGrid()).toEqual("1*1\n111\n")
})

test('5, 3 with 3 mines will return grid with mines', async () => {
  const gridSize = {
    columns: 5,
    rows: 3
  }
  const mines = [
    new Coord(0, 0),
    new Coord(1, 0),
    new Coord(1, 2)
  ]
  const minesweeper = await Minesweeper.createGame(gridSize, mines)

  expect(minesweeper.exposedGrid()).toEqual("**1..\n332..\n1*1..\n")
})