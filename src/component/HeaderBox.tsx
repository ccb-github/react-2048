import React, { useContext, useEffect, useState } from "react";
import { View, Text, useWindowDimensions, Alert } from "react-native";
import { Button } from "react-native-paper";
import { divStyles } from "../style/common.style";
import Dimension from "../utils/dimension";
import ConfirmDialog from "./ConfirmDialog";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const { getWidth } = Dimension;

type HeaderBoxProps = {
  /**@deprecated */
  callDialog?: (actionName: string) => any;
  restartGame: () => boolean | void;
  saveGame: () => unknown
  undo: () => boolean | void;
};

const dialogTitle = {
  restartGame: "Are you sure you want to restart the game",
  saveGame: "Save the game to local storage( with)",
  undo: "Undo",
};

const HeaderBox = (props: HeaderBoxProps) => {
  const { restartGame, undo, saveGame } = props;
  const { scale } = useWindowDimensions()
  const [dialogState, setDialogState] = useState<
    null | "undo" | "restartGame" | "saveGame"
  >(null);
 
  const randomWidth = useSharedValue(300);

  useEffect( () => {
    console.log(randomWidth.value)
  }, [randomWidth.value])
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  const handlePress = () => {
    randomWidth.value = Math.random() * 350;
  };
  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  const dialogActionWrapper = () => {
    switch (dialogState) {
      case "restartGame":
        return () => {
          restartGame();
          setDialogState(null);
        };
      case "undo":
        return () => {
          undo();
          setDialogState(null);
        };
      case "saveGame":
        return () => {
          saveGame()
          setDialogState(null)
        }
      default:
        throw new Error("You should pass right dialogState to the wrapper");
    }
  };
  return (
    <Animated.View
      style={[
        divStyles.rowDiv,
        {
          flexShrink: 1,
        },
        style,
      ]}
    >
      {dialogState ? (
        <ConfirmDialog
          content={dialogTitle[dialogState]}
          dialogAction={dialogActionWrapper()}
        />
      ) : null}
      <View
        style={[
          divStyles.buttonBox,
          divStyles.colDiv,
          {
            width: "100%",
            // height: "unset",
            justifyContent: "flex-end",
          },
        ]}
      >
        <Text
          style={{
            flex: 1,
            margin: "auto",
            textAlign: "center",
            alignContent: "center",
            fontSize: 15 * scale,
            fontWeight: "bold",
            textAlignVertical: "top",
          }}
        >
          2048
        </Text>
        <View style={{ flex: 1, height: "100%" }}>
          {/* TODO should we scale the small size */}
          <Button
            style={{
              //margin: getWidth(10),
              //minHeight: getWidth(20)
            }}
            onPress={() => {
              setDialogState("saveGame")
            }}
            mode="contained"
          >
            Save Game
          </Button>
        </View>
      </View>
      {/* Row two */}
      <View style={[divStyles.buttonBox, divStyles.colDiv, { width: "100%" }]}>
        <View style={{ flex: 1, height: "100%" }}>
          <Button
            style={{
              margin: getWidth(10),
              // minHeight: getWidth(20),
            }}
            mode="contained"
            onPress={() => {
              setDialogState("undo");
            }}
          >
            Undo
          </Button>
        </View>
        <View style={{ flex: 1, height: "100%" }}>
          <Button
            style={{ margin: getWidth(10) }}
            mode="contained"
            onPress={() => {
              setDialogState("restartGame");
            }}
          >
            Restart
          </Button>
        </View>
      </View>
    </Animated.View>
  );
};

export default HeaderBox;

/*
class HeaderBox = ({
  let [point, setPoint] = useState(0)
 
  return (
    <View style={divStyles.headerBox}>
      <View style={divStyles.scoreBox}>
        <Text style={[divStyles.scoreLabel, divStyles.bold,{color:'black'}]}>Point</Text>
        <Text style={[divStyles.scoreContent, divStyles.bold,{color:'black'}]}>{point}</Text>
      </View>
      <View style={divStyles.gameButton}>
        <Button  onPress={props.saveGame}  mode="contained" >
          Save Game
        </Button>
        <Button   mode="contained" onPress={props.testFunc}>
          Restart Game 
        </Button>
      </View>
    </View>
  )
}
*/
