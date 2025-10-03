import axios from 'axios';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
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

import { styles } from '@/app/styles/global_styles';

// Back end api
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';
console.log('API_URL:', API_URL);
const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN || '';


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

  ////////////////////////////////////////
  // On submit
  ////////////////////////////////////////
  const handleSubmit = async () => {

    if (!question.trim()) {
      // Empty question, ask user to enter something and return
      setError("S'il vous plaît poser une question");
      setVisibleSnackbar(true);
      return;
    }

    setLoading(true);
    setError('');
    
    try {

      // Send question to backend
      const response = await axios.post(`${API_URL}/ask`, {
        question: question
      }, {
        headers: {
          'x-api-token': `${API_TOKEN}`
        }
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
      setError(err.response?.data?.message || "Erreur " + err.response.status + " lors de l'obtention d'une réponse");
      setVisibleSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  ////////////////////////////////////////
  // Render
  ////////////////////////////////////////

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
};
