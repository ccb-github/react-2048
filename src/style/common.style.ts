import { StyleSheet } from "react-native"

const textStyles = StyleSheet.create({
  colorText: {
    color: "#776e65",
  },
  title: {
    width: "46%",
    fontSize: 72,
  },
  descText: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  newGameBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  scoreLabel: {
    textAlign: "center",
    color: "#faf8ef",
    fontSize: 30,
  },
  scoreContent: {
    textAlign: "center",
    fontSize: 27,
    color: "white",
  },
  additionScore: {
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: 26,
    color: "#776e65",
    position: "absolute",
  },
})

const divStyles = StyleSheet.create({
  headerBox: {},
  buttonBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  scoreBox: {
    flex: 1,
    margin: 3,
    paddingTop: 10,
    paddingBottom: 5,
    borderRadius: 2,
  },
  rowDiv: {
    flex: 1,
    flexDirection: "column",
  },
  colDiv: {
    flex: 1,
    flexDirection: "row",
  },
})

export { divStyles, textStyles }
// Note export default
