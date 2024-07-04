import AsyncStorage from '@react-native-async-storage/async-storage';

const GAME_STORAGE_PREFIX = "REACT-2048"

const saveData = async (key: string, value: string | {[key: string]: string}) => {
  typeof value === 'object' ? value = JSON.stringify(value): '' 
  AsyncStorage.setItem(key, value)
  
}

const loadData = async (key: string) => {
  AsyncStorage.getItem(key, (error, result) => {
    console.log(result)
  })
}

export { 
  saveData,
  loadData
}

