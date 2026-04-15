# Presupuesto de Horas — Proyecto Conecta Futuro

> **Leyenda de colores:**
> - Texto normal = Desarrollo base (backend, integración de datos existentes)
> - <span style="color: #0066cc">**Texto azul = Features del ANEXO I — Aclaraciones de Alcance**</span>

---

## Resumen del Estado Actual (Frontend)

La aplicación actual es un **frontend React + TypeScript** con:
- **Login**: Autenticación contra un array hardcodeado en `src/data/users.ts` con sesión en `sessionStorage`
- **5 programas** con datos mockeados en JSON: Cuida tu Bosque, Nuevos Bosques, Sostenibilidad, Certificaciones, Aula Verde
- **Mapa interactivo** (Leaflet) con capas GeoJSON, marcadores, popups
- **Filtrado por municipio** basado en el usuario logueado
- **Datos mockeados**: parcelas con coordenadas, indicadores, datos catastrales, leyendas, documentos PDF, imágenes
- **Sin backend**: todo es estático, no hay API, no hay base de datos

---

## 1. BACKEND — Desarrollo Base

### 1.1 Infraestructura y Setup Inicial
| Tarea | Horas |
|-------|-------|
| Definición de arquitectura backend (Node.js/Express o .NET) | 8 |
| Setup del proyecto, estructura de carpetas, configuración | 8 |
| Configuración de base de datos (PostgreSQL/SQL Server) | 6 |
| Configuración de entorno (dev, staging, prod) | 6 |
| Docker / despliegue básico | 8 |
| **Subtotal** | **36** |

### 1.2 Autenticación y Autorización (Email + Código OTP)
Login seguro y simple: el usuario ingresa su email, recibe un código temporal (OTP) y accede sin contraseña.

| Tarea | Horas |
|-------|-------|
| Tabla `usuarios` (email, municipio, rol, activo, ultimo_acceso) | 4 |
| Tabla `roles` y `permisos` | 4 |
| Tabla `codigos_otp` (id, usuario_id, codigo, expiracion, usado) | 3 |
| Servicio de envío de email (SendGrid / AWS SES / Resend) | 8 |
| Template de email con código OTP | 4 |
| API `/auth/request-code` — genera OTP y envía email | 8 |
| API `/auth/verify-code` — valida OTP y retorna JWT | 8 |
| Middleware de autenticación y autorización (JWT) | 8 |
| API registro/gestión de usuarios (CRUD admin) | 10 |
| Expiración de OTP (5 min) + rate limiting (anti-brute force) | 4 |
| Manejo de sesiones y expiración de tokens | 6 |
| Tests unitarios autenticación | 8 |
| **Subtotal** | **75** |

### 1.3 Modelo de Datos y Tablas
Basado en los JSON mock actuales:

| Tabla / Entidad | Campos principales | Horas |
|-----------------|-------------------|-------|
| `comunidades` | id, nombre | 3 |
| `provincias` | id, nombre, comunidad_id | 3 |
| `municipios` | id, nombre, provincia_id | 3 |
| `programas` | id, nombre, descripcion, imagen, archivo | 4 |
| `parcelas` | id, municipio_id, programa_id, geometry (GeoJSON), type | 6 |
| `leyendas` | id, parcela_id, name, label, color, texto | 4 |
| `datos_catastrales` | id, parcela_id, imagen, ref_cat, poligono, parcela, coord_x, coord_y | 5 |
| `indicadores` | id, parcela_id, superficie, arboles, co2_capturado, co2_por_capturar, factor_hidrologico | 5 |
| `indicadores_nuevos_bosques` | id, parcela_id, superficie, arboles_nuevos, co2_por_capturar | 4 |
| `metas_sostenibilidad` | id, parcela_id, meta | 4 |
| `pilares_sostenibilidad` | id, parcela_id, pilar | 4 |
| `actuaciones_sostenibilidad` | id, parcela_id, actuacion | 4 |
| `certificaciones` | id, titulo, programa_id | 4 |
| `certificacion_items` | id, certificacion_id, descripcion | 3 |
| `documentos` | id, parcela_id, nombre, icono, url, tipo | 5 |
| `informacion_parcela` | id, parcela_id, descripcion, estado_conservacion | 5 |
| `datos_adicionales` | id, informacion_id, texto | 3 |
| `emisiones_directas` | id, informacion_id, periodo, edificio_sede, nombre_gas, formula, pca, tipo_equipo, capacidad, recarga, emisiones_kg_co2e, total | 6 |
| `aula_verde_documentos` | id, categoria, label, pdf_url | 4 |
| Índices, constraints, FK | — | 8 |
| Stored Procedures (CRUD para cada entidad) | — | 24 |
| Seed data / migración de JSON a DB | — | 12 |
| **Subtotal** | **120** |

