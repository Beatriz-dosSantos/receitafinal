import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Recipe } from '../types/recipe';
import { useRouter } from "expo-router";

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/receitas/${recipe.id}`)}
    >
      <Text style={styles.title}>{recipe.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f1f1f1",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
