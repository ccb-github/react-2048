import React from "react"

export const GameBoard = React.createContext([
  [-1, -1, -1, -1],
  [-1, -1, -1, -1],
  [-1, -1, -1, -1],
  [-1, -1, -1, -1],
])

export const GameStatus = React.createContext({
  move: 0,
  gameTime: 0,
})
