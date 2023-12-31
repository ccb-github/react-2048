
import React, { createRef, useContext } from "react";
import { Alert, View } from "react-native";
import { Dialog } from "react-native-paper";
import uuid from "react-uuid";
import FootBox from "../src/component/FootBox";
import HeaderBox from "../src/component/HeaderBox";
import Tile from "../src/component/Tile";
import { GameBoard } from "../src/context";
import styles from '../src/style/GameScreen.style'
import createResponder from "../src/utils/panRes";
import { saveData } from '../src/utils/storage'
import ConfirmDialog from "../src/component/ConfirmDialog";

const DialogTitle = {
	"restartGame": "Are you sure you want to restart the game",
	"saveGame": "Save the game to local storage( with)",
	
}

const bfsGrid = (target: number[][]) => {
	const sign = target.map(row=>row.map(col => false))
	for(let i = 0; i<target.length-1; i++){
	  for(let j = 0; j< target[0].length-1; j++){
		if (target[i][j] && target[i + 1][j] &&
		  target[i][j] == target[i + 1][j] ||
		  target[i][j] && target[i][j + 1] &&
		  target[i][j] == target[i][j + 1]) {
		  return true
		} 
	  }
	}
	return false 
}
  

export default class GameScreen extends React.Component<{ route : {params?: string}}, {
	history: string[],
	point: number,
	dialogState: false | "restartGame" | "saveGame" 
}>{
	
	record = [];
	squareRef: (Tile | null) [][];
	squareMatrix: number[][];
	point : React.RefObject<number>
	move: React.RefObject<number>;
	gameTime: React.RefObject<number>;

	constructor(props) {
	  super(props);
	  
	  const loadedGameState = JSON.parse(props.route.params)
			this.state = {
			history: [],
			point: 0,
			dialogState: false
	  };
	  
	  if(loadedGameState)
	  this.move = React.createRef();
	  this.gameTime = React.createRef();
	  this.point = React.createRef();
	  this.squareRef = []
	  this.squareMatrix = []
	  for (let y = 0; y <= 3; y++) {
		let row = new Array();
		let refRow = new Array();
		for (let x = 0; x <= 3; x++) {
		  row.push(-1);
		  refRow.push(null);
		}
		this.squareMatrix.push(row);
		this.squareRef.push(refRow);
	  }
		this.move = createRef()
	  const value = Math.random() < 0.9 ? 2 : 4;
      let ri = Math.floor(Math.random() * 4),
          ci = Math.floor(Math.random() * 4);
	  //If the corresponding cell already exists, regenerate the value
      while (this.squareMatrix[ri][ci] > 0) {
        ri = Math.floor(Math.random() * 4);
        ci = Math.floor(Math.random() * 4);
      }
      this.squareMatrix[ri][ci] = value;
	}
  
	addRandomTile() {
	  var value = Math.random() < 0.9 ? 2 : 4;
	  let ri = Math.floor(Math.random() * 4),
		ci = Math.floor(Math.random() * 4);
	  while (this.squareMatrix[ri][ci] > 0) {
		ri = Math.floor(Math.random() * 4);
		ci = Math.floor(Math.random() * 4);
	  }
  
	  this.squareMatrix[ri][ci] = value;
	  this.squareRef[ri][ci]?.setState({ value: value });
	}
	restartGame() {
	  for (let row of this.squareMatrix) {
		for (let col of row) col = -1;
	  }
	  this.point.current = 0;
	  this.setState({ dialogState: false });
	  this.gameTime.current = 0
	  this.move.current = 0
	  this.setState({ dialogState: "saveGame" });
	}
  
	haveEmptySpace() {
	  for (let row of this.squareMatrix) {
		for (let col of row) {
		  if (col === -1) return true;
		}
	  }
	  return false;
	}
  
	saveGame() {
	  saveData(new Date().getTime().toString(), this.squareMatrix.toString());
	  this.setState({ dialogState: "saveGame" });
	}
  
	moveAvailable() {
	  if (this.haveEmptySpace()) return true;
	  return bfsGrid(this.squareMatrix);
	}
  
	callDialog(newState) {
	  this.setState({ dialogState: newState });
	}
  
	moveFrame(dirSign: number[]) {
	  console.log(this);
	  const theGameBoxSize = this.squareMatrix.length
	  let squareStack = [[], [], [], []];
	  if (JSON.stringify(dirSign) === "[-1,0]") {
      for (let ri = 0; ri < theGameBoxSize; ri++) {
        for (let ci = 0; ci < theGameBoxSize; ci++) {
          if (
            squareStack[ri].length &&
            this.squareMatrix[ci][ri] > 0 &&
            this.squareMatrix[ci][ri] === squareStack[ri].slice(-1)[0]
          )
            squareStack[ri][squareStack[ri].length - 1] =
              squareStack[ri][squareStack[ri].length - 1] * 2;
          else if (this.squareMatrix[ci][ri] > 0)
            squareStack[ri].push(this.squareMatrix[ci][ri]);
        }
      }
    } else if (JSON.stringify(dirSign) === "[1,0]") {
      for (let ri = 0; ri < theGameBoxSize; ri++) {
        for (let ci = 0; ci < theGameBoxSize; ci++) {
          if (
            squareStack[ri].length &&
            this.squareMatrix[3 - ci][ri] > 0 &&
            this.squareMatrix[3 - ci][ri] === squareStack[ri].slice(-1)[0]
          )
            squareStack[ri][squareStack[ri].length - 1] =
              squareStack[ri][squareStack[ri].length - 1] * 2;
          else if (this.squareMatrix[3 - ci][ri] > 0)
            squareStack[ri].push(this.squareMatrix[3 - ci][ri]);
        }
      }
    } else if (JSON.stringify(dirSign) === "[0,-1]") {
      for (let ri = 0; ri < theGameBoxSize; ri++) {
        for (let ci = 0; ci < theGameBoxSize; ci++) {
          if (
            squareStack[ri].length &&
            this.squareMatrix[ri][ci] > 0 &&
            this.squareMatrix[ri][ci] === squareStack[ri].slice(-1)[0]
          )
            squareStack[ri][squareStack[ri].length - 1] =
              squareStack[ri][squareStack[ri].length - 1] * 2;
          else if (this.squareMatrix[ri][ci] > 0)
            squareStack[ri].push(this.squareMatrix[ri][ci]);
        }
      }
    } else {
      for (let ri = 0; ri < theGameBoxSize; ri++) {
        for (let ci = 0; ci < theGameBoxSize; ci++) {
          if (
            squareStack[ri].length &&
            this.squareMatrix[ri][3 - ci] > 0 &&
            this.squareMatrix[ri][3 - ci] === squareStack[ri].slice(-1)[0]
          )
            squareStack[ri][squareStack[ri].length - 1] =
              squareStack[ri][squareStack[ri].length - 1] * 2;
          else if (this.squareMatrix[ri][3 - ci] > 0)
            squareStack[ri].push(this.squareMatrix[ri][3 - ci]);
        }
      }
    }
	  //Rotate the matrix back
	  //The logic is not right
	  this.squareMatrix = [
			[-1, -1, -1, -1],
			[-1, -1, -1, -1],
			[-1, -1, -1, -1],
			[-1, -1, -1, -1],
	  ];
	  // Please notice the object
	  squareStack.map((row, i) => {
			row.map((col, j) => {
				if (dirSign[0] != 0) {
					this.squareMatrix[dirSign[0] < 0 ? j : 3 - j][i] = col;
				} else {
					this.squareMatrix[i][dirSign[1] < 0 ? j : 3 - j] = col;
				}
			});
	  });
	  for (let i = 0; i < this.squareMatrix.length; i++) {
			for (let j = 0; j < this.squareMatrix[0].length; j++) {
				this.squareRef[i][j].setState({ value: this.squareMatrix[i][j] });
			}
	  }
	  this.move.current++;
	  // if (this.haveEmptySpace()) {
		//   this.addRandomTile();
	  // }
	}
  
	render() {
		return (
      <GameBoard.Provider
        value={[
          [-1, -1, -1, -1],
          [-1, -1, -1, -1],
          [-1, -1, -1, -1],
          [-1, -1, -1, -1],
        ]}
      >
        <View style={styles.gameBoard}>
          {this.state.dialogState ? (
            <ConfirmDialog
              content={DialogTitle}
              dialogAction={this[this.state.dialogState].bind(this)}
            />
          ) : null}

          <HeaderBox callDialog={this.callDialog.bind(this)} />

          <View
            style={styles.gameBox}
            {...createResponder({
              releaseCallback: this.moveFrame.bind(this),
            }).panHandlers}
          >
            {this.squareMatrix.map((row, i) => (
              <View
                style={[
                  styles.gameBoxRow,
                  // i == 0 ? styles.gameBoxRowFirst : null,
                  // i == this.squareMatrix.length - 1
                  //   ? styles.gameBoxRowLast
                  //   : null,
                ]}
                key={uuid()}
              >
                {row.map((col, j) => (
                  <View key={uuid()} style={styles.gameBoxCell}>
                    {col !== null && (
                      <Tile
                        style={styles.tileContainer}
                        point={[i, j]}
                        ref={(ref) => (this.squareRef[i][j] = ref)}
                      />
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>

          <FootBox
            moveTime={this.move.current}
            gameTime={this.move.current}
            style={{ width: "100%" }}
          />
        </View>
      </GameBoard.Provider>
    );
	  
  
	
	}
  } 