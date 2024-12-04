import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import userImg from "../../assets/user-img.png";
import Cards from "../../components/cards";

export default function Home() {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUserName = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        if (name) {
          setUserName(name);
        }
      } catch (error) {
        console.error("Failed to retrieve userName:", error);
      }
    };
    getUserName();
  }, []);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  const cardData = [
    { iconName: "people", label: "Minha turma", screenName: "MyClass" },
    { iconName: "chatbubbles", label: "Comunicados", screenName: "Comunications" },
    { iconName: "call", label: "Contatos", screenName: "Contacts" },
    { iconName: "cash", label: "Financeiro", screenName: "Financial" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Olá, {userName}!</Text>
        <TouchableOpacity
          style={styles.profileIconContainer}
          onPress={toggleExpanded}
        >
          <Image
            source={userImg}
            style={styles.profileIcon}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {expanded && (
          <View style={styles.optionsContainer}>
            <View style={styles.option}>
              <Ionicons name="camera-outline" size={20} color="black" />
              <Text style={styles.optionText}>Alterar foto</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.option}>
              <Ionicons name="shield-half-outline" size={20} color="black" />
              <Text style={styles.optionText}>Alterar senha</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.option}>
              <Ionicons name="log-out-outline" size={20} color="black" />
              <Text style={styles.optionText}>Sair</Text>
            </View>
						
            <View style={styles.separator} />
          </View>
        )}
      </View>

      <View style={styles.gridContainer}>
        {cardData.map((card, index) => (
          <View key={index} style={styles.cardWrapper}>
            <Cards
              iconName={card.iconName}
              label={card.label}
              onPress={() => handleNavigation(card.screenName)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    marginTop: 30,
  },
  greetingContainer: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    width: "98%",
    marginVertical: 10,
    borderRadius: 30,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    position: "absolute",
    right: 15,
    top: 15,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  gridContainer: {
		width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
		columnGap: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  cardWrapper: {
    width: "45%", 
    margin: 5,
    alignItems: "center",
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
