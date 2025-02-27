import { View, Platform, StatusBar, StyleSheet, Dimensions, Text, TouchableWithoutFeedback } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from "../Components/Header"
import colors from "../config/colors"
import Table from "../Components/Table";
import { useNavigation } from "@react-navigation/native";
function Home (){
    const navigation = useNavigation()
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    return(
        <View style={styles.container}>
            <Header />
            <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Scan')}
            >
            <View 
            style={styles.prompt}
            
            >
                <View style={{flexDirection:'row', alignItems:'center', gap:width*0.007}}>
                <Icon name="qr-code" size={27} color={colors.blue} />         
                <Text style={{color: colors.blue, fontSize: 13, fontWeight: 'bold'}}>Scan QR Code/Bar code</Text>            
                </View>    
                <Icon name="arrow-forward-ios" style={{ fontWeight:"900"}} size={15} color={colors.blue} />
            </View>            
            </TouchableWithoutFeedback>
            <View style={{marginTop: height * 0.06}}>
                <Text style={{color: colors.blue, fontSize: 20, fontWeight: 'bold', marginLeft: width * 0.06, marginBottom: height * 0.03}}>Scan history</Text>
                <Table />
            <View>

            </View>   
            </View>
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
        marginTop: height * 0.16,
        marginLeft: '30%',
        paddingLeft: 10,
        paddingRight: 30,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.blue,
        justifyContent: 'left',
        flexDirection: 'row',
        alignItems: 'center',
        gap: width * 0.03,
        width: (width * 0.6),
        height: height * 0.053,
        borderRadius: 10
    }
})
export default Home