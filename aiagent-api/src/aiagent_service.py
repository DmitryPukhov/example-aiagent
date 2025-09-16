import logging
import os
from openai import OpenAI


class AIAgentService:
    def __init__(self):
        self.api_key = os.environ["OPENAI_API_KEY"]

        # Any free model for test
        # available models are here
        # https://openrouter.ai/api/v1/models
        #self.model = "openrouter/horizon-beta"
        self.model = os.environ["OPENAI_MODEL"]

        logging.info(f"Created AIAgentService with model: {self.model} and API key: ***{self.api_key[-3:]}")

    def ask(self, prompt: str):
        with OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=self.api_key
        )  as client:

            response = client.chat.completions.create(
                model=self.model,  # For DeepSeek-V3 :cite[1]
                messages=[{"role": "user", "content": prompt.strip()}]
            )
            answer = response.choices[0].message.content
            return answer