### 1.4 APIs REST (Endpoints)
| Endpoint / Módulo | Métodos | Horas |
|-------------------|---------|-------|
| `/api/auth/login` | POST | (en 1.2) |
| `/api/auth/refresh` | POST | (en 1.2) |
| `/api/users` | GET, POST, PUT, DELETE | (en 1.2) |
| `/api/programas` | GET, GET/:id | 6 |
| `/api/programas/:id/distritos` | GET (árbol comunidad→provincia→municipio→parcelas) | 12 |
| `/api/parcelas/:id` | GET (detalle completo) | 8 |
| `/api/parcelas/:id/indicadores` | GET, PUT | 6 |
| `/api/parcelas/:id/catastrales` | GET, PUT | 6 |
| `/api/parcelas/:id/leyenda` | GET, PUT | 4 |
| `/api/parcelas/:id/informacion` | GET, PUT | 6 |
| `/api/parcelas/:id/documentos` | GET, POST, DELETE | 8 |
| `/api/parcelas/:id/emisiones` | GET, POST, PUT | 8 |
| `/api/sostenibilidad/:municipio` | GET (metas, pilares, actuaciones) | 8 |
| `/api/certificaciones` | GET (con items) | 6 |
| `/api/aula-verde` | GET (documentos por categoría) | 6 |
| `/api/municipios` | GET (filtrado por usuario) | 4 |
| `/api/upload` (imágenes/PDFs) | POST | 10 |
| Validación de inputs (middleware) | — | 8 |
| Manejo de errores global | — | 6 |
| Paginación y filtros | — | 8 |
| Tests unitarios de APIs | — | 20 |
| Tests de integración | — | 16 |
| Documentación API (Swagger/OpenAPI) | — | 10 |
| **Subtotal** | **166** |

### 1.5 Almacenamiento de Archivos
| Tarea | Horas |
|-------|-------|
| Servicio de subida de imágenes (parcelas, secciones) | 8 |
| Servicio de subida de PDFs (documentos, informes) | 6 |
| Almacenamiento (S3 / Azure Blob / local) | 8 |
| **Subtotal** | **22** |

---

## 2. INTEGRACIÓN FRONTEND ↔ BACKEND

### 2.1 Refactor de Autenticación (Email + OTP)
| Tarea | Horas |
|-------|-------|
| Pantalla de login: input email + botón "Enviar código" | 6 |
| Pantalla de verificación: input código OTP + temporizador de reenvío | 6 |
| Integración con API `/auth/request-code` y `/auth/verify-code` | 6 |
| JWT storage (httpOnly cookies o localStorage seguro) | 4 |
| Proteger rutas con token validation | 4 |
| Manejar expiración de sesión en UI | 4 |
| **Subtotal** | **30** |

### 2.2 Refactor de Datos de Programas
| Tarea | Horas |
|-------|-------|
| Crear servicio/capa API centralizada (axios/fetch wrapper) | 8 |
| Interceptors para auth headers y manejo de errores | 6 |
| Reemplazar JSON mock cuida-tu-bosque por API | 6 |
| Reemplazar JSON mock nuevos-bosques por API | 6 |
| Reemplazar JSON mock sostenibilidad por API | 6 |
| Reemplazar JSON mock certificaciones por API | 6 |
| Reemplazar JSON mock aula-verde por API | 6 |
| Reemplazar JSON mock listado programas por API | 4 |
| Refactor `useProgramMap` hook para consumir API | 10 |
| Refactor `useMunicipioFilter` para usar datos del token/API | 4 |
| **Subtotal** | **62** |

### 2.3 Estados de Carga y Error
| Tarea | Horas |
|-------|-------|
| Loading states (skeletons/spinners) en cada sección | 8 |
| Error boundaries y mensajes de error | 6 |
| Retry logic para llamadas fallidas | 4 |
| Empty states (sin datos) | 4 |
| **Subtotal** | **22** |

---

## <span style="color: #0066cc">3. FEATURES DEL ANEXO I — Aclaraciones de Alcance</span>

<span style="color: #0066cc">*Ref: ANEXO I. ACLARACIONES DE ALCANCE Y CRITERIOS DE DESARROLLO*</span>

