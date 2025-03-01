import requests
import json
import asyncio
import logging
from typing import Dict, Any
from datetime import datetime
from fastapi import HTTPException
from supabase import create_client, Client

# 🔹 DeepSeek LLM API Configuration
AI_API_URL = "http://172.23.192.1:1234/v1/completions"  # Ensure the LLM is running
MODEL_NAME = "deepseek-r1-distill-qwen-7b"
TIMEOUT = 10  # Timeout in seconds for API requests

# 🔹 Supabase Configuration
SUPABASE_URL = "https://your-supabase-url.supabase.co"
SUPABASE_KEY = "your-supabase-key"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# 🔹 Logger Setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 🔹 Cache to Store Frequent Queries (Reduce API Calls)
CACHE = {}


async def generate_text(prompt: str, max_tokens: int = 50) -> Dict[str, Any]:
    """
    Sends a request to DeepSeek LLM to generate text based on the given prompt.
    
    Args:
        prompt (str): The text prompt for the LLM.
        max_tokens (int): Maximum number of tokens for the response.
    
    Returns:
        Dict[str, Any]: Response from the LLM.
    """
    # 🔹 Check Cache First (Avoid Unnecessary Calls)
    if prompt in CACHE:
        logger.info(f"Cache hit for prompt: {prompt}")
        return CACHE[prompt]

    # 🔹 Prepare Request Payload
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "max_tokens": max_tokens
    }

    try:
        # 🔹 Send API Request to DeepSeek LLM
        response = requests.post(AI_API_URL, json=payload, timeout=TIMEOUT)

        # 🔹 Raise Exception if API Fails
        response.raise_for_status()

        # 🔹 Parse Response
        result = response.json()

        # 🔹 Store in Cache (Reduce API Load)
        CACHE[prompt] = result

        # 🔹 Log Interaction in Supabase
        await log_interaction(prompt, result)

        return result

    except requests.Timeout:
        logger.error("DeepSeek API request timed out.")
        raise HTTPException(status_code=504, detail="DeepSeek API request timed out.")

    except requests.RequestException as e:
        logger.error(f"DeepSeek API request failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Error communicating with DeepSeek LLM.")

    
async def log_interaction(prompt: str, response: Dict[str, Any]) -> None:
    """
    Logs AI interactions into Supabase database.
    
    Args:
        prompt (str): User's query.
        response (Dict[str, Any]): AI-generated response.
    
    Returns:
        None
    """
    log_entry = {
        "id": str(datetime.utcnow().timestamp()),  # Unique ID using timestamp
        "prompt": prompt,
        "response": json.dumps(response),
        "timestamp": datetime.utcnow().isoformat()
    }

    try:
        # 🔹 Insert Log into Supabase Database
        supabase.table("ai_logs").insert(log_entry).execute()
        logger.info("Interaction logged successfully.")

    except Exception as e:
        logger.error(f"Failed to log AI interaction: {str(e)}")


if __name__ == "__main__":
    # 🔹 Run Test Query
    test_prompt = "What is the capital of France?"
    asyncio.run(generate_text(test_prompt))
