"""
CivicOS - Urban Flood Intelligence & Early Warning Command Center
FastAPI Geospatial Backend
"""

import json
import os
from pathlib import Path
from typing import Dict, Any, Optional
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))

try:
    from backend.spatial_engine import SpatialEngine
    from backend.ai_planner import AIDispatchPlanner
except ImportError:
    from spatial_engine import SpatialEngine
    from ai_planner import AIDispatchPlanner

app = FastAPI(
    title="CivicOS Geospatial & Flood Intelligence API",
    version="2.4.0",
    description="Backend Spatial Intersection & Dispatch Planner for Hyderabad Urban Flood Operations"
)

# Enable CORS for local dev and frontend integrations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = Path(__file__).resolve().parent / "data"

def load_geojson(filename: str) -> Dict[str, Any]:
    file_path = DATA_DIR / filename
    if not file_path.exists():
        raise RuntimeError(f"Required GeoJSON fixture missing: {filename}")
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

# Global dataset cache
roads_data = load_geojson("hyderabad_roads.geojson")
facilities_data = load_geojson("hyderabad_facilities.geojson")
flood_masks_data = load_geojson("hyderabad_flood_masks.geojson")
sensors_data = load_geojson("hyderabad_sensors.geojson")
citizen_reports_data = load_geojson("hyderabad_citizen_reports.geojson")
sectors_data = load_geojson("hyderabad_sectors.geojson")
zones_data = load_geojson("hyderabad_zones.geojson")

spatial_engine = SpatialEngine(roads_data, facilities_data, flood_masks_data)
ai_planner = AIDispatchPlanner()

# Current simulation state in memory
current_state = {
    "step": 0,
    "precipitation_mm_hr": 0.0,
    "last_simulated_at": datetime.now(timezone.utc).isoformat(),
    "broadcast_history": []
}

class SimulateRequest(BaseModel):
    step: int = Field(..., ge=0, le=2, description="Simulation step: 0 (Normal), 1 (Cloudburst T+30m), 2 (SAR Satellite T+60m)")
    precipitation_mm_hr: Optional[float] = Field(None, description="Optional override precipitation rate")

class BroadcastRequest(BaseModel):
    step: int = Field(..., ge=0, le=2)
    message_text: str
    channels: list[str] = ["SMS", "WHATSAPP", "CIVICOS_PORTAL", "SIREN_GRID"]
    geofence_radius_km: float = 3.5

REGION_METADATA = {
    "chennai": {
        "sector": "Chennai Metropolitan Area (Ward 179 - Velachery & Saidapet)",
        "coordinates_center": [80.2707, 13.0827],
        "state": "Tamil Nadu",
        "risks": [14, 72, 96]
    },
    "kochi": {
        "sector": "Kochi & Ernakulam Metropolitan (Aluva Riverine Ward)",
        "coordinates_center": [76.2999, 9.9816],
        "state": "Kerala",
        "risks": [16, 75, 98]
    },
    "vijayawada": {
        "sector": "Vijayawada Metropolitan & Krishna Basin (Ward 42 - Ajit Singh Nagar)",
        "coordinates_center": [80.6480, 16.5062],
        "state": "Andhra Pradesh",
        "risks": [12, 78, 99]
    },
    "bengaluru": {
        "sector": "Bengaluru Urban (Ward 150 - Bellandur / Mahadevapura Corridor)",
        "coordinates_center": [77.6780, 12.9250],
        "state": "Karnataka",
        "risks": [15, 74, 97]
    }
}

