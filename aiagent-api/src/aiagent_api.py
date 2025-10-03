import logging
import os
from typing import Annotated

from fastapi import Depends, HTTPException, status, Header
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from aiagent_service import AIAgentService
from prompt_processor import PromptProcessor

logging.Logger.root.setLevel(logging.INFO)

################################################
# Fast api app
################################################

API_TOKEN = os.getenv("API_TOKEN", None)
DEV_MODE = os.getenv("DEV_MODE", "False").lower() == "true"

# FastAPI with swagger or not
app = FastAPI() if DEV_MODE else FastAPI(docs_url=None, redoc_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def verify_token(x_api_token: Annotated[str, Header()]):
    """ Custom security token check"""

    logging.info(f"Checking credentials")
    """ Check dev token for simple security """
    if x_api_token != API_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    logging.info(f"Credentials are good")
    return x_api_token

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
    port = int(os.getenv("PORT", 8000))
    logging.info(f"Secured with API Token: ***{API_TOKEN[-3:]}")
    uvicorn.run(app,
                host="0.0.0.0",
                port=port)
