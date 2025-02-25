import { View, Platform, StatusBar, StyleSheet, Dimensions, Text, TouchableWithoutFeedback } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from "../Components/Header"
import colors from "../config/colors";

function Home ({navigation}){
    
    return(
        <View style={styles.container}>
            <Header />
            <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Scan')}
            >
            <View 
            style={styles.prompt}
            
            >
                <Icon name="qr-code" size={29} color={colors.blue} />         
                <Text style={{color: colors.blue, fontSize: 13, fontWeight: 'bold'}}>Scan QR Code/Bar code</Text>    
                <Icon name="arrow-forward-ios" style={{marginLeft: '5%', fontWeight:"900"}} size={15} color={colors.blue} />
            </View>            
            </TouchableWithoutFeedback>
        </View>
    )
}
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        
    },
    prompt: {
        marginTop: 130,
        marginLeft: 20,
        paddingLeft: 20,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.blue,
        justifyContent: 'left',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: width - 120,
        height: 45,
        borderRadius: 10
    }
})
export default Home