import { useEffect } from "react";
import { ImageBackground, StyleSheet, Image, View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../Contexts/userContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from 'react-native'
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "../config/colors";
function WelcomeScreen({ navigation }) {
  const { setUser, user, setToken, setData } = useContext(UserContext);
  const navigate = useNavigation();
  useEffect(() => {
    async function checkToken() {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        if (token) {
          setToken(token);         
          fetch(`https://mobileimsbackend.onrender.com/protected/user`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              
              setUser(data);

              console.log(user);
              setData(data.scanned_assets);     

            })
           
            .then(() => {
              navigation.navigate("Home");
            })

            .catch((error) => {
              console.error(error);
            });
        } else {
          navigation.navigate("SignIn");
        }
      } catch (error) {
        console.error(error);
        navigation.navigate("SignIn");
      }
    }
    checkToken();
  }, [navigation]);
  return (
    <ImageBackground style={styles.background } >
      <Image style={styles.logo} source={require("../assets/darkLogo.png")} />
      <View >
        <ActivityIndicator size="large" color={colors.white} />
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
    gap:0,
    opacity:0.9

  },
  logo: {
    width: "70%",
    resizeMode: "contain",
  },
});

export default WelcomeScreen;
