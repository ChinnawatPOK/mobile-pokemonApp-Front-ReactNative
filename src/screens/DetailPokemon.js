import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Divider } from "react-native-elements";
const colorr = "yellow";
import { LinearGradient } from "expo-linear-gradient";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
import { Ionicons } from "@expo/vector-icons";
import ModalMoreEvo from "./ModalMoreEvo";
{
  /* <Ionicons name="thumbs-up" style={myStyles.iconCircle} /> */
}
const DetailPokemon = () => {
  const [evoId, setevoId] = useState(null);
  const [dataSpecie, setdataSpecie] = useState(null);
  const [dataPokemon, setdataPokemon] = useState(null);
  const [colorBgPokemon, setcolorBgPokemon] = useState("red");
  const [modalVisible, setModalVisible] = useState(false);
  const [isOpenModal, setisOpenModal] = useState(false);
  const [selectedPokemon, setselectedPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${1}`)
      .then((res) => {
        setdataSpecie(res.data);
        // setevoId(res.data.evolution_chain.url);
        // setevoId(res.data.evolution_chain)
        setcolorBgPokemon(res.data.color.name);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${1}`)
      .then((res) => {
        setdataPokemon(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closeModal = () => {
    setisOpenModal(false);
  };

  const seperateStats = (typee) => {
    const data = dataPokemon.stats.filter((item, index) => {
      return item.stat.name == typee;
    });
    console.log(data);
    return data[0].base_stat;
  };

  return (
    <LinearGradient
      colors={["#fff", "#f5f5f5", "#f5f5f5", colorBgPokemon]}
      style={myStyles.viewContainer}
    >
      {console.log(colorBgPokemon)}
      {dataPokemon ? (
        <ScrollView>
          <View style={myStyles.viewContent}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
              }}
            >
              <Text>{evoId && evoId}</Text>
              <View>
                <Text style={myStyles.namePokemon}>Busalem</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#e4e5e6b4",
                    paddingVertical: 2,
                    paddingHorizontal: 4,
                    borderRadius: 6,
                    marginBottom: 5,
                  }}
                >
                  <Text style={{ fontSize: 13, color: "#000" }}>
                    WEIGHT {dataPokemon.weight} HG.
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#e4e5e6b4",
                    paddingVertical: 2,
                    paddingHorizontal: 4,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ fontSize: 13, color: "#000" }}>
                    HEIGHT {dataPokemon.height} CM.
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={myStyles.imgHp}
                  source={{
                    uri:
                      "https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Pokecenter-512.png",
                  }}
                ></Image>
                <Text style={myStyles.hpPokemon}>HP-{seperateStats("hp")}</Text>
              </View>
            </View>
            <Image
              source={{
                uri: "https://pokeres.bastionbot.org/images/pokemon/1.png",
              }}
              style={myStyles.imgPokemon}
            ></Image>

            <Divider
              style={{
                backgroundColor: "rgba(78, 76, 76, 0.281)",
                height: 1,
                marginHorizontal: 20,
                marginBottom: 10,
              }}
            />
            {/* ********************** Element ******************** */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingHorizontal: 15,
                flexWrap: "wrap",
              }}
            >
              {dataPokemon.types.map((item) => (
                <View style={myStyles.cardElement}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    {item.type.name}
                  </Text>
                </View>
              ))}
              {/* <View style={myStyles.cardElement}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
                fire
              </Text>
            </View>
            <View style={myStyles.cardElement}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
                position
              </Text>
            </View> */}
            </View>
            {/* ********************** Attack ******************** */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 7,
                marginBottom: 10,
                paddingHorizontal: 10,
              }}
            >
              <View style={myStyles.cardAttack}>
                <Text style={{ fontSize: 12, letterSpacing: 1 }}>SPEED</Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {seperateStats("speed")}
                </Text>
              </View>
              <View style={myStyles.cardAttack}>
                <Text style={{ fontSize: 12, letterSpacing: 1 }}>ATTACK</Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {" "}
                  {seperateStats("attack")}
                </Text>
              </View>
              <View style={myStyles.cardAttack}>
                <Text style={{ fontSize: 12, letterSpacing: 1 }}>DEFENSE</Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {" "}
                  {seperateStats("defense")}
                </Text>
              </View>
              <View style={myStyles.cardAttack}>
                <Text style={{ fontSize: 12, letterSpacing: 1 }}>
                  experience
                </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {" "}
                  {dataPokemon.base_experience}
                </Text>
              </View>
            </View>
            {/* ********************** Abilitie ******************** */}

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 20,
                letterSpacing: 1,
                marginTop: 8,
              }}
            >
              Abilities
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginLeft: 20,
                marginRight: 20,
                marginTop: 6,
              }}
            >
              {dataPokemon.abilities.map((item) => (
                <Text
                  style={{
                    backgroundColor: "rgba(148, 143, 143, 0.281)",
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    fontSize: 14,
                    borderRadius: 8,
                    marginLeft: 2.5,
                    marginRight: 2.5,
                    marginBottom: 4.5,
                  }}
                >
                  {item.ability.name}
                </Text>
              ))}
            </View>
            {/* ********************** evolution ******************** */}
            <Divider
              style={{
                backgroundColor: "rgba(78, 76, 76, 0.281)",
                height: 1,
                marginHorizontal: 20,
                marginBottom: 10,
                marginTop: 12,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 20,
                letterSpacing: 1,
                marginTop: 8,
              }}
            >
              Evolutions 3
            </Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={[
                "https://pokeres.bastionbot.org/images/pokemon/1.png",
                "https://pokeres.bastionbot.org/images/pokemon/2.png",
                "https://pokeres.bastionbot.org/images/pokemon/3.png",
              ]}
              keyExtractor={(result) => result}
              renderItem={({ item }) => {
                return (
                  <LinearGradient
                    colors={["#fff", colorBgPokemon]}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: 395,
                      backgroundColor: "red",
                      marginRight: 10,
                      marginLeft: 8,
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      borderRadius: 10,
                      // backgroundColor: "rgba(78, 76, 76, 0.681)",
                      justifyContent: "space-around",
                      marginTop: 8,
                      marginBottom: 15,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowOpacity: 0.29,
                      shadowRadius: 4.65,

                      elevation: 7,
                    }}
                  >
                    <Image
                      source={{
                        uri: item,
                      }}
                      style={{ width: 95, height: 95, borderRadius: 80 }}
                    ></Image>
                    <View style={{ display: "flex", justifyContent: "center" }}>
                      {isOpenModal && selectedPokemon && (
                        <ModalMoreEvo
                          fn_close={closeModal}
                          data={selectedPokemon}
                        />
                      )}
                      <Text
                        style={{
                          fontSize: 28,
                          fontWeight: "bold",
                          color: `${
                            colorBgPokemon == "yellow" ||
                            colorBgPokemon == "white"
                              ? "#888a8bb4"
                              : "#fff"
                          }`,
                        }}
                      >
                        BUSALAM
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          color: `${
                            colorBgPokemon == "yellow" ||
                            colorBgPokemon == "white"
                              ? "#888a8bb4"
                              : "#e4e6e5"
                          }`,
                          letterSpacing: 1,
                        }}
                      >
                        Lv.1 upgrade
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setselectedPokemon(item);
                          setisOpenModal(true);
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgb(56, 55, 55)",
                            paddingHorizontal: 25,
                            paddingVertical: 5,
                            borderRadius: 35,
                            marginTop: 6,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#fff",
                              fontWeight: "bold",
                            }}
                          >
                            more detail
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                );
              }}
            />
            {/* <Image
            source={{
              uri: "https://pokeres.bastionbot.org/images/pokemon/2.png",
            }}
            style={{ width: 110, height: 110 }}
          ></Image> */}
            {/* <View style={myStyles.wrapData}></View> */}
          </View>
        </ScrollView>
      ) : (
        <View>
          <Text>loading</Text>
        </View>
      )}
    </LinearGradient>
  );
};

const myStyles = StyleSheet.create({
  // viewContainer: (color) => ({
  //   flex: 1,
  //   backgroundColor: color,
  // }),
  viewContainer: {
    flex: 1,
  },
  viewContent: {
    flex: 1,
    position: "relative",
  },
  namePokemon: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    color: "#000",
  },
  hpPokemon: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    color: "red",
  },
  imgHp: {
    width: 38,
    height: 33,
    marginTop: 20,
    marginRight: 5,
  },
  imgPokemon: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  cardElement: {
    backgroundColor: "rgba(78, 76, 76, 0.281)",
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 15,
    marginHorizontal: 5,
    marginVertical: 4,
  },
  cardAttack: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  //   wrapData: {
  //     zIndex: 2,
  //     backgroundColor: "#f5f5f5",
  //     borderTopLeftRadius: 30,
  //     borderTopRightRadius: 30,
  //     height: 900,
  //   },
});

export default DetailPokemon;