---

### <span style="color: #0066cc">3.1 KPIs Ambientales y Modelos de Carbono (Anexo §3)</span>

<span style="color: #0066cc">Indicadores ambientales y modelos de carbono con finalidad informativa y analítica. Conjunto predefinido, sin configuración dinámica por usuarios. Sin carácter normativo ni certificador.</span>

| <span style="color: #0066cc">Tarea</span> | <span style="color: #0066cc">Horas</span> |
|-------|-------|
| <span style="color: #0066cc">Diseño del catálogo de KPIs predefinidos (CO2, agua, biodiversidad, etc.)</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Tabla `kpis_ambientales` (id, parcela_id, tipo_kpi, valor, unidad, fecha_calculo)</span> | <span style="color: #0066cc">5</span> |
| <span style="color: #0066cc">Tabla `modelos_carbono` (id, parcela_id, metodologia, co2_almacenado, co2_captura_anual, fecha)</span> | <span style="color: #0066cc">5</span> |
| <span style="color: #0066cc">Backend: Servicio de cálculo de KPIs basado en datos de parcelas e indicadores</span> | <span style="color: #0066cc">16</span> |
| <span style="color: #0066cc">Backend: API `/api/kpis/:parcelaId` — GET KPIs calculados</span> | <span style="color: #0066cc">6</span> |
| <span style="color: #0066cc">Backend: API `/api/modelos-carbono/:parcelaId` — GET modelo de carbono</span> | <span style="color: #0066cc">6</span> |
| <span style="color: #0066cc">Frontend: Dashboard de KPIs por parcela/municipio (gráficos, tarjetas)</span> | <span style="color: #0066cc">20</span> |
| <span style="color: #0066cc">Frontend: Visualización del modelo de carbono (gráfico de barras/líneas)</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">Tests</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">**Subtotal**</span> | <span style="color: #0066cc">**86**</span> |

---

### <span style="color: #0066cc">3.2 Prevención Climática — Integración AEMET OpenData API (Anexo §3 / §11)</span>

<span style="color: #0066cc">Integración básica con AEMET OpenData API (APIs públicas). Datos exclusivamente de AEMET. Sin datos históricos. Sin garantía de disponibilidad de servicios de terceros.</span>

| <span style="color: #0066cc">Tarea</span> | <span style="color: #0066cc">Horas</span> |
|-------|-------|
| <span style="color: #0066cc">Investigación y documentación de AEMET OpenData API (endpoints, autenticación, límites)</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Backend: Servicio de conexión a AEMET (API key, retry, rate limiting)</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">Backend: Endpoint datos meteorológicos actuales (temp, viento, humedad) por municipio</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Backend: Endpoint predicciones/pronósticos por municipio, provincia y territorio</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">Backend: Endpoint avisos y alertas meteorológicas</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Backend: Capa de caché para reducir llamadas a AEMET (Redis/memoria)</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Backend: Mapeo municipios del proyecto ↔ códigos AEMET</span> | <span style="color: #0066cc">6</span> |
| <span style="color: #0066cc">Backend: Manejo de errores/indisponibilidad de AEMET (fallback graceful)</span> | <span style="color: #0066cc">4</span> |
| <span style="color: #0066cc">Frontend: Widget/panel meteorológico en mapa (datos actuales por municipio)</span> | <span style="color: #0066cc">16</span> |
| <span style="color: #0066cc">Frontend: Vista de predicciones (próximos días)</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">Frontend: Panel de alertas y avisos meteorológicos (con iconos de severidad)</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">Tests unitarios + integración</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">**Subtotal**</span> | <span style="color: #0066cc">**112**</span> |

---

### <span style="color: #0066cc">3.3 Monitoreo Ambiental — Sensores IoT (Anexo §4)</span>

<span style="color: #0066cc">Integración, procesamiento y visualización de datos de sensores IoT. **Excluye**: provisión de sensores físicos, instalación, mantenimiento, reposición o gestión de hardware. Dos modalidades: **formularios estándar** para carga manual del usuario y **integración de APIs** de sensores.</span>

