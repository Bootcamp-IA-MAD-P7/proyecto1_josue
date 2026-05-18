import os
from dotenv import load_dotenv

load_dotenv(".env") 

TARIFA_PARADO = float(os.getenv("TARIFA_PARADO", "0.02"))
TARIFA_MOVIMIENTO = float(os.getenv("TARIFA_MOVIMIENTO", "0.05"))
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:admin_password@34.235.130.33:5432/factoria_proyectos")
CORE_API_URL = os.getenv("CORE_API_URL", "http://localhost:8001")