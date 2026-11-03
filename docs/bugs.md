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

