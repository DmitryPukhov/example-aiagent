import axios from 'axios';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Paragraph,
  Snackbar,
  Text,
  TextInput,
  Title
} from 'react-native-paper';


import { useNavigation } from '@react-navigation/native';


// Back end api
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

// Question/answer entity
interface QAPair {
  question: string;
  answer: string;
  id: number;
}

export default function QuestionPage() {
  const navigation = useNavigation();  
  const [question, setQuestion] = useState('');
  const [qaHistory, setQaHistory] = useState<QAPair[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [nextId, setNextId] = useState(1);

  const handleSubmit = async () => {
    if (!question.trim()) {
      setError("S'il vous plaît poser une question");
      setVisibleSnackbar(true);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_URL}/ask`, {
        question: question
      });
      
      // Add new Q&A pair to history
      const newPair = {
        question: question,
        answer: response.data.answer,
        id: nextId
      };
      
      setQaHistory(prev => [newPair, ...prev]); // Newest first
      setNextId(nextId + 1);
      setQuestion(''); // Clear input after submission
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'obtention d'une réponse");
      setVisibleSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>poser une question</Title>
          
          <TextInput
            mode="outlined"
            label="Votre question..."
            value={question}
            onChangeText={setQuestion}
            multiline
            numberOfLines={3}
            style={styles.input}
            onSubmitEditing={handleSubmit}
          />

          <Button 
            mode="contained" 
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'processing...' : 'Obtenir une réponse'}
          </Button>
        </Card.Content>
      </Card>

      <ScrollView style={styles.historyContainer}>
{qaHistory.map(item => (
        <Card key={item.id} style={styles.qaCard}>
          <Card.Content>
            <Paragraph style={styles.questionText}>
              <Text style={styles.bold}>Q:</Text> {item.question}
            </Paragraph>
            <Paragraph style={styles.answerText}>
              <Text style={styles.bold}>A:</Text> {item.answer}
            </Paragraph>
          </Card.Content>
        </Card>
      ))}
      </ScrollView>

      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        action={{
          label: 'OK',
          onPress: () => setVisibleSnackbar(false),
        }}
      >
        {error || "quelque chose s'est mal passé"}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  historyContainer: {
    flex: 1,
    marginTop: 8,
  },
  qaCard: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  answerText: {
    fontSize: 16,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
  },
});