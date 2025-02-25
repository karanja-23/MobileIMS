import { View, Platform, StatusBar, StyleSheet, Dimensions, Text, TouchableWithoutFeedback } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from "../Components/Header"
import colors from "../config/colors"
import Table from "../Components/Table";
import { useState } from "react";
function Home ({navigation}){
    const [isLoading, setIsLoading] = useState(true);
    
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
            <View style={{marginTop: 50}}>
                <Text style={{color: colors.blue, fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginBottom: 20}}>Scan history</Text>
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
        marginTop: 120,
        marginLeft: '30%',
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