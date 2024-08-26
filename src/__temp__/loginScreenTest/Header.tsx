import type React from "react"
import { View, StyleSheet } from "react-native"

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftSpace} />
        <View style={styles.centerSpace} />
        <View style={styles.rightContainer}>
          <View style={styles.icon} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    width: "100%",
    backgroundColor: "#FFF",
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  leftSpace: {
    width: 102,
    height: 48,
  },
  centerSpace: {
    flex: 1,
    height: 48,
    width: 171,
  },
  rightContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    alignSelf: "stretch",
    paddingHorizontal: 8,
    paddingVertical: 8,
    minHeight: 48,
    width: 102,
  },
  icon: {
    alignSelf: "stretch",
    aspectRatio: 1,
    width: 34,
  },
})

export default Header
