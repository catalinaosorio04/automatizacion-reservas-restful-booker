import { APIRequestContext, APIResponse } from '@playwright/test';
import { Reserva } from '../types/reserva.types';

export class ClienteReservas {

  private readonly urlBase = 'https://automationintesting.online';

  constructor(
    private readonly request: APIRequestContext,
    private readonly token: string
  ) {}

  // Preparar la autenticación para las peticiones
  private obtenerEncabezados() {
    return {
      'Content-Type': 'application/json',
      Cookie: `token=${this.token}`
    };
  }

  // Crear una reserva
  async crearReserva(reserva: Reserva): Promise<APIResponse> {
    return this.request.post(`${this.urlBase}/api/booking`, {
      headers: this.obtenerEncabezados(),
      data: reserva
    });
  }

  // Consultar una reserva por su identificador
  async consultarReserva(idReserva: number): Promise<APIResponse> {
    return this.request.get(
      `${this.urlBase}/api/booking/${idReserva}`,
      {
        headers: this.obtenerEncabezados()
      }
    );
  }

  // Consultar las reservas de una habitación
  async consultarReservas(idHabitacion: number): Promise<APIResponse> {
    return this.request.get(`${this.urlBase}/api/booking`, {
      headers: this.obtenerEncabezados(),
      params: {
        roomid: idHabitacion
      }
    });
  }

}