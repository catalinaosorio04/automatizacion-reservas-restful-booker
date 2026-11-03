import { test, expect } from '@playwright/test';
import { ClienteAutenticacion } from '../../src/api/ClienteAutenticacion';
import { ClienteReservas } from '../../src/api/ClienteReservas';
import { Reserva } from '../../src/types/reserva.types';

// Dos nombres inválidos para la prueba
const nombresInvalidos = ['Mc', 'CatalinaOsorioVargas'];

for (const nombre of nombresInvalidos) {

  test(`No permitir reserva con nombre ${nombre}`, async ({ request }) => {

    // 1. Obtener el token
    const autenticacion = new ClienteAutenticacion(request);
    const token = await autenticacion.iniciarSesion();
    const clienteReservas = new ClienteReservas(request, token);

    // 2. Preparar la reserva inválida
    const entrada = new Date();
    entrada.setUTCDate(entrada.getUTCDate() + 60);

    const salida = new Date(entrada);
    salida.setUTCDate(salida.getUTCDate() + 2);

    const reserva: Reserva = {
      roomid: 1,
      firstname: nombre,
      lastname: 'Prueba',
      depositpaid: true,
      bookingdates: {
        checkin: entrada.toISOString().slice(0, 10),
        checkout: salida.toISOString().slice(0, 10)
      }
    };

    // 3. Intentar crear la reserva
    const respuesta = await clienteReservas.crearReserva(reserva);

    // 4. Verificar que fue rechazada
    expect(respuesta.status()).toBe(400);

    const error = await respuesta.json();
    expect(error.errors).toContain('size must be between 3 and 18');

    // 5. Verificar que no aparece en las reservas
    const consulta = await clienteReservas.consultarReservas(1);
    expect(consulta.status()).toBe(200);

    const datos = await consulta.json();

    const existe = datos.bookings.some(
      (registro: Reserva) =>
        registro.firstname === reserva.firstname &&
        registro.lastname === reserva.lastname &&
        registro.bookingdates.checkin === reserva.bookingdates.checkin &&
        registro.bookingdates.checkout === reserva.bookingdates.checkout
    );

    expect(existe).toBe(false);

  });
}