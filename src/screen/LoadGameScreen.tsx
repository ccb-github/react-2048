import { useEffect, useState } from "react"
import { View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Button } from "react-native-paper"
import { StackRouteName } from "../model/navigation"
export default function LoadGameScreen({navigation}) {
	const [gameRecordList, setGameRecordList] = useState<string []>([])
  
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
	return (
    <View>
      {gameRecordList.map((gameRecord, index) => (
        <Button mode="outlined" key={index} onPress={() => {loadGame(gameRecord)}}>
          {gameRecord}
        </Button>
      ))}
    </View>
  );
}