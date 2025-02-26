import { View, Text, StyleSheet, Platform, Dimensions, StatusBar, Image, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import colors from '../config/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from 'react'
import { UserContext } from "../Contexts/userContext";
import { useContext } from "react";
import Loading from '../Components/Loading';
import { ActivityIndicator } from 'react-native';

function SignIn({ navigation: navigate }) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [showPassword, setShowPassword] = useState(false) // New state variable
  const { user, setUser } = useContext(UserContext)

  function handleLogin(email, password) {
    setIsLoading(true)
    if (!email || !password) {
      Alert.alert(
        "Error !",
        "Please fill in all fields",
        [
          {
            text: "OK",
            onPress: () => {
              navigate.navigate("SignIn")
              setIsLoading(false)
            },
          },
        ],
        { cancelable: false }
      );
      return
    }

    fetch(`https://mobileimsbackend.onrender.com/user/${email}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {

        if (data.message) {
          setIsLoading(false)
          setEmailError(true)
        }
        else {
          if (data.user.password !== undefined && data.user.password == password) {
            setUser(data.user)
            setIsLoading(false)
            navigate.navigate("Home")

          }
          else {
            setIsLoading(false),
              Alert.alert(

                "Error !",
                "Invalid password!",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      navigate.navigate("SignIn")
                    },
                  },
                ],
                { cancelable: false }
              );
          }
        }
      })
  }
  useEffect(() => {
    if (emailError) {
      setIsLoading(false),
        Alert.alert(
          "Error !",
          "Invalid email address!",
          [
            {
              text: "OK",
              onPress: () => {
                navigate.navigate("SignIn")
                setEmailError(false)
              },
            },
          ],
          { cancelable: false }
        );

    }
  }, [emailError])

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.logo} source={require('../assets/darkLogo.png')} />
        <Text style={styles.welcomeText}>Welcome to Moringa School IMS ! </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 20, gap: 20, backgroundColor: colors.darkerShadeOfWhite }}>
          <Text style={{
            width: '100%',
            fontSize: 21,
            fontWeight: 'bold',
            color: colors.blue,
            textAlign: 'center',
            marginBottom: 10,

          }}>Sign in to your account</Text>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder='john doe@gmail.com'
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.formField}
            >
            </TextInput>
          </View>

          <View>
            <Text style={styles.label}>Password</Text>
            <View style={styles.formField}>
              <TextInput
                placeholder='enter your password ...'
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={{ flex: 1, paddingRight: 30 }}
                secureTextEntry={!showPassword}
              >
              </TextInput>
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
              >
                <MaterialIcons
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={24}
                  color={colors.grey}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ width: "70%", alignSelf: "center", marginTop: 40 }} >
          <Button
            style={styles.button}
            title={isLoading ? "loading ..." : "Sign In"}
            titleStyle={styles.buttonText}

            color={colors.orange}
            onPress={() => {
              setIsLoading(true)
              handleLogin(email, password)
            }}
          >
          </Button>
        </View>
      </View>
    </View>
  )
}
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  imageContainer: {
    flexDirection: 'column',
    width: '100%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
    gap: 10,
    paddingBottom: 20
  },
  logo: {
    width: '70%',
    height: 100,
    resizeMode: 'contain',
  },
  welcomeText: {
    width: '80%',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    textShadowColor: colors.grey,
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 },
  },
  formContainer: {
    width: '100%',
    height: height - 190,
    backgroundColor: colors.darkerShadeOfWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
    padding: 20,
    opacity: 0.99
  },
  formField: {
    width: width - 100,
    backgroundColor: `rgba(7, 1, 58, 0.2)`,
    height: 35,
    paddingLeft: 25,
    color: colors.black,
    marginBottom: 0,


  },
  label: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#716B6B',
    marginLeft: 2,
  },
  button: {
    width: '70%',
    height: 40,
    backgroundColor: colors.orange,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
});
export default SignIn