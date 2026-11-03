# BUG-001 — Error 500 al consultar una reserva

**Ambiente:** https://automationintesting.online

**Severidad:** Alta

## Descripción

Al intentar consultar una reserva existente por su ID, la API devuelve un error 500

## Pasos para reproducir

1. Iniciar sesión mediante `POST /api/auth/login`.
2. Consultar las reservas con `GET /api/booking?roomid=1`.
3. Tomar el ID de una reserva existente, por ejemplo, `1`.
4. Consultar esa reserva con `GET /api/booking/1`.

## Resultado esperado

La API debería responder con estado 200 y mostrar los datos de la reserva

## Resultado obtenido

La API responde con estado 500 

## Evidencia

Al consultar el listado de reservas, la API respondió 200 y mostró la reserva con ID 1. Sin embargo, al consultar esa misma reserva por su ID, devolvió un error 500.

## Impacto

Este error impide consultar y validar los datos de una reserva individual


# BUG-002 — Error 500 al intentar reservar una habitación

**Ambiente:** https://automationintesting.online

**Severidad:** Alta

## Descripción

Al seleccionar una habitación para realizar una reserva, la aplicación no permite continuar al formulario debido a un error HTTP 500 al consultar los detalles de la habitación.

El problema también se había identificado durante una prueba manual desde el navegador.

## Pasos para reproducir

1. Abrir la página principal.
2. Seleccionar las fechas de entrada y salida.
3. Hacer clic en **Check Availability**.
4. Seleccionar la habitación con ID 1 mediante **Book now**.

## Resultado esperado

La aplicación debería cargar los detalles de la habitación y permitir continuar al formulario para ingresar los datos del huésped.

## Resultado obtenido

La petición `GET /api/room/1` devuelve HTTP 500 (`Internal Server Error`), impidiendo continuar con el flujo de reserva.

## Evidencia

- Ejecución fallida de `tests/integracion/reserva-ui-api.spec.ts`.
- Captura generada por Playwright durante el fallo.
- Traza de Playwright que registra la petición HTTP 500.

## Impacto

Este error impide completar el escenario de reserva desde la interfaz web y bloquea la validación posterior mediante API.