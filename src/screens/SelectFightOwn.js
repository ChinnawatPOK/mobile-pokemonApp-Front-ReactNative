import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ListItem, Avatar, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const SelectFightOwn = ({ route }) => {
  const navigationn = useNavigation();
  const [pokemonInBag, setpokemonInBag] = useState(null);
  const [pokemonSelected, setpokemonSelected] = useState(null);
  const { namePoke, idPoke, image, type, idUser } = route.params;

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:8080/api/getPokemonById?userId=${idUser}`)
      .then((res) => {
        setpokemonInBag(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={myStyles.container}>
      <View style={{ flex: 1, backgroundColor: "#e52d272c", zIndex: 3 }}>
        {/* {console.log(type)} */}
        <View
          style={{
            flex: 0.2,
            backgroundColor: "#e52d27",
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            position: "relative",
            zIndex: 15,
          }}
        >
          <Image
            style={{
              width: 150,
              height: 150,
              opacity: 0.2,
              position: "absolute",
              right: -20,
              top: -10,
            }}
            source={{
              uri:
                "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/f720bb6e-b303-4877-bffb-d61df0ab183f/d3b98cf-4fc5c76b-2a99-47fc-98b6-d7d4ee8d9d9f.png",
            }}
          ></Image>
          <Text
            style={{
              fontSize: 25,
              letterSpacing: 1,
              color: "#d8bcbb",
              fontWeight: "bold",
              marginTop: 30,
              marginLeft: 20,
            }}
          >
            Select POKEMON
          </Text>
          <Text
            style={{
              fontSize: 25,
              letterSpacing: 1,
              color: "#fff",
              fontWeight: "bold",
              marginLeft: 20,
            }}
          >
            to FIGHT
          </Text>
        </View>
        <View style={{ flex: 0.7 }}>
          <View
            style={{
              top: -20,
              backgroundColor: "rgba(18, 143, 18, 0.263)",
              borderRadius: 200,
              paddingVertical: 40,
              width: 300,
              alignSelf: "center",
              borderStyle: "dashed",
              borderWidth: 2,
              borderColor: "#e52d27",
            }}
          >
            {pokemonSelected ? (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    // marginTop: 20,
                    letterSpacing: 1,
                  }}
                >
                  You Choosed
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: "bold",
                    marginTop: 5,
                    letterSpacing: 1,
                  }}
                >
                  {pokemonSelected.pokemonName}
                </Text>
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                  source={{
                    uri: `https://pokeres.bastionbot.org/images/pokemon/${pokemonSelected.pokemonId}.png`,
                  }}
                ></Image>
              </View>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                }}
              >
                <Text style={{ fontSize: 18, letterSpacing: 1, top: 20 }}>
                  Please Select
                </Text>
                <Text style={{ fontSize: 18, letterSpacing: 1, top: 20 }}>
                  Pokemon in your bag
                </Text>
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    opacity: 0.6,
                    alignSelf: "center",
                    marginTop: 0,
                  }}
                  source={{
                    uri:
                      "https://cdn.iconscout.com/icon/free/png-256/pokemon-go-2288554-1933799.png",
                  }}
                ></Image>
              </View>
            )}
          </View>
          <Divider
            style={{
              backgroundColor: "red",
              height: 1,
              marginHorizontal: 20,
              marginBottom: 10,
              marginVertical: 10,
              top: -12,
            }}
          />
          <Text
            style={{
              fontSize: 17,
              letterSpacing: 1,
              marginLeft: 15,
              fontWeight: "bold",
              top: -12,
            }}
          >
            POKEMON in bags ({pokemonInBag && pokemonInBag.length})
          </Text>
          {pokemonInBag && pokemonInBag.length != 0 ? (
            <FlatList
              style={{ top: -5 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={pokemonInBag}
              keyExtractor={(result) => result.id}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      width: width - 20,
                      backgroundColor: "#fff",
                      borderWidth: 2,
                      borderColor: "red",
                      borderLeftWidth: 10,
                      borderLeftColor: "red",
                      marginHorizontal: 10,

                      borderRadius: 8,
                      height: 133,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 50,
                      paddingVertical: 20,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.23,
                      shadowRadius: 2.62,
                      elevation: 4,
                    }}
                  >
                    <View style={{ display: "flex" }}>
                      <Text
                        style={{
                          fontSize: 25,
                          letterSpacing: 1,
                          fontWeight: "bold",
                        }}
                      >
                        {item.pokemonName}
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          setpokemonSelected(item);
                        }}
                      >
                        <Text
                          style={{
                            backgroundColor: "rgba(14, 206, 14, 0.963)",
                            fontSize: 20,
                            letterSpacing: 1,
                            fontWeight: "bold",
                            color: "#fff",
                            borderRadius: 20,
                            marginTop: 10,
                            paddingHorizontal: 15,
                            paddingVertical: 7,
                            textAlign: "center",
                          }}
                        >
                          SELECT
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Image
                      style={{
                        width: 110,
                        height: 110,
                        alignSelf: "center",
                        marginTop: 10,
                        // backgroundColor: "#e4e6e5",
                        borderRadius: 20,
                        padding: 40,
                      }}
                      source={{
                        uri: `https://pokeres.bastionbot.org/images/pokemon/${item.pokemonId}.png`,
                      }}
                    ></Image>
                  </View>
                );
              }}
            />
          ) : (
            <View
              style={{
                width: width - 20,
                backgroundColor: "#fff",
                marginHorizontal: 10,
                borderRadius: 8,
                height: 133,
                justifyContent: "space-between",
                paddingHorizontal: 30,
                paddingVertical: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1026px-Pok%C3%A9_Ball_icon.svg.png",
                }}
              ></Image>
              <Text
                style={{
                  fontSize: 16,
                  letterSpacing: 1,
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                NOT FOUND Pokemon In your bag
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  letterSpacing: 1,
                  color: "#fff",
                  backgroundColor: "#000",
                  paddingHorizontal: 15,
                  paddingVertical: 3,
                  borderRadius: 20,
                  marginTop: 6,
                }}
              >
                GO RANDOM POKEMON
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            flex: 0.1,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
          onPress={() => {
            if (pokemonSelected) {
              // const { namePoke, idPoke, image, type } = route.params;
              navigationn.navigate("CardFight", {
                opponentId: idPoke,
                Opponenttype: type,
                opponentName: namePoke,
                opponentImage: image,
                pokemonMe: pokemonSelected,
              });
            } else {
              Alert.alert("Select Pokemon !!!!!");
            }
          }}
        >
          <View
          // style={{
          //   backgroundColor: "red",
          //   flex: 0.1,
          //   borderTopLeftRadius: 25,
          //   borderTopRightRadius: 25,
          //   alignItems: "center",
          //   justifyContent: "center",
          //   position: "relative",
          // }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                position: "absolute",
                right: 110,
                opacity: 0.3,
              }}
              source={{
                uri: "https://obihoernchen.net/pokemon/core/img/valor.png",
              }}
            ></Image>
            <Text
              style={{
                fontSize: 30,
                letterSpacing: 1,
                fontWeight: "bold",
                color: "#e4e6e5",
              }}
            >
              FIGHT
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default SelectFightOwn;
