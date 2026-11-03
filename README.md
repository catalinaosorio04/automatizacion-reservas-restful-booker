# Automatización de reservas — Restful Booker Platform

## 1. Descripción

Este proyecto utiliza Playwright y TypeScript para automatizar pruebas de API en Restful Booker Platform.

**Aplicación:** https://automationintesting.online

El objetivo es validar la autenticación, creación y consulta de reservas, así como las validaciones de los datos enviados a la API.

## 2. Tecnologías utilizadas

- Playwright Test
- TypeScript
- Node.js y npm
- Git y GitHub

## 3. Instalación

Para ejecutar el proyecto es necesario tener Node.js y npm instalados y contar con conexión a internet.

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

Las pruebas de API están en `tests/api`.

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

**Ejecutar todas las pruebas con dos workers:**

```bash
npx playwright test --project=chromium --workers=2
```

## 6. Resultados y evidencias

Para abrir el último reporte HTML:

```bash
npx playwright show-report
```

Las evidencias se guardan en `docs/evidencias`, incluyendo los resultados de ejecución y las trazas de los errores encontrados.

Los códigos de salida permiten identificar si una ejecución terminó correctamente (`0`) o presentó fallos (un código diferente de `0`).

### Resultados obtenidos

**Pruebas negativas:** se ejecutaron dos casos con nombres inválidos utilizando dos workers. Ambas pruebas pasaron correctamente.

**Prueba positiva:** se logró crear una reserva con HTTP 201, pero al consultar sus datos por ID la API devolvió HTTP 500. La prueba completa terminó fallando.

El error encontrado está documentado en `docs/bugs.md` como BUG-001.

## 7. Pruebas smoke y de regresión

Para las pruebas smoke, ejecutaría los escenarios principales, como la autenticación y la creación de reservas, para comprobar rápidamente que las funcionalidades básicas estén funcionando.

Para las pruebas de regresión, ejecutaría la suite completa después de realizar cambios.

## 8. Limitaciones encontradas

- La consulta individual de reservas ha devuelto HTTP 500.
- Las pruebas dependen de la disponibilidad del servicio.

## 9. Documentación adicional

- `docs/bugs.md`: errores encontrados durante las pruebas API.
- `docs/casos-adicionales-priorizados.md`: tres escenarios adicionales propuestos.
- `docs/skills-propuestas.md`: tres propuestas para apoyar el trabajo de QA.
