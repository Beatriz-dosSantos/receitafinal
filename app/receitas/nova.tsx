import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { addRecipe } from '../services/recipes';
import { uploadToCloudinary } from '../services/cloudinary';

export default function NovaReceita() {
  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [preparo, setPreparo] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const salvar = async () => {
    if (!nome || !ingredientes || !preparo) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      let imageUrl = '';
      if (imageUri) {
        imageUrl = await uploadToCloudinary(imageUri);
      }

      await addRecipe({
        nome,
        ingredientes,
        preparo,
        imagem: imageUrl,
      });

      Alert.alert('Sucesso', 'Receita salva com sucesso!');
      router.push('/(tabs)/');
    } catch (error) {
      console.error('Erro ao salvar receita:', error);
      Alert.alert('Erro', 'Não foi possível salvar a receita.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nova Receita</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da receita"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingredientes"
        value={ingredientes}
        onChangeText={setIngredientes}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Modo de preparo"
        value={preparo}
        onChangeText={setPreparo}
        multiline
      />

      <Button title="Selecionar imagem" onPress={pickImage} />

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={salvar}>
        <Text style={styles.saveButtonText}>Salvar Receita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 12,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
