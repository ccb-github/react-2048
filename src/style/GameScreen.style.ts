import { StyleSheet, Dimensions } from "react-native"

const styles = StyleSheet.create({
  centerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gameBoard: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#faf8ef",
    borderColor: "red",
  },
  footBox: {
    width: "100%",
    flexGrow: 1,
  },
})

export default styles