| <span style="color: #0066cc">Tarea</span> | <span style="color: #0066cc">Horas</span> |
|-------|-------|
| <span style="color: #0066cc">**Modelo de datos sensores**</span> | |
| <span style="color: #0066cc">Tabla `tipos_sensor` (id, nombre, unidad_medida, rango_min, rango_max, descripcion)</span> | <span style="color: #0066cc">4</span> |
| <span style="color: #0066cc">Tabla `sensores` (id, parcela_id, tipo_sensor_id, nombre, ubicacion, activo, fuente: 'manual'/'api')</span> | <span style="color: #0066cc">5</span> |
| <span style="color: #0066cc">Tabla `lecturas_sensor` (id, sensor_id, valor, timestamp, validado)</span> | <span style="color: #0066cc">5</span> |
| <span style="color: #0066cc">Tabla `configuracion_api_sensor` (id, sensor_id, url_endpoint, api_key, frecuencia, ultimo_fetch)</span> | <span style="color: #0066cc">4</span> |
| <span style="color: #0066cc">Índices y particionamiento por fecha para lecturas masivas</span> | <span style="color: #0066cc">6</span> |
| <span style="color: #0066cc">**Backend — Formularios (carga manual)**</span> | |
| <span style="color: #0066cc">API CRUD sensores `/api/sensores`</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">API carga de lecturas manual `/api/sensores/:id/lecturas` (POST individual y bulk)</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Validación de datos de entrada (rangos, formato, duplicados)</span> | <span style="color: #0066cc">6</span> |
| <span style="color: #0066cc">API consulta de lecturas `/api/sensores/:id/lecturas` (GET con filtros por fecha)</span> | <span style="color: #0066cc">6</span> |
| <span style="color: #0066cc">**Backend — Integración APIs externas de sensores**</span> | |
| <span style="color: #0066cc">Servicio de polling/webhook para APIs de sensores externos</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">Configuración por sensor de la URL, credenciales y frecuencia</span> | <span style="color: #0066cc">6</span> |
| <span style="color: #0066cc">Mapeo y normalización de datos de diferentes proveedores</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">Job programado (cron) para fetch periódico de datos</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Manejo de errores y reintentos por sensor</span> | <span style="color: #0066cc">4</span> |
| <span style="color: #0066cc">**Frontend**</span> | |
| <span style="color: #0066cc">Página de gestión de sensores (listado, alta, baja, edición)</span> | <span style="color: #0066cc">14</span> |
| <span style="color: #0066cc">Formulario estándar de carga manual de lecturas (individual y CSV/bulk)</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">Formulario de configuración de API externa por sensor</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Dashboard de visualización de datos IoT (gráficos temporal, último valor, estado)</span> | <span style="color: #0066cc">20</span> |
| <span style="color: #0066cc">Integración de datos de sensores en el mapa (marcadores con último valor)</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">Tests</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">**Subtotal**</span> | <span style="color: #0066cc">**168**</span> |

---

### <span style="color: #0066cc">3.4 IA Descriptiva y Predictiva de Complejidad Media (Anexo §2)</span>

<span style="color: #0066cc">Modelos descriptivos y predictivos de complejidad media para análisis y apoyo a la toma de decisiones. **Excluye**: sistemas autónomos, aprendizaje continuo en producción, sustitución de supervisión humana, predicción avanzada, agentes inteligentes. Resultados con carácter indicativo, sujetos a validación humana.</span>

| <span style="color: #0066cc">Tarea</span> | <span style="color: #0066cc">Horas</span> |
|-------|-------|
| <span style="color: #0066cc">**Análisis Descriptivo**</span> | |
| <span style="color: #0066cc">Backend: Servicio de agregaciones (totales CO2, superficie, árboles por programa/municipio)</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">Backend: Cálculo de tendencias temporales (variación interanual de indicadores)</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">Backend: Rankings y comparativas entre municipios/parcelas</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Backend: API `/api/analytics/descriptivo` (resumen, tendencias, rankings)</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">**Modelos Predictivos (complejidad media)**</span> | |
| <span style="color: #0066cc">Investigación de librerías (simple-statistics, regression.js o similar)</span> | <span style="color: #0066cc">6</span> |
| <span style="color: #0066cc">Backend: Modelo predictivo de captura de CO2 futuro (regresión lineal/polinomial)</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">Backend: Modelo predictivo de crecimiento de cobertura arbórea</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">Backend: API `/api/analytics/predictivo/:parcelaId` (proyecciones)</span> | <span style="color: #0066cc">6</span> |
| <span style="color: #0066cc">Backend: Disclaimer automático "resultado indicativo, sujeto a validación"</span> | <span style="color: #0066cc">2</span> |
| <span style="color: #0066cc">**Frontend**</span> | |
| <span style="color: #0066cc">Dashboard de analítica descriptiva (gráficos de resumen, tendencias)</span> | <span style="color: #0066cc">16</span> |
| <span style="color: #0066cc">Vista de proyecciones predictivas con intervalos de confianza</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">Badges/indicadores de "resultado indicativo" en toda predicción</span> | <span style="color: #0066cc">4</span> |
| <span style="color: #0066cc">Tests</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">**Subtotal**</span> | <span style="color: #0066cc">**116**</span> |

