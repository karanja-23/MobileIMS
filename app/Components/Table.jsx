import { DataTable,Searchbar } from "react-native-paper"
import { View,StyleSheet,TouchableOpacity, Text } from "react-native"
import { useState, useEffect } from "react";
import colors from "../config/colors"
import Icon from 'react-native-vector-icons/MaterialIcons';
function Table(){
    const [data, setData] = useState([])
    const [query, setQuery] = useState('')
    const [filteredData, setFilteredData] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesToDisplay, setEntriesToDisplay] = useState(data.slice(0, limit));

    useEffect(()=> {
        setQuery('')
        fetch('https://mobileimsbackend.onrender.com/assets',{
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            
            setData(data.assets) 
            setEntriesToDisplay(data.assets.slice(0, limit));
                      
        })
    },[])
    function handleSearch(query) {
        setQuery(query);
        const filteredData = data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        setEntriesToDisplay(filteredData.slice(0, limit));
    }
    const limit = 5


    const handlePageChange = (page) => {
        if (page < 1 || page > Math.ceil(data.length / limit)) {
            return;
        }
        setCurrentPage(page);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        setEntriesToDisplay(data.slice(startIndex, endIndex));
        setCurrentPage(page);
    }
    return(
        <View>
        <Searchbar
            placeholder="Search"
            inputStyle={{fontSize: 14, alignSelf: 'center'}}
            iconColor={colors.orange}
            icon={()=> <Icon name="search" color={colors.orange} size={17} />}
            iconSize={0}          
            style={Styles.search}
            value={query}
            cancelButton={null}
        
            onChangeText={(query) => handleSearch(query)}
        />      
        <DataTable>
            <DataTable.Header>
                <DataTable.Title style={{maxWidth: "40%", flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',width: '100%'}}>
                    <Text style={{color: colors.blue, fontSize: 13, fontWeight: 'bold'}}>Date Scanned</Text>
                    <Icon name="swap-vert" size={15} color={colors.blue} />
                 </View>
                </DataTable.Title>              
                <DataTable.Title style={{ maxWidth: "40%",flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',width: '100%'}}>
                    <Text style={{color: colors.blue, fontSize: 13, fontWeight: 'bold'}}>Asset Name</Text>
                    <Icon name="swap-vert" size={15} color={colors.blue} />
                 </View>
                </DataTable.Title>  
                <DataTable.Title style={{maxWidth: "20%", flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1, flexDirection: 'row', width: '100%'}}>
                    <Text style={{color: colors.blue, fontSize: 13, fontWeight: 'bold'}}>Status</Text>
                    
                 </View>
                </DataTable.Title>  

            </DataTable.Header>
            {entriesToDisplay .map((item, index) => (
                <DataTable.Row style={{height: 30, justifyContent: 'center'}} key={index}>
                   
                    <DataTable.Cell style={{maxWidth: "40%"}} >{item.date_created}</DataTable.Cell>
                    <DataTable.Cell style={{maxWidth: "40%"}}>{item.name}</DataTable.Cell>
                    <DataTable.Cell style={{maxWidth: "20%"}}> {item.status}</DataTable.Cell>
                </DataTable.Row>
            ))}
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',alignSelf: 'flex-start',marginLeft: 15, marginTop: 10, gap: 10}}>
                <Text>Page {currentPage} of {Math.ceil(data.length / limit)}</Text>
                <Icon name="keyboard-arrow-left" size={18} onPress={() => handlePageChange(currentPage - 1)} />
                <Icon name="keyboard-arrow-right" size={18} onPress={() => handlePageChange(currentPage + 1)} />
            </View>
        </DataTable>  


        </View>
    )
}
const Styles = StyleSheet.create({
    search :{
        width: '46%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkerShadeOfWhite,        
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 10,
        elevation: 5,
    }
})

export default Table