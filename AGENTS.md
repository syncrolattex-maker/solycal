# AGENTS.md - Solycal Industrial CRM

## Visión del Proyecto
Construir un CRM interno e independiente para la empresa metalúrgica SOLYCAL S.L., que reciba peticiones desde la web corporativa y permita gestionar el ciclo de presupuestación y calderería. El sistema debe transmitir precisión técnica, autoridad y limpieza industrial.

## Stack Tecnológico Restringido
- **Framework:** Next.js (App Router), React, TypeScript.
- **Estilos:** Tailwind CSS.
- **Iconografía:** Lucide React.
- **Base de Datos / Backend:** Supabase (PostgreSQL) y Prisma ORM.

## Reglas de Identidad Visual (Industrial Dark Mode)
El CRM debe heredar de forma estricta la paleta de la web pública de Solycal. **TODO** el diseño debe ser en Modo Oscuro (Dark Mode por defecto). No implementes modo claro.

### 1. Paleta de Colores (Tailwind `tailwind.config.ts`)
Configura tu archivo Tailwind extendiendo los siguientes colores:
- `brand-yellow`: `#F1B541` (Acento principal para botones primarios, *hover* de links y estados "Nuevos").
- `brand-accent`: `#E5A52A` (Hover de botones primarios).
- `brand-dark`: `#0a0c0e` (Fondos de tarjetas, modales y tablas Kanban).
- `brand-black`: `#07080a` (Fondo global de la aplicación `body`).
- `brand-surface`: `#111317` (Fondos de inputs y campos de formulario).
- `brand-border`: `rgba(255, 255, 255, 0.08)` (Para separar filas de tablas y bordes de tarjetas).
- `brand-textMuted`: `#8E95A2` (Para textos secundarios, *labels* de tablas y datos auxiliares).

### 2. Tipografía y Estilos de Texto
- Configura Tailwind para usar **Plus Jakarta Sans** (`font-sans`) como tipografía principal de la interfaz y **Space Mono** (`font-mono`) exclusiva para cifras, números de presupuestos, kilos de acero, estados (status) y etiquetas numéricas.
- Los títulos de las tarjetas del Kanban deben tener la clase `tracking-tight` y los *labels* superiores en `Space Mono` deben tener `uppercase tracking-widest text-xs`.

### 3. Componentes UI y Bordes
- Elimina los radios redondeados excesivos. Usa `rounded-xl` y `rounded-2xl` para tarjetas.
- Los botones de acción primaria (`submit` o "Crear Presupuesto") deben tener fondo `bg-brand-yellow`, texto negro y bordes curvos (`rounded-full`), con tipografía `font-mono uppercase text-xs font-semibold`.
- Las tablas y fondos de tarjeta deben ser sutiles (`bg-brand-dark border border-brand-border`).

## Reglas de Arquitectura y Nomenclatura (Prisma y Next.js)
1. **Nombres Simples:** Nunca uses nombres compuestos en Prisma ni en variables de estado. Usa `client`, no `clientName`. Usa `project`, no `projectDetails`. Usa camelCase estricto (`createdAt`).
2. **Validación:** Todo *endpoint* o *Server Action* que reciba datos (como la API de captura de leads) debe validar el *payload* usando `Zod`.
3. **Cero texto decorativo:** El lenguaje de la UI debe ser neutro y técnico. Sustituye términos blandos como "Genial, hemos guardado tus cambios" por avisos directos como "Presupuesto actualizado" o "Lead convertido a Proyecto". Omite palabras como "lujo" o sinónimos clasistas.

## Estructura de Datos Base (Prisma Schema requerida)
El esquema debe contener los modelos:
- `Lead`: id, email, phone, message, status (nuevo, evaluacion, descartado).
- `Project`: id, title, status (oficina_tecnica, taller, facturado).
- `Quote`: id, projectId, amount, steelKg, estimatedHours.
