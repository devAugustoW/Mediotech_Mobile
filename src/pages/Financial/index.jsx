import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';



export default function Financial(){

	return(
		<View style={styles.container}>
			<Text>Página Financeiro</Text>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: 'lightblue',
	}
})	