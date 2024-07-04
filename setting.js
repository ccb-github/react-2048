import { Switch } from 'react-native-paper'



const SettingPage = ({setting}) => {
  setting = JSON.parse(setting)
  return(
    <View>
      {
        Object.keys(setting).map(
            
        )  
      }
    </View>
  ) 
}