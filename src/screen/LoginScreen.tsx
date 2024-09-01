import type React from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native"
import Header from "../__temp__/loginScreenTest/Header"
import LoginForm from "../__temp__/loginScreenTest/LoginForm"
import SocialLoginButtons from "../__temp__/loginScreenTest/SocialLoginButton"
// import JoinButton from '../component/JoinButton';
// import LoginLink from '../component/LoginLink';

const LoginScreen: React.FC = () => {
  const { height } = useWindowDimensions()
  return (
    <ScrollView style={[styles.container, {}]}>
      <View style={{ maxHeight: height }}>
        <Header />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>APP NAME</Text>
          <Text style={styles.subtitle}>
            Log in to save your favorites so we can better personalize your
            recommendations.
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <SocialLoginButtons />
          <Text style={styles.orText}>or</Text>
          <LoginForm />
          {/* <JoinButton /> */}
        </View>
        {/* <LoginLink /> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    maxWidth: 480,
    alignSelf: "center",
  },
  titleContainer: {
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 20,
    color: "#666",
    textAlign: "center",
  },
  contentContainer: {
    justifyContent: "space-between",
    marginTop: 16,
    minHeight: 470,
  },
  orText: {
    padding: 10,
    marginTop: 36,
    width: "100%",
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
})

export default LoginScreen
