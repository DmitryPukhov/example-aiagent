import logging
import os
from openai import OpenAI


class StubService:
    def __init__(self):
        logging.info(f"Created stub service with stub answers for test")

    def ask(self, prompt: str):
        return  f"Test answer for question: {prompt}"
