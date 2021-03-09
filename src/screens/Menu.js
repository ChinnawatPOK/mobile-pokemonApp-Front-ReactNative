import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import BlockMenu from "../components/BlockMenu";
import { useNavigation } from "@react-navigation/native";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full heigh

const Menu = (props) => {
  const navigation = useNavigation();
  const [userStorage, setUserStorage] = useState("");
  const [id, setid] = useState(null);
  const readDataFromStorage = async () => {
    try {
      const user = await AsyncStorage.getItem("name");
      const id = await AsyncStorage.getItem("id");
      if (user !== null) {
        setUserStorage(user);
        console.log(user);
      }
      if (id !== null) {
        setid(id);
        console.log(id);
      }
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };
  useEffect(() => {
    readDataFromStorage();
  }, [userStorage]);
  return (
    <View style={myStyle.container}>
      <View style={myStyle.viewContainer}>
        <View
          style={{
            flex: 0.35,
            backgroundColor: "#B22222",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
        >
          <View
            style={{
              top: 120,
              position: "relative",
            }}
          >
            <Text style={myStyle.textWelcome}>Welcome to ...</Text>
            <Text style={myStyle.textHeader}>POKEMON's X Pokpong</Text>
          </View>
          <View
            style={{
              position: "relative",
              top: -60,
              right: -330,
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: "#af6b58",
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 28, color: "white" }}>
                {userStorage.substring(0, 1).toUpperCase()}
                {userStorage.substring(1, 2).toLowerCase()}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              top: -120,
              right: -60,
            }}
          >
            <Image
              source={require(`../images/rr.png`)}
              style={myStyle.imageStyle}
            />
          </View>
        </View>
        <View style={{ flex: 0.65, padding: 3 }}>
          <View style={myStyle.boxRow}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("mypokemon", { id: id, name: userStorage })
              }
            >
              <View style={myStyle.box}>
                <Text style={myStyle.textBox}>My Pokemon Desk</Text>
                <Image
                  source={require(`../images/re.png`)}
                  style={myStyle.imageStyleBox}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("random", { id: id })}
            >
              <View style={myStyle.box2}>
                <Text style={myStyle.textBox}>Get Pokemon Per Day</Text>

                <Image
                  source={require(`../images/random.png`)}
                  style={myStyle.imageStyleBoxRandom}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={myStyle.boxRow}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AllPokemon", { id: id, name: userStorage })
              }
            >
              <View style={myStyle.box3}>
                <Text style={myStyle.textBox}>Search Pokemon</Text>

                <Image
                  source={require(`../images/search2.jpg`)}
                  style={myStyle.imageStyleBoxSearch}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RandomFight", {
                  idUser: id,
                  name: userStorage,
                })
              }
            >
              <View style={myStyle.box4}>
                <Text style={myStyle.textBox}>Fight Mode</Text>

                <Image
                  source={require(`../images/fight.png`)}
                  style={myStyle.imageStyleBoxFight}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const myStyle = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  viewContainer: { flex: 1 },
  imageStyle: {
    width: 260,
    height: 260,
    resizeMode: "stretch",
    opacity: 0.1,
  },
  textHeader: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  textWelcome: {
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 15,
  },

  boxRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 3,
    marginVertical: 15,
  },
  box: {
    width: width / 2 - 15,
    height: height / 4,
    backgroundColor: "#E9967A",
    borderRadius: 30,
    marginVertical: 5,
  },
  box2: {
    width: width / 2 - 15,
    height: height / 4,
    backgroundColor: "#00917c",
    borderRadius: 30,
    marginVertical: 5,
  },
  box3: {
    width: width / 2 - 15,
    height: height / 4,
    backgroundColor: "#51c2d5",
    borderRadius: 30,
    marginVertical: 5,
  },
  box4: {
    width: width / 2 - 15,
    height: height / 4,
    backgroundColor: "#f0a500",
    borderRadius: 30,
    marginVertical: 5,
  },
  imageStyleBox: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    top: 70,
  },
  imageStyleBoxRandom: {
    width: 160,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    top: 70,
  },
  imageStyleBoxSearch: {
    width: 90,
    height: 85,
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    top: 100,
  },
  imageStyleBoxFight: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    top: 60,
  },
  textBox: {
    marginTop: 15,
    marginHorizontal: 10,
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
});

export default Menu;
