from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Dict
from supabase import Client
from .main import verify_token, supabase
from .ai_service import generate_response

router = APIRouter()

class TrackingData(BaseModel):
    latitude: float
    longitude: float
    timestamp: str
    image_url: str

@router.post("/tracking/upload")
async def upload_tracking_data(data: TrackingData, user: Dict = Depends(verify_token)):
    try:
        tracking_entry = {
            "location": f"POINT({data.longitude} {data.latitude})",
            "timestamp": data.timestamp,
            "image_url": data.image_url,
            "user_id": user["id"]
        }
        result = supabase.table("mastomys_observations").insert(tracking_entry).execute()
        
        # Calculate habitat impact score
        impact_prompt = f"Analyze the habitat impact of Mastomys Natalensis at coordinates {data.latitude}, {data.longitude}."
        impact_score = generate_response(impact_prompt)
        
        return {"message": "Data uploaded successfully", "impact_score": impact_score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/tracking/heatmap")
async def get_heatmap_data(user: Dict = Depends(verify_token)):
    try:
        result = supabase.table("mastomys_observations").select("location, timestamp").execute()
        return {"heatmap_data": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Add this router to the main FastAPI app
# In app/main.py:
# from .tracking import router as tracking_router
# app.include_router(tracking_router)

