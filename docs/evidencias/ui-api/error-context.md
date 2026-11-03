# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: integracion\reserva-ui-api.spec.ts >> UI + API - confirmar y consultar la misma reserva
- Location: tests\integracion\reserva-ui-api.spec.ts:7:5

# Error details

```
TimeoutError: locator.click: Timeout 5000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Reserve Now', exact: true })

```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - status [ref=f1e4]
  - alert [ref=f1e6]
```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | import { Reserva } from '../types/reserva.types';
  3  | 
  4  | export class PaginaReserva {
  5  |   constructor(private readonly page: Page) {}
  6  | 
  7  |   readonly confirmacion = () =>
  8  |     this.page.getByRole('heading', { name: 'Booking Confirmed', exact: true });
  9  | 
  10 |   fechasConfirmadas(checkin: string, checkout: string) {
  11 |     return this.page.getByText(`${checkin} - ${checkout}`, { exact: true });
  12 |   }
  13 | 
  14 |   async abrirFormulario(reserva: Reserva) {
  15 |     // La página interpreta el último día seleccionado como inclusivo.
  16 |     const ultimoDia = new Date(reserva.bookingdates.checkout);
  17 |     ultimoDia.setUTCDate(ultimoDia.getUTCDate() - 1);
  18 |     const checkout = ultimoDia.toISOString().slice(0, 10);
  19 |     const { checkin } = reserva.bookingdates;
  20 |     const formatoVisible = (fecha: string) => fecha.split('-').reverse().join('/');
  21 | 
  22 |     await this.page.goto('/');
  23 |     const fechas = this.page.locator('#booking').getByRole('textbox');
  24 |     await fechas.nth(0).fill(formatoVisible(checkin));
  25 |     await fechas.nth(0).press('Tab');
  26 |     await fechas.nth(1).fill(formatoVisible(checkout));
  27 |     await fechas.nth(1).press('Tab');
  28 | 
  29 |     const [disponibilidad] = await Promise.all([
  30 |       this.page.waitForResponse(respuesta => {
  31 |         const url = new URL(respuesta.url());
  32 |         return url.pathname === '/api/room' &&
  33 |           url.searchParams.get('checkin') === checkin &&
  34 |           url.searchParams.get('checkout') === checkout;
  35 |       }),
  36 |       this.page.getByRole('button', { name: 'Check Availability', exact: true }).click()
  37 |     ]);
  38 |     if (!disponibilidad.ok()) {
  39 |       throw new Error(`La búsqueda de habitaciones devolvió HTTP ${disponibilidad.status()}`);
  40 |     }
  41 | 
  42 |     await this.page.locator(`#rooms a[href^="/reservation/${reserva.roomid}?"]`).click();
> 43 |     await this.page.getByRole('button', { name: 'Reserve Now', exact: true }).click({ timeout: 5_000 });
     |                                                                               ^ TimeoutError: locator.click: Timeout 5000ms exceeded.
  44 |   }
  45 | 
  46 |   async enviarReserva(huesped: Required<Pick<Reserva, 'firstname' | 'lastname' | 'email' | 'phone'>>) {
  47 |     await this.page.getByRole('textbox', { name: 'Firstname', exact: true }).fill(huesped.firstname);
  48 |     await this.page.getByRole('textbox', { name: 'Lastname', exact: true }).fill(huesped.lastname);
  49 |     await this.page.getByRole('textbox', { name: 'Email', exact: true }).fill(huesped.email);
  50 |     await this.page.getByRole('textbox', { name: 'Phone', exact: true }).fill(huesped.phone);
  51 | 
  52 |     const [respuesta] = await Promise.all([
  53 |       this.page.waitForResponse(respuesta =>
  54 |         new URL(respuesta.url()).pathname === '/api/booking' &&
  55 |         respuesta.request().method() === 'POST'
  56 |       ),
  57 |       this.page.getByRole('button', { name: 'Reserve Now', exact: true }).click()
  58 |     ]);
  59 | 
  60 |     return respuesta;
  61 |   }
  62 | }
  63 | 
```