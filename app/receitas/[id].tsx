import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
} from 'react-native';
import { getRecipeById, deleteRecipe } from '../services/recipes';
import { Recipe } from '../types/recipe';

export default function RecipeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof id === 'string') {
      getRecipeById(id).then((data) => {
        setRecipe(data ?? null);
        setLoading(false);
      });
    }
  }, [id]);

  const handleDelete = () => {
    Alert.alert('Excluir Receita', 'Tem certeza que deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          if (typeof id === 'string') {
            await deleteRecipe(id);
            Alert.alert('Receita excluída');
            router.replace('/');
          }
        },
      },
    ]);
  };

  const handleEdit = () => {
    router.push({ pathname: '/receitas/editar', params: { id } });
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Receita não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>

      <Text style={styles.section}>Ingredientes:</Text>
      <Text style={styles.text}>{recipe.ingredients}</Text>

      <Text style={styles.section}>Modo de preparo:</Text>
      <Text style={styles.text}>{recipe.instructions}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Editar" onPress={handleEdit} />
        <View style={{ height: 12 }} />
        <Button title="Excluir" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  section: { fontSize: 16, fontWeight: '600', marginTop: 16 },
  text: { fontSize: 14, marginTop: 8 },
  error: { fontSize: 16, color: 'red', textAlign: 'center' },
  buttonContainer: {
    marginTop: 32,
  },
});
