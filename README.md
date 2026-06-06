# 💰 AhorroPro (Sobreahorro)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express_5-404D59?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/TiDB_Cloud-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

**AhorroPro** es una aplicación web full-stack de finanzas personales basada en la probada metodología de los sobres (*envelope budgeting*). Diseñada como MVP para el tecnólogo en ADSO (SENA), la plataforma permite a los usuarios gestionar su capital, proyectar metas mensuales y mantenerse motivados a través de un sistema gamificado de insignias y logros.

---
Disponible beta en el siguiente enlace : https://ahorro-pro-beta.vercel.app/

## 🚀 Arquitectura y Despliegue (Monorepo)

El proyecto emplea una arquitectura moderna desacoplada, desplegada en la nube con un enfoque *Serverless* y comunicación segura mediante **JWT en cookies `httpOnly`**.

* **Frontend (Cliente):** Desplegado en **Vercel**. Next.js 14 manejando SSR y CSR.
* **Backend (API RESTful):** Desplegado en **Render / Railway**. Express 5 procesando lógica de negocio.
* **Base de Datos:** Alojada en **TiDB Cloud Serverless** (MariaDB/MySQL compatible).

---

## 🛠️ Ficha Técnica del Stack

### Frontend (`/frontend`)
| Tecnología | Herramienta / Librería | Propósito |
| :--- | :--- | :--- |
| **Core** | Next.js 14 (App Router), React 18 | Framework y UI Runtime |
| **Lenguaje** | TypeScript | Tipado estático estricto |
| **Estado Global** | Zustand 5 | Gestión atómica de sesión y sobres |
| **Estilos & UI** | Tailwind CSS, Lucide React | Diseño responsive y sistema de iconos |
| **Animaciones** | Framer Motion, LottieFiles | Micro-interacciones e insignias metálicas SVG |
| **Testing** | Vitest, React Testing Library | Pruebas unitarias y de integración UI |

### Backend (`/backend`)
| Tecnología | Herramienta / Librería | Propósito |
| :--- | :--- | :--- |
| **Core** | Node.js, Express 5 | Entorno de ejecución y enrutamiento HTTP |
| **Base de Datos** | Prisma ORM, MariaDB Driver | Modelado, migraciones y consultas a TiDB Cloud |
| **Seguridad** | JWT, bcryptjs, cookie-parser | Autenticación robusta y encriptación de contraseñas |
| **Testing** | Jest, Supertest | Pruebas funcionales de endpoints (E2E API) |

---

## 🧠 Lógica de Negocio y Flujo de Datos

### 1. Sistema de Sobres y Transacciones
Los usuarios pueden crear hasta 10 sobres activos simultáneamente (EUR/COP). El sistema calcula dinámicamente sugerencias de ahorro mensual (`target / 30`) y permite inyectar fondos de dos formas:
* **Depósito Directo:** Inyección de capital manual.
* **Transferencia de Balance:** Movimiento de fondos desde el balance general del usuario hacia un sobre específico, utilizando **transacciones seguras de Prisma** para garantizar la integridad ACID.

### 2. Autenticación Segura (HttpOnly)
A diferencia de almacenar tokens en `localStorage` (vulnerables a XSS), AhorroPro implementa un flujo donde el Backend firma un JWT y lo inyecta directamente en las cookies del navegador del cliente con las banderas `httpOnly` y `sameSite: 'lax'`. Todas las peticiones fetch de `ApiClient` incluyen `credentials: "include"`.

---

## 🗄️ Modelo de Datos (Esquema Relacional)

La base de datos cuenta con una integridad referencial estricta (`ON DELETE CASCADE`):
* `users`: Credenciales encriptadas y datos base.
* `envelopes`: Sobres de ahorro con estado (`active`, `completed`), divisa y metas.
* `user_balances`: Billetera general del usuario con restricción de unicidad compuesta (un balance exacto por moneda).
* `transactions`: Historial auditable de movimientos (`deposit_envelope`, `deposit_balance`, `transfer`).

---

## ⚙️ Instalación Local y Desarrollo

### 1. Clonar e Instalar

git clone https://github.com/Cartan20223/AhorroPro-Beta
cd AhorroPro

2. Configurar el Backend
cd backend
npm install

Crea un archivo .env en /backend:
Fragmento de código

PORT=5000
DATABASE_URL="mysql://usuario:password@host:4000/sobreahorro?ssl=true"
JWT_SECRET="tu_clave_secreta"
FRONTEND_URL="http://localhost:3000"


Ejecuta la base de datos y levanta el servidor:
Bash

npx prisma db push
npm run dev


3. Configurar el Frontend

Abre una nueva terminal:
Bash

cd frontend
npm install

Crea un archivo .env.local en /frontend:
Fragmento de código

NEXT_PUBLIC_API_URL="http://localhost:5000/api"

Levanta el cliente:
Bash

npm run dev
🧪 Cobertura de Pruebas (Testing Suite)

El proyecto garantiza su estabilidad con 18 pruebas funcionales automatizadas:

    Backend (Jest + Supertest): Validación de middlewares, inyección de tokens, manejo global de errores (HTTP 500/401) y flujos de endpoints.

        Ejecución: cd backend && npm test

    Frontend (Vitest + RTL): Pruebas en entorno jsdom para renderizado condicional de componentes (Sidebar, Buttons) y lógica atómica de Zustand.

        Ejecución: cd frontend && npm test