---

### <span style="color: #0066cc">3.5 Gobernanza Digital y Ciencia Ciudadana (Anexo §5)</span>

<span style="color: #0066cc">Mecanismos controlados de aportación, visualización y consulta de información. **Excluye**: gestión de comunidades masivas, moderación intensiva, validación científica formal, formularios participativos complejos, trazabilidad individual, descarga masiva, plataforma social.</span>

| <span style="color: #0066cc">Tarea</span> | <span style="color: #0066cc">Horas</span> |
|-------|-------|
| <span style="color: #0066cc">Tabla `aportaciones_ciudadanas` (id, usuario_id, parcela_id, tipo, contenido, fecha, estado)</span> | <span style="color: #0066cc">4</span> |
| <span style="color: #0066cc">Backend: API CRUD aportaciones (envío, listado, consulta)</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Backend: Moderación básica (aprobación/rechazo por admin)</span> | <span style="color: #0066cc">6</span> |
| <span style="color: #0066cc">Backend: Consulta pública de aportaciones aprobadas</span> | <span style="color: #0066cc">4</span> |
| <span style="color: #0066cc">Frontend: Formulario simple de aportación ciudadana (texto + imagen opcional)</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">Frontend: Vista de aportaciones públicas por zona/parcela</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Frontend: Panel admin de moderación (aprobar/rechazar)</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Tests</span> | <span style="color: #0066cc">6</span> |
| <span style="color: #0066cc">**Subtotal**</span> | <span style="color: #0066cc">**54**</span> |

---

### <span style="color: #0066cc">3.6 QA, DevOps y Calidad (Anexo §8)</span>

<span style="color: #0066cc">Aseguramiento de calidad y DevOps para desarrollo inicial. Orientado a estabilidad y puesta en producción. **Excluye**: operación permanente post-proyecto, soporte continuado.</span>

| <span style="color: #0066cc">Tarea</span> | <span style="color: #0066cc">Horas</span> |
|-------|-------|
| <span style="color: #0066cc">Pipeline CI/CD (GitHub Actions / GitLab CI)</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">Entorno de staging automático</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Deploy automatizado a producción</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Monitoreo básico (health checks, logs centralizados)</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Testing automatizado E2E (Playwright/Cypress — flujos críticos)</span> | <span style="color: #0066cc">20</span> |
| <span style="color: #0066cc">Documentación de despliegue y operación</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">**Subtotal**</span> | <span style="color: #0066cc">**64**</span> |

---

### <span style="color: #0066cc">3.7 Replicabilidad y Escalabilidad (Anexo §6)</span>

<span style="color: #0066cc">Diseño modular, reutilizable y documentado. **Excluye**: despliegue automático en nuevos territorios, implementación operativa fuera del ámbito aprobado.</span>

| <span style="color: #0066cc">Tarea</span> | <span style="color: #0066cc">Horas</span> |
|-------|-------|
| <span style="color: #0066cc">Refactor a arquitectura multi-tenant (datos por territorio/proyecto)</span> | <span style="color: #0066cc">16</span> |
| <span style="color: #0066cc">Configuración externalizada (env vars, feature flags por territorio)</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">Documentación técnica de replicación (guía paso a paso)</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">**Subtotal**</span> | <span style="color: #0066cc">**34**</span> |

---

## 4. RESUMEN GENERAL DE HORAS

### Desarrollo Base
| Bloque | Horas |
|--------|-------|
| 1.1 Infraestructura y Setup | 36 |
| 1.2 Autenticación Backend (Email + OTP) | 75 |
| 1.3 Modelo de Datos y Tablas | 120 |
| 1.4 APIs REST | 166 |
| 1.5 Almacenamiento de Archivos | 22 |
| 2.1 Integración Auth Frontend (Email + OTP) | 30 |
| 2.2 Integración Datos Frontend | 62 |
| 2.3 Estados de Carga/Error | 22 |
| **Subtotal Base** | **533** |

