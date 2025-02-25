import { View, Text, StyleSheet, Platform,Dimensions, StatusBar, Image, TextInput, Button, Alert } from 'react-native'
import colors from '../config/colors'
import { useEffect, useState } from 'react'
import { UserContext } from "../Contexts/userContext";
import { useContext } from "react";
function SignIn({navigation: navigate}) {
    const width = Dimensions.get('window').width
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
                <Image style={{
                    width: '100%',
                    resizeMode: 'contain'
                }} source={require('../assets/logo.png')} />
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 20, gap: 20}}>
                <Text style={{ width: '100%',fontSize: 20,fontWeight: 'bold',color: colors.blue}}>Sign in to your account </Text>
                <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                placeholder='john doe@gmail.com'
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                    width: width - 100,                    
                    borderRadius: 10,
                    backgroundColor: colors.darkerShadeOfWhite,
                    height: 35,
                    paddingLeft: 10,
                    
                    color: colors.black
                }}
                >

                </TextInput>                
                </View>
                <View>
                <Text style={styles.label}>Password</Text>
                <TextInput
                placeholder='enter your password ...'
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={{
                    width: width - 100,                    
                    borderRadius: 10,
                    backgroundColor: colors.darkerShadeOfWhite,
                    height: 35,
                    paddingLeft: 10,
                    
                    color: colors.black
                }}
                >

                </TextInput>                
                </View>  
             
            </View>
            <View style={{width: "70%", alignSelf: "center", marginTop: 40}} >
            <Button
            title="Sign in"
            color={colors.orange}
            onPress={() => handleLogin(email, password)}
          >
          </Button>         
          </View> 
          
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.white,
      alignItems: 'center',
      
    },
    imageContainer :{
        marginTop: 30,
      width: '70%',
      height: "20%",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white
    },
    label:{
        marginBottom: 5,
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.blue
    }
})
export default SignIn