import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Button, Card, FAB, Paragraph, Title } from "react-native-paper";
import UltReclamosScreen from "../reclamos/UltReclamosScreen";

const HomeScreen = ({ navigation, userInfo }) => {
  return (
    <View>
      <Card>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Content>
          <Title>Bienvenido, {userInfo.nombre}!</Title>
          <Paragraph>Tu perfil es {userInfo.tipo}! :)</Paragraph>
        </Card.Content>
      </Card>
      <UltReclamosScreen
        userInfo={userInfo}
        cantVisible={3}
        navigation={navigation}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Listado reclamos")}
      >
        Ver todos
      </Button>

      {/* Solo el usuario puede "Crear nuevo reclamo" */}
      {(userInfo.tipo === "USER") && (
        <FAB
          style={style.fab}
          label="Crear nuevo reclamo"
          icon="pencil-plus-outline"
          onPress={() => navigation.navigate("Crear reclamo")}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  fab: {
    position: "relative",
    margin: 20,
  },
});

export default HomeScreen;
