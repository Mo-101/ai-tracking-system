from fastapi import FastAPI, HTTPException, Depends, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from pydantic import BaseModel
import os
import requests
import logging
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import json
from fastapi.exceptions import WebSocketDisconnect

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase client
supabase: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

# DeepSeek LLM client
DEEPSEEK_URL = f"http://localhost:{os.getenv('DEEPSEEK_PORT', '5005')}"

class AIRequest(BaseModel):
    prompt: str

async def verify_token(token: str = Depends(lambda x: x.headers.get("Authorization"))):
    if not token:
        raise HTTPException(status_code=401, detail="No token provided")
    try:
        user = supabase.auth.get_user(token)
        return user
    except Exception as e:
        logger.error(f"Token verification failed: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/ai/generate")
@limiter.limit("10/minute")
async def generate_ai_response(request: AIRequest, user: dict = Depends(verify_token)):
    try:
        response = requests.post(f"{DEEPSEEK_URL}/generate", json={"prompt": request.prompt})
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Error communicating with DeepSeek LLM")
        
        ai_response = response.json()["response"]
        
        # Log the request and response
        log_entry = {
            "user_id": user["id"],
            "prompt": request.prompt,
            "response": ai_response,
            "timestamp": "NOW()"
        }
        supabase.table("ai_logs").insert(log_entry).execute()
        
        logger.info(f"AI request processed for user {user['id']}")
        return {"result": ai_response}
    except Exception as e:
        logger.error(f"Error processing AI request: {str(e)}")
        raise HTTPException(status_code=500, detail="Error processing AI request")

@app.get("/metrics/system")
async def get_system_metrics(user: dict = Depends(verify_token)):
    try:
        result = supabase.table("system_metrics").select("*").order("timestamp", desc=True).limit(100).execute()
        return {"metrics": result.data}
    except Exception as e:
        logger.error(f"Error fetching system metrics: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching system metrics")

@app.websocket("/ws/tracking")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            # Process the received tracking data
            tracking_data = json.loads(data)
            # Store in Supabase
            supabase.table("mastomys_observations").insert(tracking_data).execute()
            # Send confirmation back to client
            await websocket.send_text(f"Received: {data}")
    except WebSocketDisconnect:
        print("WebSocket disconnected")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