@app.get("/api/status")
def get_system_status(region: Optional[str] = "chennai"):
    """Returns high-level system telemetry, radar status, and regional indicator."""
    step = current_state["step"]
    precip = current_state["precipitation_mm_hr"]
    if step == 0:
        status_label = "NORMAL_MONITORING"
        precip = 0.0
    elif step == 1:
        status_label = "CLOUDBURST_INFLUX"
        precip = 55.0 if precip == 0.0 else precip
    else:
        status_label = "SAR_SATELLITE_EMERGENCY"
        precip = 110.0 if precip == 0.0 else precip

    reg = REGION_METADATA.get((region or "chennai").lower(), REGION_METADATA["chennai"])
    risk_score = reg["risks"][step]

    return {
        "system": "CivicOS South India Disaster Operations Command",
        "sector": reg["sector"],
        "coordinates_center": reg["coordinates_center"],
        "status_badge": "SYSTEM LIVE // REGIONAL SATELLITE SYNCED",
        "scenario_step": step,
        "operational_state": status_label,
        "precipitation_mm_hr": precip,
        "satellite_feed": "Sentinel-1 SAR / ISRO RISAT-1A Multi-spectral Mask",
        "last_sync_timestamp": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC"),
        "ward_risk_index": risk_score
    }

@app.get("/api/layers")
def get_all_layers(step: Optional[int] = None):
    """
    Returns complete GeoJSON datasets:
    - Roads network
    - Critical Facilities (Hospitals, Metro, Malls)
    - Flood Masks (filtered by active step)
    - Drainage Sensors (with updated water levels for step)
    - Citizen Distress Reports
    - Dynamic Detour and Severed Corridor calculations
    """
    active_step = current_state["step"] if step is None else step

    # Filter flood masks for the active scenario step
    active_flood_features = []
    for f in flood_masks_data.get("features", []):
        f_step = f.get("properties", {}).get("scenario_step", 0)
        if f_step > 0 and f_step <= active_step:
            active_flood_features.append(f)
        elif f_step == 99: # SODA-A structural reference mask
            active_flood_features.append(f)

    active_flood_fc = {
        "type": "FeatureCollection",
        "name": "Active Remote Sensing Inundation Masks",
        "features": active_flood_features
    }

    # Update sensor features with the active step readings
    updated_sensor_features = []
    for s in sensors_data.get("features", []):
        props = dict(s["properties"])
        step_key = f"step{active_step}"
        reading = props.get(step_key, props.get("step0"))
        props["current_reading"] = reading
        props["depth_m"] = reading["depth_m"]
        props["level_pct"] = reading["level_pct"]
        props["status"] = reading["status"]
        props["flow_rate_lps"] = reading["flow_rate_lps"]
        updated_sensor_features.append({
            "type": "Feature",
            "id": s["id"],
            "properties": props,
            "geometry": s["geometry"]
        })

    sensors_fc = {
        "type": "FeatureCollection",
        "name": "Telemetry Drainage Sensors",
        "features": updated_sensor_features
    }

    # Process multi-sector infrastructure features with active step state
    updated_sector_features = []
    for s in sectors_data.get("features", []):
        props = dict(s["properties"])
        step_key = f"step{active_step}"
        step_state = props.get(step_key, props.get("step0", {}))
        for k, v in step_state.items():
            props[k] = v
        updated_sector_features.append({
            "type": "Feature",
            "id": s["id"],
            "properties": props,
            "geometry": s["geometry"]
        })

    sectors_fc = {
        "type": "FeatureCollection",
        "name": "Multi-Sector Critical Infrastructure",
        "features": updated_sector_features
    }

    # Spatial intersection analysis
    spatial_analysis = spatial_engine.analyze_intersections(active_step)

    # Filter citizen reports matching active step
    active_reports = [
        r for r in citizen_reports_data.get("features", [])
        if r.get("properties", {}).get("scenario_step", 0) <= active_step
    ]

    return {
        "scenario_step": active_step,
        "roads": spatial_analysis["roads_geojson"],
        "facilities": facilities_data,
        "sectors": sectors_fc,
        "zones": zones_data,
        "flood_masks": active_flood_fc,
        "sensors": sensors_fc,
        "detour_routes": spatial_analysis["detour_geojson"],
        "citizen_reports": {
            "type": "FeatureCollection",
            "features": active_reports
        },
        "spatial_summary": {
            "severed_roads": spatial_analysis["severed_roads"],
            "facilities_at_risk": spatial_analysis["facilities_at_risk"],
            "ward_14_risk_score": spatial_analysis["ward_14_risk_score"]
        }
    }

