import { expect, test as base } from '@playwright/test';
import { ClienteAutenticacion } from '../../src/api/ClienteAutenticacion';
import { ClienteReservas } from '../../src/api/ClienteReservas';
import { PaginaReserva } from '../../src/pages/PaginaReserva';
import { Reserva, ReservaCreada } from '../../src/types/reserva.types';

type DatosReserva = Reserva & Required<Pick<Reserva, 'email' | 'phone'>>;

export const test = base.extend<{
  paginaReserva: PaginaReserva;
  clienteReservas: ClienteReservas;
  reserva: DatosReserva;
}>({
  paginaReserva: async ({ page }, use) => {
    await use(new PaginaReserva(page));
  },
  clienteReservas: async ({ request }, use) => {
    const token = await new ClienteAutenticacion(request).iniciarSesion();
    await use(new ClienteReservas(request, token));
  },
  reserva: async ({ clienteReservas }, use) => {
    const roomid = 1;
    const huesped = {
      firstname: 'Catalina',
      lastname: 'Osorio',
      email: 'reserva@example.com',
      phone: '12345678910'
    };
    const respuestaDisponibilidad = await clienteReservas.consultarReservas(roomid);
    expect(respuestaDisponibilidad.status(), 'Consulta de disponibilidad').toBe(200);
    const { bookings }: { bookings: ReservaCreada[] } = await respuestaDisponibilidad.json();
    const hoy = new Date();
    const rangos = Array.from({ length: 30 }, (_, indice) => {
      const entrada = new Date(hoy);
      entrada.setUTCDate(entrada.getUTCDate() + 90 + indice * 3);
      const salida = new Date(entrada);
      salida.setUTCDate(salida.getUTCDate() + 2);
      return {
        checkin: entrada.toISOString().slice(0, 10),
        checkout: salida.toISOString().slice(0, 10)
      };
    });
    const bookingdates = rangos.find(({ checkin, checkout }) =>
      bookings.every(({ bookingdates }) =>
        checkout <= bookingdates.checkin || checkin >= bookingdates.checkout
      )
    );
    if (!bookingdates) throw new Error(`No hay fechas disponibles para la habitación ${roomid}`);
    await use({ roomid, ...huesped, depositpaid: false, bookingdates });
  }
});