### <span style="color: #0066cc">Features del ANEXO I</span>
| <span style="color: #0066cc">Bloque</span> | <span style="color: #0066cc">Horas</span> |
|--------|-------|
| <span style="color: #0066cc">3.1 KPIs Ambientales y Modelos de Carbono</span> | <span style="color: #0066cc">86</span> |
| <span style="color: #0066cc">3.2 Prevención Climática — AEMET API</span> | <span style="color: #0066cc">112</span> |
| <span style="color: #0066cc">3.3 Monitoreo Ambiental — Sensores IoT</span> | <span style="color: #0066cc">168</span> |
| <span style="color: #0066cc">3.4 IA Descriptiva y Predictiva</span> | <span style="color: #0066cc">116</span> |
| <span style="color: #0066cc">3.5 Gobernanza Digital y Ciencia Ciudadana</span> | <span style="color: #0066cc">54</span> |
| <span style="color: #0066cc">3.6 QA, DevOps y Calidad</span> | <span style="color: #0066cc">64</span> |
| <span style="color: #0066cc">3.7 Replicabilidad y Escalabilidad</span> | <span style="color: #0066cc">34</span> |
| <span style="color: #0066cc">**Subtotal ANEXO**</span> | <span style="color: #0066cc">**634**</span> |

### Buffer y QA General
| Concepto | Horas |
|----------|-------|
| QA / Testing manual general | 48 |
| Bugfixes y ajustes post-integración | 40 |
| Revisión de código y refactoring | 20 |
| Documentación técnica general | 16 |
| **Subtotal QA** | **124** |

---

### GRAN TOTAL

| Categoría | Horas |
|-----------|-------|
| Desarrollo Base | 533 |
| <span style="color: #0066cc">Features ANEXO I</span> | <span style="color: #0066cc">634</span> |
| Buffer y QA | 124 |
| **GRAN TOTAL** | **1.291 horas** |

---

## 5. PLAN DE SPRINTS (2 semanas / sprint, 1 Frontend + 1 Backend)

Capacidad por sprint: **1 BE (80h) + 1 FE (80h) = 160 horas**
Los sprints están balanceados para que ambos devs tengan carga equivalente.
**Total sprints estimados: 9 sprints (~4.5 meses)**

### Sprint 1 — Fundaciones (160h)
| Dev | Tarea | Horas |
|-----|-------|-------|
| BE | Setup proyecto, Docker, configuración DB | 36 |
| BE | Auth: tablas usuarios + OTP, servicio email, template | 19 |
| BE | Auth: APIs request-code + verify-code + JWT | 16 |
| FE | Servicio API centralizado (axios wrapper, interceptors) | 14 |
| FE | Pantalla login email + pantalla código OTP | 12 |
| FE | Integración con APIs auth + JWT storage | 10 |
| FE | Protección de rutas + expiración sesión | 8 |
| BE | Middleware auth + rate limiting OTP | 12 |
| BE+FE | Tests autenticación | 8 |
| | **Buffer** | **25** |

### Sprint 2 — Modelo de Datos (160h)
| Dev | Tarea | Horas |
|-----|-------|-------|
| BE | Diseño y creación de todas las tablas base | 60 |
| BE | Índices, constraints, FK | 8 |
| BE | Seed data / migración JSON→DB | 12 |
| FE | Reemplazar JSON mock cuida-tu-bosque por API | 6 |
| FE | Reemplazar JSON mock nuevos-bosques por API | 6 |
| FE | Reemplazar JSON mock sostenibilidad por API | 6 |
| FE | Reemplazar JSON mock certificaciones por API | 6 |
| FE | Reemplazar JSON mock aula-verde + listado programas por API | 10 |
| FE | Refactor `useProgramMap` hook para consumir API | 10 |
| FE | Refactor `useMunicipioFilter` | 4 |
| | **Buffer** | **32** |

### Sprint 3 — APIs Core (160h)
| Dev | Tarea | Horas |
|-----|-------|-------|
| BE | Stored procedures CRUD (todas las entidades) | 24 |
| BE | API programas + distritos (árbol completo) | 18 |
| BE | API parcelas (detalle, indicadores, catastrales, leyenda) | 24 |
| BE | API informacion, documentos, emisiones | 14 |
| FE | Loading states (skeletons/spinners) en cada sección | 8 |
| FE | Error boundaries y mensajes de error | 6 |
| FE | Retry logic + empty states | 8 |
| FE | Testing manual integración parcial (flujos disponibles) | 20 |
| | **Buffer** | **38** |

