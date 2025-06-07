# Netflix API Simulation

Este proyecto es una simulación de la API de Netflix utilizando Arquitectura Hexagonal y Domain-Driven Design (DDD).

## Estructura del Proyecto

El proyecto está organizado en los siguientes contextos delimitados:

1. **Servicio de Reproducción (Streaming)**
   - Maneja la reproducción de contenido
   - Gestión de calidad de video
   - Control de sesiones de streaming

2. **Motor de Recomendación**
   - Generación de recomendaciones personalizadas
   - Análisis de preferencias de usuario

3. **Gestión de Contenido (Catálogo)**
   - CRUD de películas y series
   - Gestión de categorías y géneros

4. **Gestión de Perfiles**
   - Creación y gestión de perfiles de usuario
   - Control de restricciones por perfil

5. **Gestor de Descargas**
   - Control de contenido descargado
   - Gestión de permisos de descarga

6. **Gestión de Suscripciones**
   - Manejo de planes y suscripciones
   - Procesamiento de pagos

7. **Identity Management**
   - Autenticación y autorización
   - Gestión de seguridad

## Arquitectura

El proyecto sigue los principios de la Arquitectura Hexagonal (Puertos y Adaptadores) y DDD:

- **Dominio**: Contiene la lógica de negocio central
- **Aplicación**: Orquesta los casos de uso
- **Infraestructura**: Implementa los adaptadores secundarios
- **Interfaz**: Implementa los adaptadores primarios

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Tests

```bash
npm test
```

## Producción

```bash
npm start
``` 