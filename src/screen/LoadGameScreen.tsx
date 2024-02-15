import { useEffect, useState } from "react"
import { View, Text, useWindowDimensions } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Button } from "react-native-paper"
import { StackRouteName } from "../model/navigation"
import { LoadGameScreenProps } from "../navigation"

export default function LoadGameScreen({navigation}: LoadGameScreenProps) {
	const [gameRecordList, setGameRecordList] = useState<readonly string []>([])
  const { scale } = useWindowDimensions()
  
	useEffect(() => {
	  AsyncStorage.getAllKeys()
      .then((keys) => {
        console.log("All storage keys",keys)
        setGameRecordList(keys)})
      .catch((error) => console.error(error));
	}, [])

  const loadGame = (storageKey: string) => {
    AsyncStorage.getItem(storageKey)
      .then((item) => {
        navigation.navigate(StackRouteName["main"], {
          loadedGameData: JSON.parse(item ?? "null")
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const EmptyRecordList = () => (
    <Text
      style={{
        fontWeight: "700",
        fontSize: 10 * scale,
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor:"blue",
        height: 200,
      }}
    >
      No record found in storage
    </Text>
  ); 
	return (
    <View style={{
      flexDirection: "column",
      backgroundColor: "red",
      height: "100%"
    }}>
      {gameRecordList.length !== 0 ? (
        gameRecordList.map((gameRecord, index) => (
          <Button
            mode="outlined"
            key={index}
            onPress={() => {
              loadGame(gameRecord);
            }}
          >
            {gameRecord}
          </Button>
        ))
      ) : (
        <EmptyRecordList />
      )}
    </View>
  );
}