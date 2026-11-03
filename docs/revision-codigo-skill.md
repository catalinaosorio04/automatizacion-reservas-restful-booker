

## Corrección selectores de fechas

**Archivo:** `src/pages/PaginaReserva.ts`

**Problema identificado:**

Codex utilizó `.nth(0)` y `.nth(1)` para localizar los campos de fecha. Estos selectores dependían del orden de los elementos en la página.

**Corrección realizada:**

Se reemplazaron por selectores específicos para Check In y Check Out, utilizando los atributos `for="checkin"` y `for="checkout"` identificados mediante la inspección del HTML.

**Justificación:**

Se reduce la dependencia del orden de los elementos y se mejora la mantenibilidad de la automatización.

**Verificación:**

Se ejecutó el siguiente comando:

```bash
npx playwright test tests/integracion/reserva-ui-api.spec.ts --project=chromium --headed
```

**Resultado:** 1 prueba ejecutada, 1 fallida (8,3 segundos).

La automatización logró seleccionar las fechas, consultar la disponibilidad y solicitar los detalles de la habitación.

La petición `GET /api/room/1` devolvió HTTP 500 en lugar del HTTP 200 esperado.

La corrección de los selectores permitió avanzar hasta la misma petición que fallaba anteriormente. El error del servicio continúa documentado como BUG-002 en `docs/bugs.md`.

No se modificaron las aserciones para ocultar el fallo.