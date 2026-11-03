# Automatización de reservas — Restful Booker Platform

## 1. Descripción

Este proyecto utiliza Playwright y TypeScript para automatizar pruebas de API e interfaz web en Restful Booker Platform.

**Aplicación:** https://automationintesting.online

El objetivo es validar la autenticación, creación y consulta de reservas, las validaciones de los datos y el flujo de reserva desde la página web.

## 2. Tecnologías utilizadas

- Playwright Test
- TypeScript
- Node.js y npm
- Git y GitHub
- Codex como agente de IA

## 3. Instalación

Para ejecutar el proyecto es necesario tener Node.js y npm instalados.

**Clonar el repositorio:**

```bash
git clone https://github.com/catalinaosorio04/automatizacion-reservas-restful-booker.git
cd automatizacion-reservas-restful-booker
```

**Instalar las dependencias:**

```bash
npm ci
```

**Instalar Chromium:**

```bash
npx playwright install chromium
```

## 4. Autenticación

El proyecto utiliza las credenciales públicas de prueba de Restful Booker (`admin` y `password`).

## 5. Ejecución de pruebas

Las pruebas de API están en `tests/api` y la prueba integrada de interfaz web y API está en `tests/integracion`.

**Ver las pruebas disponibles:**

```bash
npx playwright test --list
```

**Ejecutar todas las pruebas de API:**

```bash
npx playwright test tests/api --project=chromium
```

**Ejecutar las pruebas negativas con dos workers:**

```bash
npx playwright test tests/api/reserva-negativa.spec.ts --project=chromium --workers=2
```

**Ejecutar la prueba positiva:**

```bash
npx playwright test tests/api/reserva-positiva.spec.ts --project=chromium --workers=1
```

**Ejecutar la prueba E2E con el navegador visible:**

```bash
npx playwright test tests/integracion/reserva-ui-api.spec.ts --project=chromium --headed
```

**Ejecutar todas las pruebas con dos workers:**

```bash
npx playwright test --project=chromium --workers=2
```

## 6. Resultados y evidencias

Para abrir el último reporte HTML:

```bash
npx playwright show-report
```

Las evidencias de las ejecuciones se encuentran en docs/evidencias/, incluyendo resultados, capturas y trazas disponibles.

Los errores encontrados están documentados en docs/bugs.md.


## 7. Uso de inteligencia artificial

Para implementar la prueba E2E utilicé **Codex** como agente de IA, siguiendo las instrucciones del archivo `.agents/skills/booking/SKILL.md`.

Codex creó los archivos:

- `src/pages/PaginaReserva.ts`
- `tests/integracion/reserva.fixture.ts`
- `tests/integracion/reserva-ui-api.spec.ts`

Después revisé la implementación y realicé pruebas para comprobar el comportamiento.

Al ejecutar las pruebas se encontraron errores HTTP 500 del servicio, que también se comprobaron al utilizar la aplicación manualmente.

Se conservaron las validaciones originales y se documentaron los errores sin modificar las pruebas para que pasaran artificialmente.

## 8. Pruebas smoke y de regresión

Para las pruebas smoke, ejecutaría los escenarios principales, como la autenticación y la creación de reservas, para comprobar rápidamente que las funcionalidades básicas estén funcionando.

Para las pruebas de regresión, ejecutaría la suite completa después de realizar cambios.

## 9. Limitaciones encontradas

- La consulta individual de reservas ha devuelto HTTP 500.
- Las pruebas dependen de la disponibilidad del servicio.

## 10. Documentación adicional

- `docs/bugs.md`: errores encontrados durante las pruebas.
- `docs/casos-adicionales-priorizados.md`: tres escenarios adicionales propuestos.
- `docs/skills-propuestas.md`: tres propuestas de skills para apoyar el trabajo de QA.
- `.agents/skills/booking/SKILL.md`: instrucciones utilizadas por Codex para implementar el escenario E2E.