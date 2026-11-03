# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: integracion\reserva-ui-api.spec.ts >> UI + API - confirmar y consultar la misma reserva
- Location: tests\integracion\reserva-ui-api.spec.ts:5:5

# Error details

```
Error: GET /api/room/1

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - status [ref=f1e4]
  - alert [ref=f1e6]
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | import { ReservaCreada } from '../../src/types/reserva.types';
  3  | import { test } from './reserva.fixture';
  4  | 
  5  | test('UI + API - confirmar y consultar la misma reserva', async ({ paginaReserva, clienteReservas, reserva }) => {
  6  |   const { roomid, bookingdates, firstname, lastname, depositpaid } = reserva;
  7  | 
  8  |   const detalle = await paginaReserva.seleccionarHabitacion(reserva);
> 9  |   expect(detalle.status(), `GET /api/room/${roomid}`).toBe(200);
     |                                                       ^ Error: GET /api/room/1
  10 | 
  11 |   await paginaReserva.abrirFormulario();
  12 |   const creacion = await paginaReserva.enviarReserva(reserva);
  13 |   expect(creacion.status(), 'Creación de la reserva desde el formulario').toBe(201);
  14 |   expect(creacion.request().postDataJSON()).toMatchObject({ ...reserva });
  15 |   const { bookingid }: ReservaCreada = await creacion.json();
  16 |   expect(Number.isInteger(bookingid)).toBe(true);
  17 |   expect(bookingid).toBeGreaterThan(0);
  18 | 
  19 |   await expect(paginaReserva.confirmacion()).toBeVisible();
  20 |   await expect(paginaReserva.fechasConfirmadas(bookingdates.checkin, bookingdates.checkout)).toBeVisible();
  21 | 
  22 |   const consulta = await clienteReservas.consultarReserva(bookingid);
  23 |   expect(consulta.status(), `Consulta de la reserva ${bookingid} creada por la UI`).toBe(200);
  24 |   expect(await consulta.json()).toMatchObject({
  25 |     bookingid,
  26 |     roomid,
  27 |     bookingdates,
  28 |     firstname,
  29 |     lastname,
  30 |     depositpaid
  31 |   });
  32 | });
  33 | 
```