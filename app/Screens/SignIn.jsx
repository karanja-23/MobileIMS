import { View, Text, StyleSheet, Platform,Dimensions, StatusBar, Image, TextInput, Button, Alert } from 'react-native'
import colors from '../config/colors'
import { useEffect, useState } from 'react'
import { UserContext } from "../Contexts/userContext";
import { useContext } from "react";

function SignIn({navigation: navigate}) {
   
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const {user,setUser} = useContext(UserContext)

    function handleLogin (email, password) {
        fetch(`https://mobileimsbackend.onrender.com/user/${email}`,{
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            
            if (data.message) {
                setEmailError(true)
            }
            else {
                if (data.user.password!== undefined && data.user.password == password) {
                    setUser(data.user)
                  
                    Alert.alert(
                        "Success!",
                        "Login successful \n\n Welcome",
                        [
                          {
                            text: "OK",
                            onPress: () => {
                                navigate.navigate("Home")
                        }}]
                    )
                    
                }
                else {
                    
                    Alert.alert(
                        "Error",
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
            Alert.alert(
                "Error",
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
            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 20, gap: 20, backgroundColor: colors.white}}>
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
                <TextInput
                placeholder='enter your password ...'
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.formField}
                >

                </TextInput>                
                </View>  
             
            </View>  
            <View style={{width: "70%", alignSelf: "center", marginTop: 40}} >
            <Button
            style={styles.button}
            title='Sign In'
            titleStyle={styles.buttonText}
            mode="contained"
            color={colors.orange}
            onPress={() => handleLogin(email, password)}
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
      backgroundColor: colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 0,
      padding: 20,
    },
    formField: {
      width: width - 100,
      backgroundColor: colors.darkerShadeOfWhite,
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