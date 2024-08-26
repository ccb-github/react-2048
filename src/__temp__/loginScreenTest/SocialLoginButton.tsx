import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

type SocialButtonProps = {
  icon: React.ReactNode
  text: string
  onPress: () => void
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={styles.iconContainer}>{icon}</View>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
)

const SocialLoginButtons: React.FC = () => {
  return (
    <View style={styles.container}>
      <SocialButton
        icon={<View style={styles.googleIcon} />}
        text="Google"
        onPress={() => {
          console.log("Google login")
        }}
      />
      <SocialButton
        icon={<View style={styles.facebookIcon} />}
        text="Facebook"
        onPress={() => {
          console.log("Facebook login")
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#EEE",
  },
  iconContainer: {
    overflow: "hidden",
    gap: 10,
    alignItems: "flex-start",
    alignSelf: "stretch",
    padding: 6,
    width: 24,
    minHeight: 24,
  },
  buttonText: {
    alignSelf: "stretch",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  googleIcon: {
    width: 14,
    aspectRatio: 0.93,
    backgroundColor: "#333",
  },
  facebookIcon: {
    width: 16,
    aspectRatio: 1,
    backgroundColor: "#333",
  },
})

export default SocialLoginButtons