### Sprint 4 — APIs Restantes + Upload + QA Base (160h)
| Dev | Tarea | Horas |
|-----|-------|-------|
| BE | API sostenibilidad (metas, pilares, actuaciones) | 8 |
| BE | API certificaciones + aula verde | 12 |
| BE | API municipios, validación inputs, manejo errores, paginación | 26 |
| BE | Upload de archivos (imágenes/PDFs) + almacenamiento | 22 |
| BE | Documentación Swagger/OpenAPI | 10 |
| FE | Ajustes de integración con APIs restantes | 12 |
| FE | Testing manual E2E flujos completos | 20 |
| FE | Bugfixes post-integración | 16 |
| BE | Tests unitarios + integración | 20 |
| | **Buffer** | **14** |

### <span style="color: #0066cc">Sprint 5 — AEMET API + KPIs Ambientales (160h) [ANEXO]</span>
| Dev | <span style="color: #0066cc">Tarea</span> | <span style="color: #0066cc">Horas</span> |
|-----|-------|-------|
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Investigación AEMET OpenData API + mapeo municipios</span> | <span style="color: #0066cc">14</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Servicio conexión AEMET (API key, retry, rate limiting)</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Endpoints meteo actual + predicciones + alertas</span> | <span style="color: #0066cc">26</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Caché AEMET + fallback por indisponibilidad</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Widget/panel meteorológico en mapa</span> | <span style="color: #0066cc">16</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Vista de predicciones (próximos días)</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Panel de alertas y avisos meteorológicos</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Tablas KPIs + modelo carbono + API endpoints</span> | <span style="color: #0066cc">22</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Dashboard KPIs (inicio, pendiente backend Sprint 6)</span> | <span style="color: #0066cc">20</span> |
| | <span style="color: #0066cc">**Tests + Buffer**</span> | <span style="color: #0066cc">**16**</span> |

### <span style="color: #0066cc">Sprint 6 — Sensores IoT: Formularios + Modelo (160h) [ANEXO]</span>
| Dev | <span style="color: #0066cc">Tarea</span> | <span style="color: #0066cc">Horas</span> |
|-----|-------|-------|
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Tablas: tipos_sensor, sensores, lecturas, config_api</span> | <span style="color: #0066cc">18</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Índices + particionamiento por fecha</span> | <span style="color: #0066cc">6</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">API CRUD sensores + carga lecturas (individual y bulk)</span> | <span style="color: #0066cc">16</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Validación de datos + API consulta lecturas</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Servicio polling/webhook APIs externas sensores</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Página gestión sensores (listado, alta, baja, edición)</span> | <span style="color: #0066cc">14</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Formulario estándar carga manual lecturas (individual + CSV)</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Formulario configuración API externa por sensor</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Dashboard visualización IoT (gráficos, último valor)</span> | <span style="color: #0066cc">20</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Config credenciales + mapeo proveedores + jobs cron</span> | <span style="color: #0066cc">24</span> |
| | <span style="color: #0066cc">**Tests + Buffer**</span> | <span style="color: #0066cc">**18**</span> |

### <span style="color: #0066cc">Sprint 7 — IoT Mapa + IA Descriptiva/Predictiva (160h) [ANEXO]</span>
| Dev | <span style="color: #0066cc">Tarea</span> | <span style="color: #0066cc">Horas</span> |
|-----|-------|-------|
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Integración sensores en mapa (marcadores con último valor)</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Servicio agregaciones (CO2, superficie, árboles por programa/municipio)</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Tendencias temporales + rankings + API descriptivo</span> | <span style="color: #0066cc">18</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Modelo predictivo CO2 + cobertura arbórea (regresión)</span> | <span style="color: #0066cc">22</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">API predictivo + disclaimer automático</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Dashboard analítica descriptiva (gráficos resumen, tendencias)</span> | <span style="color: #0066cc">16</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Vista proyecciones predictivas + intervalos confianza</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Badges "resultado indicativo" + KPIs dashboard final</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Servicio cálculo KPIs + modelo carbono completo</span> | <span style="color: #0066cc">16</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Visualización modelo carbono (barras/líneas)</span> | <span style="color: #0066cc">12</span> |
| | <span style="color: #0066cc">**Tests + Buffer**</span> | <span style="color: #0066cc">**22**</span> |

