# Documentación del Subdominio de Gestión de Descargas - Arquitectura Hexagonal

## Índice
1. [Introducción](#introducción)
2. [Arquitectura](#arquitectura)
3. [Componentes del Subdominio](#componentes-del-subdominio)
4. [Endpoints](#endpoints)
5. [Flujo de Datos](#flujo-de-datos)
6. [Consideraciones Técnicas](#consideraciones-técnicas)
7. [Próximos Pasos](#próximos-pasos)

## Introducción

Este documento describe la implementación del subdominio de gestión de descargas utilizando una arquitectura hexagonal (también conocida como ports and adapters) y principios de Domain-Driven Design (DDD). El subdominio está diseñado para manejar la gestión de descargas de contenido de manera independiente y desacoplada.

### Objetivos
- Implementar una arquitectura limpia y mantenible para el subdominio de descargas
- Separar claramente las responsabilidades del dominio de descargas
- Facilitar el testing y la evolución del sistema
- Proporcionar una API RESTful robusta para la gestión de descargas

## Arquitectura

### Arquitectura Hexagonal
El subdominio sigue los principios de la arquitectura hexagonal, que divide el sistema en tres capas principales:

1. **Dominio (Core)**
   - Contiene la lógica de negocio específica de descargas
   - Es independiente de frameworks y tecnologías
   - Define los puertos (interfaces) para la comunicación

2. **Puertos**
   - Interfaces que definen cómo el dominio de descargas interactúa con el mundo exterior
   - Puertos primarios (driving): Para casos de uso de descargas
   - Puertos secundarios (driven): Para servicios externos necesarios para las descargas

3. **Adaptadores**
   - Implementaciones concretas de los puertos
   - Adaptadores primarios: Controladores HTTP para descargas
   - Adaptadores secundarios: Repositorios y servicios de descarga

### Estructura de Directorios
```
src/download-manager/
├── domain/           # Lógica de negocio del subdominio
│   ├── entities/     # Entidades del dominio
│   ├── value-objects/# Objetos de valor
│   ├── services/     # Servicios del dominio
│   ├── ports/        # Interfaces del dominio
│   ├── events/       # Eventos del dominio
│   └── repositories/ # Interfaces de repositorios
├── application/      # Casos de uso
├── infrastructure/   # Adaptadores y configuraciones
└── interfaces/       # Controladores y rutas
```

## Componentes del Subdominio

### 1. Gestión de Descargas
El módulo principal que maneja la lógica de descarga de contenido:

- **Servicios del Dominio**
  - Gestión de descargas
  - Verificación de contenido
  - Control de calidad

- **Puertos**
  - `DownloadPort`: Define la interfaz para operaciones de descarga
  - `ContentVerificationPort`: Define la interfaz para verificación de contenido

- **Adaptadores**
  - `DownloadController`: Maneja las peticiones HTTP
  - `MockStorageAdapter`: Simula el almacenamiento de datos
  - `MockVerificationAdapter`: Simula la verificación de contenido

## Endpoints

### API de Gestión de Descargas

#### Gestión de Descargas
- `POST /api/v1/downloads`
  - Inicia una nueva descarga
  - Body: `{ "contentId": "string", "quality": "string" }`

- `GET /api/v1/downloads/:id`
  - Obtiene el estado de una descarga
  - Parámetros: `id` (ID de la descarga)

- `DELETE /api/v1/downloads/:id`
  - Cancela una descarga en progreso
  - Parámetros: `id` (ID de la descarga)

## Flujo de Datos

1. **Inicio de Descarga**
   ```
   Cliente HTTP → DownloadController → StartDownloadUseCase → DownloadPort → StorageAdapter
   ```

2. **Verificación de Contenido**
   ```
   StartDownloadUseCase → ContentVerificationPort → VerificationAdapter
   ```

3. **Manejo de Errores**
   ```
   Error → ErrorHandler → Respuesta HTTP
   ```

## Consideraciones Técnicas

### Seguridad
- Implementación de Helmet para headers de seguridad
- CORS configurado para control de acceso
- Validación de entrada en todos los endpoints de descarga

### Rendimiento
- Manejo asíncrono de operaciones de descarga
- Sistema de caché para contenido frecuentemente descargado
- Optimización de respuestas HTTP

### Mantenibilidad
- Código modular y desacoplado del subdominio
- Patrones de diseño claros para la gestión de descargas
- Documentación integrada

## Estructura Detallada de Archivos

### 1. Archivos Principales del Subdominio
- `src/download-manager/index.js`
  - Punto de entrada del subdominio
  - Configuración de Express y middleware
  - Inicialización del contenedor de dependencias
  - Configuración de rutas y manejo de errores

### 2. Estructura del Subdominio (`src/download-manager/`)
#### Domain
- `domain/entities/`
  - `Download.js`: Entidad que representa una descarga
  - `Content.js`: Entidad que representa el contenido a descargar

#### Application
- `application/use-cases/`
  - `StartDownloadUseCase.js`: Lógica para iniciar una descarga
  - `GetDownloadStatusUseCase.js`: Lógica para obtener el estado de una descarga
  - `CancelDownloadUseCase.js`: Lógica para cancelar una descarga

#### Interfaces
- `interfaces/http/`
  - `controllers/DownloadController.js`: Controlador HTTP para operaciones de descarga
  - `routes/downloadRoutes.js`: Definición de rutas HTTP
- `interfaces/events/`
  - `DownloadEventPublisher.js`: Publicador de eventos de descarga

### 3. Infrastructure (`src/download-manager/infrastructure/`)
#### Container
- `container.js`
  - Configuración de dependencias del subdominio
  - Inicialización de servicios y repositorios
  - Inyección de dependencias

#### Repositories
- `repositories/MockDownloadRepository.js`
  - Implementación mock del repositorio de descargas
  - Almacenamiento en memoria de las descargas

#### Services
- `services/MockContentService.js`
  - Servicio mock para verificación de contenido
  - Simulación de validación de calidad

#### Events
- `events/MockEventPublisher.js`
  - Publicador de eventos mock
  - Simulación de eventos del sistema

### 4. Dependencias Principales
```json
{
  "express": "^4.17.1",
  "cors": "^2.8.5",
  "helmet": "^4.6.0",
  "dotenv": "^10.0.0"
}
```

### 5. Flujo de Ejecución por Archivo

#### Inicio de Descarga
1. `index.js` → Recibe petición HTTP
2. `downloadRoutes.js` → Enruta a controlador
3. `DownloadController.js` → Procesa petición
4. `StartDownloadUseCase.js` → Ejecuta lógica de negocio
5. `MockDownloadRepository.js` → Persiste datos
6. `MockContentService.js` → Verifica contenido
7. `DownloadEventPublisher.js` → Publica eventos

#### Consulta de Estado
1. `index.js` → Recibe petición HTTP
2. `downloadRoutes.js` → Enruta a controlador
3. `DownloadController.js` → Procesa petición
4. `GetDownloadStatusUseCase.js` → Obtiene estado
5. `MockDownloadRepository.js` → Consulta datos

### 6. Configuración y Variables de Entorno
```env
PORT=3000
NODE_ENV=development
```

---

*Este documento fue generado automáticamente y puede ser actualizado según evolucione el proyecto.* 
