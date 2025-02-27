import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    Dimensions,
    TextInput,
    Button,
    Alert
  } from "react-native";
  import Header from "../Components/Header";
  import colors from "../config/colors";
  import { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import Loading from "../Components/Loading";
  
  function AssetInformation({route}) {
    const navigate = useNavigation()
    const {data} = route.params 
    const [assetData, setAssetData] = useState(false)
    const [fetchedData, setFetchedData] = useState(false)
    const [loading,setLaoding] = useState(false)
    
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
      setLaoding(true)
      fetch(`https://mobileimsbackend.onrender.com/asset/${data}`,{
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {
        
        if (data.message === "Asset not found") {
          setLaoding(false)
          setShowAlert(true)
        }
        else if (data && Object.keys(data).length > 0) {
          setLaoding(false)
          setAssetData(data)
          setFetchedData(true)          
        }
      })
    },[])

    useEffect(() => {
      if (showAlert) {
        Alert.alert(
          "Error",
          "Asset not found!",
          [
            {
              text: "OK",
              onPress: () => navigate.navigate("Scan"),
            },
          ],
          { cancelable: false }
        );
        setShowAlert(false);
      }
    }, [showAlert]);
    

    return (
      <View style={styles.container}>
        
         { loading ? <View style={styles.alert}>
            <Loading />

          </View> : null}
        
      <Header />
       <View style={styles.new}>
        <Text
          style={{
            color: colors.blue,
            fontSize: 20,
            fontWeight: "900",
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          Asset Information
        </Text>
        <View style={{flexDirection: "row", justifyContent: "space-evenly", marginTop: 20, opacity: loading ? 0.4 : 1}}>
          <View>
            <Text style={styles.titles}>Asset Id</Text>
            <TextInput
             value={fetchedData ? assetData.asset.asset_id : ''}
              placeholder="Asset Name"
              style={styles.input}
            ></TextInput>
          </View>
          <View>
            <Text style={[styles.titles,{opacity: loading ? 0.4 : 1}]}>Asset Name</Text>
            <TextInput
              value={fetchedData ? assetData.asset.name : ''}
              placeholder="Asset Name"
              style={[styles.input,{opacity: loading ? 0.4 : 1}]}
            ></TextInput>
          </View>
        </View>
        <View style={{marginTop: 20, opacity: loading ? 0.4 : 1}}>
           <Text style={{fontSize:13, marginBottom: 5 ,fontWeight:19,fontWeight: "900", color: colors.grey,marginLeft: "10%"}}>Asset description</Text>
           <TextInput 
           value={fetchedData ? assetData.asset.description : ''}            
           multiline={true}
           numberOfLines={6}
           style={{width:"80%", backgroundColor: "lightgrey" ,textAlignVertical: "top" ,alignSelf: "center",height: 130}}>

           </TextInput>
        </View>
        
        <View style={{flexDirection: "row", justifyContent: "space-evenly", marginTop: 20, opacity: loading ? 0.4 : 1}}>
          <View>
            <Text style={styles.titles}>Asset condition</Text>
            <TextInput
              value={fetchedData ? assetData.asset.condition : ''}
              placeholder="Asset Name"
              style={styles.input}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.titles}>Category</Text>
            <TextInput
            value={fetchedData ? assetData.asset.category : ''}
              placeholder="Asset Name"
              style={styles.input}
            ></TextInput>
          </View>
        </View>  

        <View style={{flexDirection: "row", justifyContent: "space-evenly", marginTop: 20, marginBottom: 30, opacity: loading ? 0.4 : 1}}>
          <View>
            <Text style={styles.titles}>Asset condition</Text>
            <TextInput
              value={fetchedData ? assetData.asset.space : ''}
              placeholder="Asset Space"
              style={styles.input}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.titles}>Status</Text>
            <TextInput
            value={fetchedData ? assetData.asset.status : ''}
              placeholder="Asset Name"
              style={styles.input}
            ></TextInput>
          </View>
        </View> 
        <View style={{width: "80%", alignSelf: "center",backgroundColor:colors.blue}} >
        <Button
          title="Borrow Asset"
          color={colors.orange}        
          disabled={loading}       
        >
        </Button>         
        </View>            
      </View>
    </View>
    )
  }
  const width = Dimensions.get("window");
  const height = Dimensions.get("window");
  const styles = StyleSheet.create({
    container: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    new: {
      marginTop: 80,
      width: "100%",
      height: height.height - 80,
      backgroundColor: colors.white,
      borderWidth: 5,
      borderColor: "white",
      zIndex: -1,
    },
    input: {
      backgroundColor: "lightgrey",
      paddingLeft: 10,
      width: 150,
      height: 33,
      fontSize: 11,
    },
    titles: {
      color: colors.grey,
      fontSize: 13,
      fontWeight: "900",
      marginBottom: 5,
    },
    alert :{
      position: "absolute",
      top: height.height*0.47,
      left: width.width*0.43,
      width: width*0.5,
      height: 3/4 *(width*0.5),
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      zIndex: 3,
      
      
    }
  });
  export default AssetInformation;
  