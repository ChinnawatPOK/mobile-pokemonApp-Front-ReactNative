import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";
import CardPokemon from "../components/CardPokemon";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full heigh

const MyPokemon = ({ route }) => {
  const { name } = route.params;
  const [pokemonData, setPokemonData] = useState(null);
  useEffect(() => {
    axios
      .get(`http://10.0.2.2:8080/api/getPokemonById?userId=${route.params.id}`)
      .then((res) => {
        console.log("success");
        console.log(res.data);
        setPokemonData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const getData = () => {};
  return (
    <View style={myStyle.view}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        {pokemonData && pokemonData.length != 0 ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 36,
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Pokedex
                </Text>
                <Text style={myStyle.textHeader}>Hello : {name}</Text>
                <Text style={myStyle.textHeader}>
                  Now you have pokemon : {pokemonData ? pokemonData.length : 0}{" "}
                  characters
                </Text>
              </View>

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
                {name && (
                  <Text style={{ fontSize: 28, color: "white" }}>
                    {name.substring(0, 1).toUpperCase()}
                    {name.substring(1, 2).toLowerCase()}
                  </Text>
                )}
              </View>
            </View>

            {pokemonData &&
              pokemonData.map((item) => (
                <CardPokemon item={item} nameUser={name} />
              ))}
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 36,
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Pokedex
                </Text>
                <Text style={myStyle.textHeader}>Hello : {name}</Text>
                <Text style={myStyle.textHeader}>
                  Now you have pokemon : {pokemonData ? pokemonData.length : 0}{" "}
                  characters
                </Text>
              </View>

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
                {name && (
                  <Text style={{ fontSize: 28, color: "white" }}>
                    {name.substring(0, 1).toUpperCase()}
                    {name.substring(1, 2).toLowerCase()}
                  </Text>
                )}
              </View>
            </View>
            <Image
              style={{
                width: 250,
                height: 250,
                alignSelf: "center",
                marginTop: 100,
                opacity: 0.5,
              }}
              source={{
                uri:
                  "https://lh3.googleusercontent.com/proxy/0hIHqoMqCaxkn3_H7c-HvEf2Pm7pOvjRurbx-VAb7C7mcW7uEwH2GIsr9vVHW-8nL7MAUcr80qfVEbbXj1NXvkKDkLgBodMR1fSqTPNgrWuluH3zlMs2GH9n1Gik1EzmObo9",
              }}
            />
            <Text style={{ alignSelf: "center" }}>
              You don't have pokedex in bag. !
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const myStyle = StyleSheet.create({
  view: {
    flex: 1,
    marginHorizontal: 15,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: "800",
  },
});
export default MyPokemon;
