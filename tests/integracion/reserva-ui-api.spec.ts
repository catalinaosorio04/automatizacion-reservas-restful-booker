import { expect } from '@playwright/test';
import { ReservaCreada } from '../../src/types/reserva.types';
import { test } from './reserva.fixture';

test('UI + API - confirmar y consultar la misma reserva', async ({ paginaReserva, clienteReservas, reserva }) => {
  const { roomid, bookingdates, firstname, lastname, depositpaid } = reserva;

  const detalle = await paginaReserva.seleccionarHabitacion(reserva);
  expect(detalle.status(), `GET /api/room/${roomid}`).toBe(200);

  await paginaReserva.abrirFormulario();
  const creacion = await paginaReserva.enviarReserva(reserva);
  expect(creacion.status(), 'Creación de la reserva desde el formulario').toBe(201);
  expect(creacion.request().postDataJSON()).toMatchObject({ ...reserva });
  const { bookingid }: ReservaCreada = await creacion.json();
  expect(Number.isInteger(bookingid)).toBe(true);
  expect(bookingid).toBeGreaterThan(0);

  await expect(paginaReserva.confirmacion()).toBeVisible();
  await expect(paginaReserva.fechasConfirmadas(bookingdates.checkin, bookingdates.checkout)).toBeVisible();

  const consulta = await clienteReservas.consultarReserva(bookingid);
  expect(consulta.status(), `Consulta de la reserva ${bookingid} creada por la UI`).toBe(200);
  expect(await consulta.json()).toMatchObject({
    bookingid,
    roomid,
    bookingdates,
    firstname,
    lastname,
    depositpaid
  });
});
