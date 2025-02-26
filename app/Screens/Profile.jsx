import { View, Text, StyleSheet,Platform,StatusBar, TextInput, Button } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from "../config/colors";
import { UserContext } from "../Contexts/userContext";
import { useContext, useEffect, useState, useRef } from "react";
import { text } from "@fortawesome/fontawesome-svg-core";
import { Alert } from 'react-native';
function Profile({navigation}){
    const userRef = useRef(null);
    const {Token} = useContext(UserContext)
   const {setUser,user} = useContext(UserContext)
   const [name, setName] = useState(user.username)
   const [email, setEmail] = useState(user.email)
   const [contact, setContact] = useState(user.phone_number)
   const [password, setPassword] = useState(user.password)
   const [profileName, setProfileName] = useState(user.username)
   async function handleEdit(){
    const userData = {
        username: name,
        email: email,
        phone_number: contact,
        password: password
      };
      
     await fetch(`https://mobileimsbackend.onrender.com/edituser/${email}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Email address not found") {
            Alert.alert(
                "Error!",
                "Email address not found",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("Profile")
                    }
                ]
            )
        }
        else if (data.message === 'User updated successfully') { 
            
            Alert.alert("Profile edited successfully")
            setTimeout(() => {
                
                fetch(`https://mobileimsbackend.onrender.com/protected/user`,{
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${Token}`,
                      'Content-Type': 'application/json'
                    }
                  })
                .then(response => response.json())
                .then(data => {
                    setUser(data)
                                       
                })
            },1000)
            
        }
        
    })
   }
   useEffect(() => {
    
    setProfileName(user.username)
   },[user])
    return(
        <View style={styles.container}>
            <Icon onPress={()=>{navigation.goBack()}} style={styles.back} name="arrow-back" size={27} color={colors.white} />
            <View style={styles.profile}>           
              <Text style={{color: colors.white, fontSize: 20, fontWeight: '900', marginBottom: 10}} >My Profile</Text>
              <Icon name="perm-identity" size={70} color={colors.white} />
              <Text style={{color: colors.white, fontSize: 14, fontWeight: '500'}} >{profileName}</Text>
            </View>
            <View style={{marginHorizontal: 15, marginTop: 20}}>
                <Text style={styles.label} >Name</Text>
                <TextInput
                onChange={(event) => setName(event.nativeEvent.text)}
                value={user ? name : ''}
                style={styles.input}
                placeholder="Name"
                
                >
                    
                </TextInput>
                <Text style={styles.label} >Email</Text>
                <TextInput
                
                value={user? email : ''}
                style={styles.input}
                placeholder="Email"

                >

                </TextInput>
                <Text style={styles.label} >Contact</Text>
                <TextInput
                onChange={(event) => setContact(event.nativeEvent.text)}
                value={user? contact : ''}
                style={styles.input}
                placeholder="Phone Number"
                >

                </TextInput>
                <Text style={styles.label} >Passsword</Text>
                <TextInput
                onChange={(event) => setPassword(event.nativeEvent.text)}
                value={user? password : ''}
                style={[styles.input, {marginBottom: 60}]}
                placeholder="password"
                >
                    
                </TextInput>  
                           
                <View style={{gap: 20}}>
                <Button 
                onPress={() =>handleEdit()}
                title="Edit details"
                color={colors.blue}
                
                >
                   
                </Button>
                <Button 
                  title="Logout"
                  color={colors.orange}
                  onPress={() => navigation.navigate('SignIn')}
                >
                </Button>                
                </View>
            </View>
        </View>
    
    )
}
const styles = StyleSheet.create({
    container:{
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight :0,
        height: '100%',
        
    },
    profile:{
        height: '20%',
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',   
    },
    back: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1
    },
    input:{
        borderBottomWidth: 1,
        marginBottom: 25,
        borderBottomColor: colors.grey
    },
    label:{
        color: colors.blue,
        fontSize: 16,
        fontWeight: '600',
       
    }
})
export default Profile