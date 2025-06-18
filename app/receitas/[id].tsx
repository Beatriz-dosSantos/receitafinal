import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { getRecipeById } from '../services/recipes';
import { Recipe } from '../types/recipe';

export default function DetalhesReceita() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetch = async () => {
      const data = await getRecipeById(id);
      setRecipe(data);
      setLoading(false);
    };

    fetch();
  }, [id]);

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{recipe.nome}</Text>

      {recipe.imagem && (
        <Image source={{ uri: recipe.imagem }} style={styles.image} />
      )}

      <Text style={styles.label}>Ingredientes:</Text>
      <Text style={styles.text}>{recipe.ingredientes}</Text>

      <Text style={styles.label}>Modo de Preparo:</Text>
      <Text style={styles.text}>{recipe.preparo}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push(`/receitas/editar/${id}`)}
      >
        <Text style={styles.editButtonText}>Editar Receita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
  },
  error: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: 'red',
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
