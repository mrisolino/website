# Astro Personal Website
> 🧑‍🚀 My CV built with Astro.
> 
> https://www.martinrisolino.com.ar

---

# Documentación del Backend para Administración de CV

Este backend provee una API REST para gestionar el contenido de un currículum digital y compilar un proyecto Astro. Incluye un panel de administración web para editar secciones y disparar la compilación.

---

## Características Principales
- **Gestión de contenido**: CRUD para secciones del CV (Extracto, Skills, Experiencia, Portfolio).
- **Compilación automática**: Integración con `npm run build` para proyectos Astro. Una vez guardado los datos del backend, queda la compilación en /dist
- **Interfaz administrativa**: Panel web con formularios dinámicos y previsualización en tiempo real.
- **Persistencia de datos**: Almacenamiento en archivos JSON.

---

## Requisitos
- Node.js v16+
- npm
- Proyecto Astro configurado en el directorio raíz

---

## Estructura del Proyecto
```plaintext
tu-repositorio/
├── backend/
│   ├── server.js       # Servidor Express
│   ├── admin.html      # Panel de administración
│   └── data/           # Datos del CV (JSON)
└── (directorio Astro)  # Proyecto principal
