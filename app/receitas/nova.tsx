import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { addRecipe } from '../services/recipes';

export default function NovaReceitaScreen() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !ingredients || !instructions) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      await addRecipe({ name, ingredients, instructions });
      Alert.alert('Sucesso', 'Receita adicionada!');
      router.replace('/'); // melhor para recarregar lista
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar a receita.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome da Receita:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Bolo de Chocolate"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Ingredientes:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        placeholder="Ex: 2 ovos, 1 xícara de açúcar..."
        value={ingredients}
        onChangeText={setIngredients}
      />

      <Text style={styles.label}>Modo de Preparo:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        placeholder="Ex: Misture tudo e asse por 40 minutos..."
        value={instructions}
        onChangeText={setInstructions}
      />

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 24 }} />
      ) : (
        <Button title="Salvar Receita" onPress={handleSubmit} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
