class PromptProcessor:

    def get_prompt(self, initial_prompt: str):
        prefix = "You are a car mechanic. Please answer the following question and give more technical details: "
        final_prompt = prefix + initial_prompt
        return final_prompt
