// Fechas de entrada y salida
export interface FechasReserva {
  checkin: string;
  checkout: string;
}

// Datos para crear una reserva
export interface Reserva {
  roomid: number;
  firstname: string;
  lastname: string;
  depositpaid: boolean;
  email?: string;
  phone?: string;
  bookingdates: FechasReserva;
}

// Datos que devuelve la API al crear una reserva
export interface ReservaCreada {
  bookingid: number;
  roomid: number;
  firstname: string;
  lastname: string;
  depositpaid: boolean;
  bookingdates: FechasReserva;
}
