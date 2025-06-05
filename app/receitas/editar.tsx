import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, Alert, StyleSheet, ScrollView,
} from 'react-native';
import { getRecipeById, updateRecipe } from '../services/recipes';
import { Recipe } from '../types/recipe';

export default function EditarReceitaScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (typeof id === 'string') {
      getRecipeById(id).then((recipe) => {
        if (recipe) {
          setName(recipe.name);
          setIngredients(recipe.ingredients);
          setInstructions(recipe.instructions);
        }
      });
    }
  }, [id]);

  const handleUpdate = async () => {
    if (!name || !ingredients || !instructions) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await updateRecipe(id as string, { name, ingredients, instructions });
      Alert.alert('Sucesso', 'Receita atualizada!');
      router.replace('/');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar a receita.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Ingredientes:</Text>
      <TextInput style={styles.input} value={ingredients} onChangeText={setIngredients} multiline />

      <Text style={styles.label}>Modo de Preparo:</Text>
      <TextInput style={styles.input} value={instructions} onChangeText={setInstructions} multiline />

      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginTop: 16, fontWeight: 'bold' },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
  },
});
