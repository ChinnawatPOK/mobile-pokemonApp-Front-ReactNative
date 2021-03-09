import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const AllPokemon = () => {
  const navigation = useNavigation();
  const [allPokemon, setallPokemon] = useState(null);
  const [bgColor, setbgColor] = useState(null);
  const ref = React.useRef(null);
  const [searchWord, setsearchWord] = useState("");
  const [count, setcount] = useState(0);

  useScrollToTop(ref);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=200")
      .then((res) => {
        // console.log(res.data);
        setallPokemon(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterSearch = React.useMemo(() => {
    if (allPokemon) {
      let data;
      data = allPokemon.results;
      if (data) {
        if (searchWord) {
          data = data.filter((row) => {
            return row.name.indexOf(searchWord) > -1;
          });
        }
        setcount(data.length);
        return data;
      }
    }
  }, [searchWord, allPokemon]);

  return (
    <View style={myStyles.container}>
      <ScrollView>
        <View style={{ position: "relative", marginBottom: 80 }}>
          <Image
            style={{
              width: 60,
              height: 60,
              position: "absolute",
              left: 20,
              top: 15,
              zIndex: 0,
            }}
            source={{
              uri: "https://www.freeiconspng.com/uploads/pokeball-icon-23.png",
            }}
          ></Image>
          <TextInput
            placeholder="Name Of Pokemon"
            onChangeText={(e) => {
              setsearchWord(e.toLowerCase());
            }}
            style={{
              borderWidth: 1,
              borderColor: "rgba(255, 0, 0, 0.61)",
              position: "absolute",
              zIndex: 100,
              paddingVertical: 10,
              paddingLeft: 20,
              borderRadius: 30,
              marginLeft: 60,
              marginTop: 20,
              fontSize: 20,
              backgroundColor: "#fff",
              width: 320,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.53,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          ></TextInput>
        </View>
        <Divider
          style={{
            backgroundColor: "rgba(78, 76, 76, 0.281)",
            height: 1,
            marginHorizontal: 20,
            marginBottom: 10,
            marginVertical: 10,
          }}
        />
        <Text style={{ marginLeft: 20, fontWeight: "bold", marginBottom: 5 }}>
          FOUND POKEMON -{count}-
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            minHeight: height,
            flexWrap: "wrap",
            zIndex: 10,
            backgroundColor: "#43ca31a1",
            paddingTop: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {filterSearch && filterSearch.length != 0 ? (
            filterSearch.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Pokemon", {
                    id_pokemon: item.url.split("/")[6],
                  });
                }}
              >
                <LinearGradient
                  // colors={["#CAC531", "#F3F9A7"]}
                  colors={["#e4e6e5", "#fff", "#fff", "#43ca31"]}
                  // colors={["#30E8BF", "#FF8235"]}
                  style={{
                    width: width / 4 - 6,
                    alignItems: "center",
                    marginHorizontal: 3,
                    marginVertical: 3,
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={{
                      uri: `https://pokeres.bastionbot.org/images/pokemon/${
                        item.url.split("/")[6]
                      }.png`,
                    }}
                  ></Image>

                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 11,
                      fontWeight: "bold",
                      letterSpacing: 1,
                      // backgroundColor: "#F3F9A7",
                      paddingHorizontal: 2,
                      paddingVertical: 2,
                      borderRadius: 20,
                      color: "#000",
                      marginTop: 8,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      backgroundColor: "rgba(255, 0, 0, 0.171)",
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: "bold",
                      letterSpacing: 1,
                      borderRadius: 20,
                    }}
                  >
                    #{item.url.split("/")[6]}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))
          ) : (
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "center", fontSize: 28, opacity: 0.2 }}>
                NOT FOUND P'oKemoN
              </Text>
              <Image
                style={{
                  width: width - 50,
                  height: 500,
                  marginLeft: 20,
                  opacity: 0.2,
                }}
                source={{
                  uri:
                    "https://cdn79.picsart.com/197692696000202.gif?to=min&r=640",
                }}
              ></Image>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default AllPokemon;