### <span style="color: #0066cc">Sprint 8 — Gobernanza Digital + DevOps (160h) [ANEXO]</span>
| Dev | <span style="color: #0066cc">Tarea</span> | <span style="color: #0066cc">Horas</span> |
|-----|-------|-------|
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Tabla aportaciones_ciudadanas + API CRUD</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Moderación básica (aprobación/rechazo) + consulta pública</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Formulario aportación ciudadana (texto + imagen)</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Vista aportaciones públicas + panel admin moderación</span> | <span style="color: #0066cc">16</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Pipeline CI/CD (GitHub Actions / GitLab CI)</span> | <span style="color: #0066cc">12</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Entorno staging automático + deploy producción</span> | <span style="color: #0066cc">16</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Monitoreo (health checks, logs centralizados)</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">FE</span> | <span style="color: #0066cc">Testing E2E automatizado flujos críticos (Playwright)</span> | <span style="color: #0066cc">20</span> |
| <span style="color: #0066cc">BE+FE</span> | <span style="color: #0066cc">Refactor multi-tenant + feature flags</span> | <span style="color: #0066cc">24</span> |
| | <span style="color: #0066cc">**Tests gobernanza + Buffer**</span> | <span style="color: #0066cc">**14**</span> |
| | **Horas restantes → Sprint 9** | |

### <span style="color: #0066cc">Sprint 9 — Replicabilidad + QA Final + Cierre (160h) [ANEXO + Base]</span>
| Dev | <span style="color: #0066cc">Tarea</span> | <span style="color: #0066cc">Horas</span> |
|-----|-------|-------|
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Configuración externalizada (env vars por territorio)</span> | <span style="color: #0066cc">8</span> |
| <span style="color: #0066cc">BE+FE</span> | <span style="color: #0066cc">Documentación técnica de replicación (guía paso a paso)</span> | <span style="color: #0066cc">10</span> |
| <span style="color: #0066cc">BE</span> | <span style="color: #0066cc">Documentación despliegue y operación</span> | <span style="color: #0066cc">8</span> |
| BE | Tests unitarios + integración finales | 16 |
| FE | Testing manual E2E completo (todos los flujos) | 30 |
| BE+FE | Bugfixes y ajustes finales | 40 |
| BE+FE | Revisión de código y refactoring | 20 |
| BE+FE | Documentación técnica general | 16 |
| | **Buffer** | **12** |

---

## 6. NOTAS SOBRE SECCIONES EXCLUIDAS DEL ANEXO

| Sección del Anexo | Estado | Nota |
|-------------------|--------|------|
| §9 Economía Circular / Crecer Verde | **EXCLUIDO** | El cliente indica incertidumbre ("¿podemos sacarlo?"). No se presupuesta. |
| §2 IA — Agentes inteligentes | **EXCLUIDO** | Explícitamente fuera de alcance en el ANEXO |
| §2 IA — Aprendizaje automático continuo | **EXCLUIDO** | Explícitamente fuera de alcance |
| §4 IoT — Hardware físico | **EXCLUIDO** | Solo software; sensores/instalación/mantenimiento excluidos |
| §3 AEMET — Datos históricos | **EXCLUIDO** | Explícitamente fuera de alcance |
| §5 Gobernanza — Plataforma social | **EXCLUIDO** | Solo mecanismos controlados de aportación |

---

## 7. RIESGOS Y CONSIDERACIONES

- **AEMET API**: Servicio público con posibles límites de rate y disponibilidad. Se requiere API key gratuita. Posibles cambios en la API sin previo aviso.
- **Sensores IoT**: La variedad de APIs de proveedores de sensores puede requerir adaptadores específicos. Se estima un máximo de 3-4 tipos de sensores/proveedores diferentes. Más proveedores incrementarían las horas de mapeo.
- **IA Predictiva**: Los modelos de complejidad media (regresión, series temporales simples) son suficientes para el alcance. Si se requieren modelos más sofisticados, las horas aumentarían significativamente.
- **Datos GeoJSON**: La migración de coordenadas a la DB requiere extensión espacial (PostGIS / SQL Server Spatial).
- **Economía Circular (§9)**: Si finalmente se incluye, agregar estimadamente **40-60h** adicionales para diseño, backend y frontend.
- **Multi-tenant**: El refactor a multi-tenant es fundamental para la replicabilidad pero agrega complejidad al modelo de datos existente.

---

*Documento generado basado en el análisis del código fuente del proyecto Conecta Futuro y el ANEXO I de Aclaraciones de Alcance.*
*Fecha: Febrero 2026*
