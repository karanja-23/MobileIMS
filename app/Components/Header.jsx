import { View, Text, StyleSheet,Image,TouchableWithoutFeedback, Dimensions } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from "../config/colors"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/userContext";
import { useNavigation } from "@react-navigation/native";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";

function Header (){
    const navigation = useNavigation()
    const {user} = useContext(UserContext)
    const [username, setUsername] = useState(user?.username)
    useEffect(() => {
        setUsername(user?.username)
    }, [user])
    return(
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={()=>navigation.navigate('Home')}>
                <View style={styles.imageContainer}>
                    <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/darkLogo.png')} />
                </View>            
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile')}>
                <View style={styles.user}>
                    <Icon name="perm-identity" size={29} color={colors.white} />                
                    <Text style={{color: colors.white, fontSize: 13, fontWeight: '600'}}> Hi {username}.</Text>
                </View>            
                </TouchableWithoutFeedback>
            </View>        
        </View>
    )
}
const deviceHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.blue,
        height: deviceHeight * 0.113,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    imageContainer: {
        width: 150,
        
    },
    user:{
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0
                
    },
})
export default Header