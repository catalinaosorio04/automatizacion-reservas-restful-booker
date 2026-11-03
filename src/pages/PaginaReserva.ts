import { Page } from '@playwright/test';
import { Reserva } from '../types/reserva.types';

export class PaginaReserva {
  constructor(private readonly page: Page) {}

  readonly confirmacion = () =>
    this.page.getByRole('heading', { name: 'Booking Confirmed', exact: true });

  fechasConfirmadas(checkin: string, checkout: string) {
    return this.page.getByText(`${checkin} - ${checkout}`, { exact: true });
  }

  async seleccionarHabitacion(reserva: Pick<Reserva, 'roomid' | 'bookingdates'>) {
    // BookingForm suma un día al checkout de la URL al formar el fin exclusivo.
    const ultimoDia = new Date(reserva.bookingdates.checkout);
    ultimoDia.setUTCDate(ultimoDia.getUTCDate() - 1);
    const checkout = ultimoDia.toISOString().slice(0, 10);
    const { checkin } = reserva.bookingdates;
    const formatoVisible = (fecha: string) => fecha.split('-').reverse().join('/');

    await this.page.goto('/');
    const fechaEntrada = this.page.locator(
      '#booking label[for="checkin"] + .react-datepicker-wrapper input'
    );

    const fechaSalida = this.page.locator(
      '#booking label[for="checkout"] + .react-datepicker-wrapper input'
    );

    await fechaEntrada.fill(formatoVisible(checkin));
    await fechaEntrada.press('Tab');

    await fechaSalida.fill(formatoVisible(checkout));
    await fechaSalida.press('Tab');

    const [disponibilidad] = await Promise.all([
      this.page.waitForResponse(respuesta => {
        const url = new URL(respuesta.url());
        return url.pathname === '/api/room' &&
          url.searchParams.get('checkin') === checkin &&
          url.searchParams.get('checkout') === checkout;
      }),
      this.page.getByRole('button', { name: 'Check Availability', exact: true }).click()
    ]);
    if (!disponibilidad.ok()) {
      throw new Error(`La búsqueda de habitaciones devolvió HTTP ${disponibilidad.status()}`);
    }

    const rutaReserva = `/reservation/${reserva.roomid}`;
    const [detalle] = await Promise.all([
      this.page.waitForResponse(respuesta =>
        respuesta.request().method() === 'GET' &&
        new URL(respuesta.url()).pathname === `/api/room/${reserva.roomid}`,
        { timeout: 5_000 }
      ),
      this.page.locator(`#rooms a[href="${rutaReserva}?checkin=${checkin}&checkout=${checkout}"]`).click()
    ]);
    return detalle;
  }

  async abrirFormulario() {
    await this.page.getByRole('button', { name: 'Reserve Now', exact: true }).click({ timeout: 5_000 });
  }

  async enviarReserva(huesped: Required<Pick<Reserva, 'firstname' | 'lastname' | 'email' | 'phone'>>) {
    await this.page.getByRole('textbox', { name: 'Firstname', exact: true }).fill(huesped.firstname);
    await this.page.getByRole('textbox', { name: 'Lastname', exact: true }).fill(huesped.lastname);
    await this.page.getByRole('textbox', { name: 'Email', exact: true }).fill(huesped.email);
    await this.page.getByRole('textbox', { name: 'Phone', exact: true }).fill(huesped.phone);

    const [respuesta] = await Promise.all([
      this.page.waitForResponse(respuesta =>
        new URL(respuesta.url()).pathname === '/api/booking' &&
        respuesta.request().method() === 'POST'
      ),
      this.page.getByRole('button', { name: 'Reserve Now', exact: true }).click()
    ]);

    return respuesta;
  }
}
