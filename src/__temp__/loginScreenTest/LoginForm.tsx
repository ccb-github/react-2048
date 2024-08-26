import type React from "react"
import { useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email input"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessibilityLabel="Password input"
        />
      </View>
      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsText}>
          Upper and lowercase letters{"\n"}
          More than 8 characters{"\n"}
          Contains a number or symbol
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginTop: 36,
    width: "100%",
  },
  inputContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
    width: "100%",
  },
  input: {
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 14,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    fontSize: 16,
  },
  requirementsContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    width: "100%",
  },
  requirementsText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },
})

export default LoginForm