@app.post("/api/simulate-storm")
def simulate_storm(req: SimulateRequest):
    """
    Accepts simulation step:
    - 0: Normal Conditions
    - 1: Cloudburst Influx (T+30 min)
    - 2: SAR Satellite Detection (T+60 min)
    Updates sensor depths, inundation masks, and spatial intersection status.
    """
    current_state["step"] = req.step
    if req.precipitation_mm_hr is not None:
        current_state["precipitation_mm_hr"] = req.precipitation_mm_hr
    else:
        current_state["precipitation_mm_hr"] = 0.0 if req.step == 0 else (45.0 if req.step == 1 else 82.0)

    current_state["last_simulated_at"] = datetime.now(timezone.utc).isoformat()

    # Re-run spatial intersection
    analysis = spatial_engine.analyze_intersections(req.step)

    return {
        "message": f"Simulation step {req.step} applied successfully",
        "step": req.step,
        "step_name": ["Normal Conditions", "Cloudburst Influx (T+30 min)", "SAR Satellite Detection (T+60 min)"][req.step],
        "precipitation_mm_hr": current_state["precipitation_mm_hr"],
        "severed_corridors_count": analysis["severed_roads_count"],
        "facilities_at_risk_count": analysis["facilities_at_risk_count"],
        "ward_risk_score": analysis["ward_14_risk_score"],
        "analysis": analysis
    }

@app.post("/api/spatial-intersection")
def compute_spatial_intersection(payload: Dict[str, Any] = Body(default={})):
    """
    Computes topological intersections between satellite flood polygons
    and urban road arteries using Shapely.
    Returns categorized roads, submerged lengths, impacted facilities, and detour paths.
    """
    step = payload.get("step", current_state["step"])
    analysis = spatial_engine.analyze_intersections(step)
    return analysis

@app.post("/api/ai-dispatch")
def get_ai_dispatch(payload: Dict[str, Any] = Body(default={})):
    """
    Simulates or calls Vertex AI Gemini structured prompt that ingests disrupted roads
    and returns actionable municipal work orders, pump deployments, and citizen SMS copy.
    """
    step = payload.get("step", current_state["step"])
    precip = payload.get("precipitation_mm_hr", current_state["precipitation_mm_hr"])
    if precip == 0.0 and step > 0:
        precip = 45.0 if step == 1 else 82.0

    analysis = spatial_engine.analyze_intersections(step)

    plan = ai_planner.generate_dispatch_plan(
        step=step,
        severed_roads=analysis["severed_roads"],
        facilities_at_risk=analysis["facilities_at_risk"],
        sensor_alerts=[f for f in sensors_data.get("features", [])],
        precipitation_mm_hr=precip
    )

    return plan

@app.post("/api/alerts/broadcast")
def broadcast_geofenced_alerts(req: BroadcastRequest):
    """
    Simulates sending high-priority SMS and WhatsApp geofenced broadcast
    to citizens in the affected Hyderabad Central sector.
    """
    broadcast_id = f"BC-HYD-{int(datetime.now(timezone.utc).timestamp())}"
    recipients = 18500 if req.step == 1 else (52400 if req.step == 2 else 0)

    record = {
        "broadcast_id": broadcast_id,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "step": req.step,
        "channels": req.channels,
        "geofence_radius_km": req.geofence_radius_km,
        "recipients_delivered": recipients,
        "message_text": req.message_text,
        "delivery_rate_pct": 99.8,
        "status": "DELIVERED_TO_GATEWAY"
    }

    current_state["broadcast_history"].insert(0, record)

    return {
        "success": True,
        "broadcast_id": broadcast_id,
        "message": f"Successfully broadcast geofenced alert to {recipients:,} citizen endpoints across Ward 14 & 09",
        "record": record
    }

@app.get("/api/citizen-reports")
def get_citizen_reports(step: Optional[int] = None):
    """Returns geolocated citizen distress reports."""
    active_step = current_state["step"] if step is None else step
    active_reports = [
        r for r in citizen_reports_data.get("features", [])
        if r.get("properties", {}).get("scenario_step", 0) <= active_step
    ]
    return {
        "type": "FeatureCollection",
        "features": active_reports
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
