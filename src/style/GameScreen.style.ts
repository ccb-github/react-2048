import { StyleSheet, Dimensions } from 'react-native';

let { width: vw, height: vh} = Dimensions.get('window');

console.log(vw,vh)

let scale = vw / 490;
console.log(scale)
const styles = StyleSheet.create({
  gameBoard: {
    height: vh - 90, 
    width: vw - 2,
    flexDirection: "column",
    alignItems: 'center',
    backgroundColor: '#faf8ef',  
    borderColor: "red",
    borderWidth: 1,
  },
  gameBoxContainer: {
    width: vw ,
    height: vw ,
    flexGrow: 0 ,
    flexBasis: 'auto',
    alignItems: 'center',
    backgroundColor: '#bbada0',
    //borderRadius: 5,
    
  },
 
  gameBoxRow:{
    width: '100%',
    flex: 1,
    flexDirection:'row',
    borderColor: 'yellow',
    borderStyle: 'solid',
    borderTopWidth: 2 * scale, 
    borderBottomWidth: 2 * scale
  },
  gameBoxCell:{
    flex: 1,
    height:'100%',
    borderColor: 'yellow',
    borderStyle: 'solid',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 2 * scale
  },

  

  gameBoxRowFirst: {borderTopWidth: 4 * scale},
  gameBoxRowLast: {borderBottomWidth: 4 * scale},
  
  gameBoxCellFirst: {borderTopWidth: 4 * scale},
  gameBoxCellLast: {borderBottomWidth: 4 * scale},


  gameFoot:{
    
  },

  tileContainer:{
    width:'100%',
    height:'100%'
  }
  
  
 
 

});


export default styles;
