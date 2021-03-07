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
  Alert,
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
import { fn_findEvo } from "./fn_findEvo";
const idd = 550;
{
  /* <Ionicons name="thumbs-up" style={myStyles.iconCircle} /> */
}
const DetailPokemon = () => {
  const [urlEvo, seturlEvo] = useState(null);
  const [evolutionSpecie, setevolutionSpecie] = useState(null);
  const [dataSpecie, setdataSpecie] = useState(null);
  const [dataEvo, setdataEvo] = useState(null);
  const [dataPokemon, setdataPokemon] = useState(null);
  const [colorBgPokemon, setcolorBgPokemon] = useState("red");
  const [modalVisible, setModalVisible] = useState(false);
  const [isOpenModal, setisOpenModal] = useState(false);
  const [selectedPokemon, setselectedPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${idd}`)
      .then((res) => {
        setdataSpecie(res.data);
        seturlEvo(res.data.evolution_chain.url);
        callDataEvo(res.data.evolution_chain.url);
        setcolorBgPokemon(res.data.color.name);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${idd}`)
      .then((res) => {
        setdataPokemon(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const callDataEvo = async (url) => {
    // Alert.alert(id);
    await axios
      .get(`${url}`)
      .then((res) => {
        setevolutionSpecie(fn_findEvo(res.data));
        setdataEvo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal = () => {
    setisOpenModal(false);
  };

  const seperateStats = (typee) => {
    const data = dataPokemon.stats.filter((item, index) => {
      return item.stat.name == typee;
    });
    // console.log(data);
    return data[0].base_stat;
  };

  return (
    <LinearGradient
      colors={["#fff", "#f5f5f5", "#f5f5f5", colorBgPokemon]}
      style={myStyles.viewContainer}
    >
      {dataPokemon && dataSpecie ? (
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
                uri: `https://pokeres.bastionbot.org/images/pokemon/${idd}.png`,
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
              Evolutions {evolutionSpecie && evolutionSpecie.length} SPECIES
            </Text>
            {evolutionSpecie && evolutionSpecie.length != 1 ? (
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={evolutionSpecie}
                keyExtractor={(result) => result.id}
                renderItem={({ item, index }) => {
                  return (
                    <LinearGradient
                      colors={["#fff", colorBgPokemon]}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: 395,
                        marginRight: 10,
                        marginLeft: 8,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        justifyContent: "space-around",
                        marginTop: 8,
                        marginBottom: 25,
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
                          uri: `https://pokeres.bastionbot.org/images/pokemon/${item.id}.png`,
                        }}
                        style={{ width: 95, height: 95 }}
                      ></Image>
                      <View
                        style={{ display: "flex", justifyContent: "center" }}
                      >
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
                              colorBgPokemon == "white" ||
                              colorBgPokemon == "orange" ||
                              colorBgPokemon == "gold"
                                ? "#888a8bb4"
                                : "#fff"
                            }`,
                          }}
                        >
                          {item.species_name.toUpperCase()}
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,

                            color: `${
                              colorBgPokemon == "yellow" ||
                              colorBgPokemon == "white" ||
                              colorBgPokemon == "orange" ||
                              colorBgPokemon == "gold"
                                ? "#888a8bb4"
                                : "#e4e6e5"
                            }`,
                            letterSpacing: 1,
                          }}
                        >
                          SPECIE {index + 1}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setselectedPokemon({
                              name: item.species_name,
                              image: `https://pokeres.bastionbot.org/images/pokemon/${item.id}.png`,
                              level: item.min_level,
                            });
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
                              // marginBottom: 20,
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
            ) : (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingHorizontal: 15,
                  borderRadius: 10,
                  marginBottom: 15,
                }}
              >
                <View style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    style={{ width: 160, height: 160, opacity: 0.5, top: -10 }}
                    source={{
                      uri:
                        "https://cdn.iconscout.com/icon/free/png-256/pokemon-go-2288554-1933799.png",
                    }}
                  ></Image>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: `${
                        colorBgPokemon == "yellow" ||
                        colorBgPokemon == "white" ||
                        colorBgPokemon == "orange" ||
                        colorBgPokemon == "gold"
                          ? "rgba(0,0,0,0.4)"
                          : "#fff"
                      }`,
                      top: -35,
                    }}
                  >
                    NO EVOLUTIONs specie
                  </Text>
                </View>
              </View>
            )}
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
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <Image
            style={{ width: 120, height: 120 }}
            source={{
              uri:
                "https://cdn.dribbble.com/users/217998/screenshots/2446541/pokemon-rewind.gif",
            }}
          ></Image>
          <Text
            style={{
              marginTop: 15,
              fontSize: 15,
              top: -15,
              fontWeight: "bold",
              color: "red",
            }}
          >
            ...POKEMON loading...
          </Text>
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
