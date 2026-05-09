# Sistema de Gestión de Cartera Fiscal de Clientes
**Diseño de Aplicaciones Web · Tecmilenio**  
Alumna: Lucero Sarahí Jaime Barbosa · Matrícula: 3069230

---

## Tecnologías usadas

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js (App Router) |
| Backend API | API Routes de Next.js |
| Base de datos | Supabase (PostgreSQL) |

---

## PASO 2 — Instalar Node.js

1. Ve a **https://nodejs.org**
2. Descarga la versión **LTS** (la verde que dice "Recommended")
3. Instálala con todas las opciones por defecto
4. Verifica que funcionó: abre la terminal (CMD o PowerShell) y escribe:
   ```
   node --version
   ```
   Debe decir algo como `v20.x.x`

---

## PASO 3 — Instalar y correr el proyecto

Abre la terminal (CMD o PowerShell) **dentro de la carpeta del proyecto** y ejecuta:

```bash
# Instalar dependencias
npm install

# Correr el servidor de desarrollo
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

---

## Estructura del proyecto

```
cartera-fiscal/
├── app/
│   ├── layout.js              ← Header con navegación y alertas
│   ├── page.js                ← Dashboard principal
│   ├── globals.css            ← Estilos globales
│   ├── login/
│   │   └── page.js            ← Página de inicio de sesión
│   ├── clientes/
│   │   └── page.js            ← CRUD de clientes (Client Component)
│   ├── obligaciones/
│   │   └── page.js            ← CRUD de obligaciones (Client Component)
│   └── api/
│       ├── clientes/
│       │   ├── route.js       ← GET (listar) · POST (crear)
│       │   └── [id]/route.js  ← GET (detalle) · PUT (editar) · DELETE
│       └── obligaciones/
│           ├── route.js       ← GET (listar+filtros) · POST (crear)
│           └── [id]/route.js  ← PUT (editar) · DELETE
├── components/
│   └── LogoutButton.js        ← Botón de cierre de sesión
├── lib/
│   └── supabase.js            ← Cliente Supabase
├── middleware.js              ← Protección de rutas (auth guard)
├── .env.local.example         ← Plantilla de variables de entorno
└── package.json
```

---

## Funcionalidades implementadas

- **CRUD completo de Clientes** con validación RFC, CP, campos requeridos
- **CRUD completo de Obligaciones** con tipos ISR, IVA, Declaración Anual, etc.
- **Cálculo automático** de `dias_restantes` y `estatus_visual` en el servidor
- **Alertas de vencimiento** visibles en el header y dashboard
- **Filtros** por estado visual y cumplimiento
- **Búsqueda** en tiempo real por nombre y RFC
- **3 tablas SQL** relacionadas con PK y FK en Supabase
- **API REST** con manejo de errores y códigos HTTP correctos
- **Autenticación** con Supabase Auth y protección de rutas con middleware

---
## Diagrma de flujo en mermaid 

![Diagrama de flujo](<Cliente y Obligaciones-2026-05-09-230556.png>)

---
## Enlace de despliegue en Vercel

Abre tu navegador en: **https://evidencia3-web-design.vercel.app/unauthorized** 
