import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Communications() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredCommunications, setFilteredCommunications] = useState([]);

  const communications = [
    {
      id: "1",
      text: "Atenção alunos! A feira de ciências será realizada na próxima sexta-feira. Todos os projetos devem ser entregues até quinta-feira à coordenação.",
      time: "1h atrás",
    },
    {
      id: "2",
      text: "Informamos que as aulas de Educação Física desta semana acontecerão no ginásio coberto devido à previsão de chuva.",
      time: "2h atrás",
    },
    {
      id: "3",
      text: "Lembramos que o prazo para entrega dos trabalhos de História sobre a Segunda Guerra Mundial termina nesta quarta-feira.",
      time: "3h atrás",
    },
    {
      id: "4",
      text: "A reunião de pais e mestres do 2º bimestre acontecerá no próximo sábado, dia 15, das 8h às 12h. É importante a presença de todos.",
      time: "4h atrás",
    },
    {
      id: "5",
      text: "As inscrições para o curso extracurricular de Robótica estão abertas. Vagas limitadas! Procure a secretaria para mais informações.",
      time: "5h atrás",
    },
    {
      id: "6",
      text: "Amanhã não haverá aula no período da tarde devido à reunião pedagógica dos professores. As aulas retornam normalmente na quinta-feira.",
      time: "6h atrás",
    },
    {
      id: "7",
      text: "Os horários das provas de recuperação do 1º bimestre já estão disponíveis no mural da escola e no portal do aluno.",
      time: "1d atrás",
    },
  ];

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = communications.filter((item) =>
      item.text.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCommunications(filtered);
  };

  const renderItem = ({ item }) => (
    <View style={styles.communicationItem}>
      <Text style={styles.communicationText}>{item.text}</Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );

  const handleOutsidePress = () => {
    if (isSearching) {
      setIsSearching(false);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Comunicados</Text>
        <View style={styles.headerIcons}>
          {!isSearching && (
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="filter" size={24} color="#333" />
            </TouchableOpacity>
          )}
          {isSearching ? (
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                value={searchText}
                onChangeText={handleSearch}
                placeholder="Pesquisar..."
                autoFocus
              />
              <TouchableOpacity
                onPress={() => {
                  setIsSearching(false);
                  setSearchText("");
                  setFilteredCommunications([]);
                }}
              >
                <Ionicons name="close" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.iconButton, styles.searchButton]}
              onPress={() => setIsSearching(true)}
            >
              <Ionicons name="search" size={24} color="#333" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={searchText ? filteredCommunications : communications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconButton: {
    padding: 8,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: "#E5E5E5",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 200,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 16,
  },
  communicationItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  communicationText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    lineHeight: 22,
  },
  timeText: {
    fontSize: 14,
    color: "#666",
  },
});