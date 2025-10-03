import logging
import os


class PromptProcessor:

    def  __init__(self):
        self._prompt_prefix = os.getenv("PROMPT_PREFIX","")
        self._prompt_suffix = os.getenv("PROMPT_SUFFIX","")
        logging.info("PromptProcessor initialized with prefix: %s and suffix: %s", self._prompt_prefix, self._prompt_suffix)

    def get_prompt(self, initial_prompt: str):
        final_prompt = self._prompt_prefix + initial_prompt + self._prompt_suffix
        return final_prompt
