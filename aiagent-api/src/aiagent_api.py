import logging
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from aiagent_service import AIAgentService
from prompt_processor import PromptProcessor
from fastapi import FastAPI, UploadFile, File, Form
import base64
logging.Logger.root.setLevel(logging.INFO)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


#is_stub_service = os.getenv("IS_STUB_SERVICE", "false").lower() == "true"
aiagent_service = AIAgentService()
#prompt_processor = PromptProcessor()

@app.get("/hello")
async def hello():
    return "Hello World!"

@app.post("/process-audio")
async def process_audio(audio_data: str = Form(...), mime_type: str = Form(...)):
    try:
        # Decode base64 audio
        audio_bytes = base64.b64decode(audio_data)

        # Save to temporary file (or process directly)
        temp_file = "temp_audio.m4a"  # or use the mime_type to determine extension
        with open(temp_file, "wb") as f:
            f.write(audio_bytes)

        # Here you would add your speech-to-text processing
        # For example using whisper, google speech-to-text, etc.
        transcribed_text = "This would be the text from your speech-to-text service"

        # Clean up
        os.remove(temp_file)

        return {"text": transcribed_text}
    except Exception as e:
        return {"error": str(e)}

@app.get("/ask-get")
async def ask_get(question: str):
    prompt = PromptProcessor().get_prompt(question)
    answer = aiagent_service.ask(prompt)
    return {"answer": answer}


@app.post("/ask")
async def ask_question(data: dict):
    question = data.get("question", "")
    #print(f"Question: {question}")
    #return {"answer": f"Got question: {question}"}
    prompt = PromptProcessor().get_prompt(question)
    answer = aiagent_service.ask(prompt)
    return {"answer": answer}

if __name__ == "__main__":
    import uvicorn
    keyfile = os.getenv("SSL_KEYFILE")
    certfile = os.getenv("SSL_CERTFILE")
    logging.info(f"ssl_keyfile: {keyfile}, ssl_certfile: {certfile}")
    uvicorn.run(app,
                host="0.0.0.0",
                port=os.getenv("PORT", 8000),
                #ssl_keyfile=os.getenv("SSL_KEYFILE"),
                #ssl_certfile=os.getenv("SSL_CERTFILE")
                )