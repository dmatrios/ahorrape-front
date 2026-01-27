# ⭐ AhorraPE Web – Frontend de Gestión de Gastos Personales

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-HTTP-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
</p>

**AhorraPE Web** es el frontend del sistema AhorraPE, una aplicación para el registro y análisis de gastos personales.

Está desarrollado con **Vue 3** utilizando **Composition API**, consumiendo una **API REST en Spring Boot** de forma desacoplada, siguiendo buenas prácticas de arquitectura frontend moderna.

---

## 🧭 1. Arquitectura General

Este repositorio corresponde únicamente al **frontend** del sistema AhorraPE.

Características principales:

* SPA (Single Page Application)
* Comunicación vía HTTP (JSON)
* Separación clara de responsabilidades
* Preparado para autenticación JWT

Estructura del proyecto:

```txt
ahorrape-frontend/
│── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/          # Vistas / páginas
│   ├── router/         # Vue Router
│   ├── services/       # Axios & API services
│   ├── composables/    # Lógica reutilizable
│   ├── assets/
│   └── main.ts
│
│── index.html
│── package.json
│── vite.config.ts
│── README.md
```

---

## 🛠️ 2. Tecnologías Utilizadas

* **Vue 3** (Composition API)
* **Vite**
* **Vue Router**
* **Axios**
* JavaScript / TypeScript (según evolución)

---

## ⚙️ 3. Funcionalidades Actuales (MVP)

* Pantallas de registro y visualización de gastos
* Consumo de API REST
* Servicios centralizados con Axios
* Navegación con Vue Router
* Componentes reutilizables

---

## 🧱 4. Roadmap del Frontend

### Fase 0 — Base sólida

* Estructura modular por features
* Servicios Axios centralizados
* Manejo básico de estados

### Fase 1 — Autenticación

* Login y registro
* Manejo de JWT
* Guards de rutas
* Interceptores Axios

### Fase 2 — UX/UI

* Mejorar diseño visual
* Feedback de usuario
* Validaciones de formularios

### Fase 3 — Dashboard

* Totales mensuales
* Totales por categoría
* Gráficos y métricas

---

## 🚀 5. Instalación y Ejecución

### Requisitos

* Node.js 18+
* npm o pnpm

### Ejecutar el proyecto

```bash
npm install
npm run dev
```

La aplicación estará disponible en:

```txt
http://localhost:3000
```

---

## 🧪 6. Buenas Prácticas

* Componentes pequeños y reutilizables
* Lógica separada en composables
* Servicios HTTP desacoplados
* Código limpio y mantenible
* Preparado para escalar

---

## 👨‍💻 7. Autor

**Daniel Maturrano**
Desarrollador Full-Stack en formación

Stack del proyecto:

* Vue 3
* Axios
* Spring Boot (backend)
* MySQL

---


