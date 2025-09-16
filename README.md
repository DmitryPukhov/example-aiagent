# AI agent prototype

**Front end**: react native app android/ios/web
**Back end**: python fastapi

**Use case**: user asks a question in mobile app, mobile app sends the prompt to python fastapi service. Python service adds additional instructions to the prompt and gets an answer from external AI model. The answer from the model comes back to the user of mobile app.


This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started


- Set up env file
   create aiagent-api/.env file with settings:
   OPENAI_API_KEY=<my api key from https://openrouter.ai/>

- Start api 
   ``` bash
   cd aiagent_api
   python -m aiagent_api.py

   ```

- Start react native UI for development

   ```bash
   cd aiagent-gui
   npx expo start
   ```
- Open web http://localhost:8081/ in browser, ask questions, get answers from AI
- In terminal where npx expo start is running, press s to choose Expo Go mode, choose Android or IOS device or similator.



