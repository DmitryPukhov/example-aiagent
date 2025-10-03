import logging
import os

from fastapi import Depends, HTTPException, status
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from aiagent_service import AIAgentService
from prompt_processor import PromptProcessor

logging.Logger.root.setLevel(logging.INFO)

################################################
# Fast api app
################################################

API_TOKEN = os.getenv("API_TOKEN", None)
DEV_MODE = os.getenv("DEV_MODE", "False").lower() == "true"
app = FastAPI() if DEV_MODE else FastAPI(docs_url=None, redoc_url=None)
security = HTTPBearer()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """ Check dev token for simple security """
    if credentials.credentials != API_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return credentials.credentials

################################################
# Fast api endpoints
################################################

aiagent_service = AIAgentService()

@app.post("/ask")
async def ask_question(data: dict, token: str = Depends(verify_token)):
    question = data.get("question", "")
    logging.info(f"Question: {question}")
    prompt = PromptProcessor().get_prompt(question)
    answer = aiagent_service.ask(prompt)
    logging.info(f"Answer: {answer}")
    return {"answer": answer}

if __name__ == "__main__":
    import uvicorn
    logging.info(f"Secured with API Token: ***{API_TOKEN[-3:]}")
    uvicorn.run(app,
                host="0.0.0.0",
                port=os.getenv("PORT", 8000))
