import AsyncStorage from "@react-native-async-storage/async-storage"

const GAME_STORAGE_PREFIX = "REACT-2048"

export async function saveData(
  key: string,
  value: string | Record<string, string>,
) {
  AsyncStorage.setItem(
    key,
    typeof value === "object" ? (value = JSON.stringify(value)) : value,
  ).catch((error) => {
    throw error
  })
}

export async function loadData(key: string) {
  const setResult = await AsyncStorage.getItem(key)
  return setResult
}
