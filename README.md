# 🚕 Taxímetro Digital - Micro Frontend #1

![Status](https://img.shields.io/badge/Status-Desplegado-success?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-FastAPI%20%7C%20React%20%7C%20Docker-blue?style=for-the-badge)
![Expert](https://img.shields.io/badge/Level-Expert%20(In%20Progress)-orange?style=for-the-badge)

Este proyecto consiste en un **Taxímetro Digital** de última generación, diseñado bajo una arquitectura de microservicios y microfrontends. Es la primera entrega del itinerario de formación en **Factoría 5 (Promoción 7)**.

## 🚀 Vista General

El sistema permite gestionar trayectos de taxi en tiempo real, calculando tarifas dinámicas basadas en el estado del vehículo (parado o en movimiento). Está desplegado en una instancia **AWS EC2** mediante un pipeline automatizado de **CI/CD**.

### 🛠️ Tech Stack

**Backend:**
- **Python 3.11** con **FastAPI**.
- **Pydantic** para validación de esquemas.
- **Uvicorn** como servidor ASGI.

**Frontend:**
- **React 18** con **TypeScript**.
- **Vite** + **Module Federation** (Arquitectura MFE).
- **Tailwind CSS** para un diseño *Premium Dark Mode*.
- **TanStack Query (React Query)** para el manejo de estado asíncrono y polling.

**DevOps & Cloud:**
- **Docker & Docker Compose** para containerización.
- **GitHub Actions** para despliegue continuo (CI/CD).
- **Nginx** como servidor de archivos estáticos para el frontend.
- **AWS (EC2)** como proveedor de infraestructura.

## 🏗️ Arquitectura del Proyecto

El proyecto está organizado en un **Monorepo** con la siguiente estructura:

- `/backend`: API REST en FastAPI que gestiona la lógica del taxímetro y los estados del viaje.
- `/frontend`: Micro Frontend independiente construido con React, preparado para ser consumido por un Shell/Host.

## ⚙️ Configuración y Despliegue

### Variables de Entorno
El proyecto requiere las siguientes variables configuradas en archivos `.env` o en GitHub Secrets:

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL pública de la API del Backend (puerto 8002). |
| `DATABASE_URL` | String de conexión a PostgreSQL. |
| `TARIFA_PARADO` | Coste por segundo en reposo (0.02€). |
| `TARIFA_MOVIMIENTO` | Coste por segundo en marcha (0.05€). |

### Despliegue con Docker
Para levantar el entorno local completo:
```bash
docker-compose up --build
```

## 🚀 Entornos Desplegados (En Vivo)

El ecosistema está desplegado en AWS (EC2) utilizando contenedores Docker. A continuación se encuentran los enlaces de acceso a las diferentes piezas de la arquitectura:

### 🏢 Factoría Core (Host Principal)
- **Frontend (App Shell / Workspace):** [http://34.235.130.33:3003/login](http://34.235.130.33:3003/login)
  - *Nota:* Desde el Workspace se inyecta dinámicamente el Microfrontend del Taxímetro.
- **Backend API (C# .NET 8/10) - Swagger UI:** [http://34.235.130.33:5073/swagger/index.html](http://34.235.130.33:5073/swagger/index.html)

### 🚕 Módulo Taxímetro (Microfrontend)
- **Frontend Standalone (MFE):** [http://34.235.130.33:3002](http://34.235.130.33:3002)
- **Backend API (Python) - *En desarrollo*:** [http://34.235.130.33:8002/docs](http://34.235.130.33:8002/docs)