import { test, expect } from '@playwright/test';
import { ClienteAutenticacion } from '../../src/api/ClienteAutenticacion';
import { ClienteReservas } from '../../src/api/ClienteReservas';
import { Reserva } from '../../src/types/reserva.types';

test('API positiva - crear y consultar una reserva', async ({ request }) => {

  // 1. Iniciar sesión
  const autenticacion = new ClienteAutenticacion(request);
  const token = await autenticacion.iniciarSesion();
  const clienteReservas = new ClienteReservas(request, token);

  // 2. Datos de la reserva que queremos crear
  const reserva: Reserva = {
    roomid: 1,
    firstname: 'Catalina',
    lastname: 'Osorio',
    depositpaid: true,
    email: 'reserva@prueba.com',
    phone: '12345678910',
    bookingdates: {
      checkin: '',
      checkout: ''
    }
  };

  // 3. Buscar fechas disponibles
  const consultaFechas = await clienteReservas.consultarReservas(reserva.roomid);
  expect(consultaFechas.status()).toBe(200);

  const datos = await consultaFechas.json();
  expect(Array.isArray(datos.bookings)).toBe(true);

  for (let dia = 30; dia < 90; dia += 2) {
    const entrada = new Date();
    entrada.setUTCDate(entrada.getUTCDate() + dia);

    const salida = new Date(entrada);
    salida.setUTCDate(salida.getUTCDate() + 2);

    const checkin = entrada.toISOString().slice(0, 10);
    const checkout = salida.toISOString().slice(0, 10);

    const ocupada = datos.bookings.some(
      (registro: Reserva) =>
        checkin < registro.bookingdates.checkout &&
        checkout > registro.bookingdates.checkin
    );

    if (!ocupada) {
      reserva.bookingdates = { checkin, checkout };
      break;
    }
  }

  expect(reserva.bookingdates.checkin).not.toBe('');

  // 4. Crear la reserva
  const respuesta = await clienteReservas.crearReserva(reserva);
  expect(respuesta.status()).toBe(201);

  const reservaCreada = await respuesta.json();

  expect(reservaCreada.bookingid).toBeGreaterThan(0);

  console.log('Reserva creada:', reservaCreada);


  // 5. Consultar la reserva que acabamos de crear
  const consulta = await clienteReservas.consultarReserva(reservaCreada.bookingid);
  expect(consulta.status()).toBe(200);

   const reservaConsultada = await consulta.json();

   // 6. Verificar los datos de la reserva consultada
    expect(reservaConsultada).toMatchObject({
      bookingid: reservaCreada.bookingid,
      roomid: reserva.roomid,
      firstname: reserva.firstname,
      lastname: reserva.lastname,
      depositpaid: reserva.depositpaid,
      bookingdates: reserva.bookingdates
    });

});
