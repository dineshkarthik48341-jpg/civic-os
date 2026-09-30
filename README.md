# CivicOS - Urban Flood Intelligence & Early Warning Command Center
### Hyderabad Sector Operations (Ward 14 & 09)

CivicOS is a production-grade, interactive single-page Civic Command Center web application and Python FastAPI spatial backend engineered for urban flood disaster management, telemetry monitoring, dynamic rerouting, and geofenced emergency alerting.

---

## 🏛️ System Architecture

```
                    ┌──────────────────────────────────────────────┐
                    │      CivicOS Mission Control Dashboard       │
                    │      React 18 + Vite + Tailwind + Leaflet    │
                    └──────────────────────┬───────────────────────┘
                                           │
                        HTTP REST / GeoJSON Streams
                                           │
                    ┌──────────────────────▼───────────────────────┐
                    │        FastAPI Geospatial Backend            │
                    │        (Port 8000 // 127.0.0.1)              │
                    └──────┬───────────────┬───────────────┬───────┘
                           │               │               │
            ┌──────────────▼─────┐  ┌──────▼────────┐  ┌───▼───────────────┐
            │   Spatial Engine   │  │ AI Dispatch   │  │ Telemetry & IoT   │
            │   (Shapely 2.1)    │  │ (Vertex AI /  │  │ (Simulated Drains │
            │   ST_Intersects    │  │  Gemini Pro)  │  │  & Citizen SOS)   │
            └────────────────────┘  └───────────────┘  └───────────────────┘
```

---

## 🚀 Features

### 1. High-Contrast Dark Operations Center (3-Column Layout)
- **Top Navigation Bar:**
  - Branding: `CivicOS // Disaster Operations Command - Hyderabad Sector`
  - Real-time Status Badge: `SYSTEM LIVE // SATELLITE SYNCED`
  - Live Radar Precipitation Gauge (0 mm/hr -> 45 mm/hr -> 82 mm/hr EXTREME).
  - Indian Standard Time (IST) live clock, Ward Selector, Distress SOS queue counter.
- **Column 1: Left Control Sidebar (`width: 320px`):**
  - **Scenario Progression Controller:**
    - `Step 0: Normal Conditions` (Clear roads, drain levels < 35%, 0 alerts).
    - `Step 1: Cloudburst Influx (T + 30 min)` (Drains > 80%, localized ponding, citizen distress spiking).
    - `Step 2: SAR Satellite Detection (T + 60 min)` (Synthetic dual-pol SAR flood extent, underpass cuts hospital access).
    - One-Click `[Simulate Cloudburst]` action trigger.
  - **Layer Visibility Toggles:**
    - `[x] Satellite SAR Inundation Mask` (Cyan/Red semi-transparent pulsing polygons)
    - `[x] Road Artery Network & Severed Corridors`
    - `[x] Critical Infrastructure Nodes` (Hospitals, Metro, Gathering Hubs)
    - `[x] Telemetry Drainage Sensors`
    - `[x] Evacuation & Ambulance Routes`
  - **Real-Time IoT Drainage Telemetry Feed:** Ultrasonic & hydrostatic level gauges showing water depth (meters), % full, and flow velocity (L/s).
- **Column 2: Center Interactive Map (`flex-1`):**
  - Leaflet Map with CartoDB Dark Matter tile layer.
  - Red/Cyan pulsing flood polygon based on synthetic dual-pol Sentinel-1 / SatEdit representations.
  - **Custom High-Contrast Pins:**
    - 🟢 Green Cross = Hospitals (NIMS Level 1 Apex Trauma, Osmania General Hospital, Care Hospitals Banjara, Gandhi Hospital, Medicover Saifabad).
    - 🟣 Purple Diamond = Metro Stations (Lakdikapul, Khairatabad, MGBS Interchange, Ameerpet, Assembly).
    - 🟠 Orange Star = Commercial Gathering Hubs / Malls (City Centre Mall, Next Galleria, GVK One, Mozamjahi Market).
    - 🔵 IoT Telemetry Sluice Nodes with live percentage badges.
  - **Emergency Corridors:**
    - **Dashed Red Line:** Original obstructed transit corridor passing directly through the submerged zone (`0.85m` water hazard).
    - **Solid Neon Green Glowing Line:** Dynamically computed safe detour corridor (Elevated Masab Tank - Road 1 Banjara - Punjagutta High-Ridge Bypass) routing ambulances safely to NIMS Gate 2.
  - **Interactive Feature Inspector:** Clicking any map feature opens an inspector with Entity Name, Inundation Depth, Access Status (`SEVERED`), and Impacted Facility.
- **Column 3: Right Action & Dispatch Hub (`width: 380px`):**
  - **Ward Risk Index:** Prominent radial gauge displaying `Ward 14 (Central): CRITICAL RISK (92%)`.
  - **Critical Facilities at Risk:** Real-time badge list of institutions requiring immediate evacuation or rerouting.
  - **AI Decision Engine (Vertex AI / Gemini Dispatch Planner):**
    - Executive Incident Summary.
    - Automated Dewatering Work Orders (e.g., `Deploy 1200-GPM mobile pump unit to Drain #14-B`, `Deploy 2x 1500-GPM dewatering tractor pumps`).
    - Interactive `[DISPATCH]` buttons with real-time status updates.
  - **Automated Citizen Mobile Alert Preview (SMS & WhatsApp):**
    - Mobile notification card preview in English and Telugu.
    - Interactive `[Approve & Broadcast Geofenced Alerts]` action button.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 5, Tailwind CSS, Leaflet, Lucide Icons, Web Audio API |
| **Backend** | Python 3.12, FastAPI, Uvicorn, Pydantic 2.0 |
| **Spatial Engine** | Shapely 2.1 (Topological Intersections, Buffering, Vector Detour Routing) |
| **AI Planner** | Structured Gemini / Vertex AI Decision Engine Simulation |
| **Data Fixtures** | High-fidelity GeoJSON for Hyderabad Urban Area (`17.3850° N, 78.4867° E`) |

---

## 🏃 Quick Start Guide

### 1. Start the FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
API Documentation will be accessible at: `http://127.0.0.1:8000/docs`

### 2. Start the Frontend Application
```bash
cd frontend
npm install
npm run dev
```
Open your browser at: `http://localhost:5173/`

---

## 📡 Key API Endpoints

- `GET /api/status`: Real-time system state, precipitation rate, and satellite synchronization.
- `GET /api/layers?step={0|1|2}`: Complete GeoJSON layers for roads, facilities, flood masks, and sensors.
- `POST /api/simulate-storm`: Accepts scenario step (0, 1, 2) and updates hydraulic depths.
- `POST /api/spatial-intersection`: Executes `ST_Intersects` between remote sensing flood masks and roads, identifying severed segments.
- `POST /api/ai-dispatch`: Generates structured municipal emergency work orders and citizen SMS/WhatsApp copy.
- `POST /api/alerts/broadcast`: Dispatches geofenced alerts to citizen mobile gateways.
- `GET /api/citizen-reports`: Retrieves incoming 112/GHMC citizen emergency distress calls.
