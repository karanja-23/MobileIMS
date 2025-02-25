import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { View, StyleSheet, Dimensions, Animated, Platform, StatusBar } from "react-native"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import colors from "../config/colors"
import Header from "./Header"

function Loading(){
    const spinValue = new Animated.Value(0)

    Animated.timing(spinValue, {
        toValue: 1000,
        duration: 100000,
        useNativeDriver: true
    }).start()

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return(
        <View> 
       
           <Animated.View style={{
               transform: [{ rotate: spin }],
               justifyContent: 'center',
               alignItems: 'center'
           }}>
               <FontAwesomeIcon
               size={50}
                icon={faSpinner} />
           </Animated.View>
        </View>
    )
}
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
const styles = StyleSheet.create({
    container: {
           
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Loading