import { StyleSheet } from "react-native"
import Dimensions from "../utils/dimension"
const { width: vw, scale } = Dimensions

const styles = StyleSheet.create({
  gameBoxContainer: {
    width: vw,
    height: vw,

    flexGrow: 0,
    flexBasis: "auto",
    alignItems: "center",
    backgroundColor: "#bbada0",
    borderRadius: 5,
  },

  gameBox: {
    width: vw - 40,
    height: vw - 40,
    alignItems: "center",
    backgroundColor: "#bbada0",
    borderRadius: 5,
    position: "relative",
  },

  gameBoxRow: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    borderColor: "yellow",
    borderStyle: "solid",
    borderTopWidth: 2 * scale,
    borderBottomWidth: 2 * scale,
  },
  gameBoxCell: {
    flex: 1,
    height: "100%",
    borderColor: "yellow",
    borderStyle: "solid",
    borderWidth: 2 * scale,
  },

  gameBoxRowFirst: { borderTopWidth: 4 * scale },
  gameBoxRowLast: { borderBottomWidth: 4 * scale },

  gameBoxCellFirst: { borderTopWidth: 4 * scale },
  gameBoxCellLast: { borderBottomWidth: 4 * scale },

  tileContainer: {
    width: "100%",
    height: "100%",
  },
})

export default styles
