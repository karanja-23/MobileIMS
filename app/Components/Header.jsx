import { View, Text, StyleSheet,Image,TouchableWithoutFeedback } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from "../config/colors"
import { useContext } from "react";
import { UserContext } from "../Contexts/userContext";
import { useNavigation } from "@react-navigation/native";

function Header (){
    const navigation = useNavigation()
    const {user} = useContext(UserContext)
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
                    <Text style={{color: colors.white, fontSize: 13, fontWeight: '600'}}> Hi {user.username}.</Text>
                </View>            
                </TouchableWithoutFeedback>
            </View>        
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.blue,
        height: 80,
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