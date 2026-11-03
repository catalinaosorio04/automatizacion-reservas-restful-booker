import { APIRequestContext, expect } from '@playwright/test';

export class ClienteAutenticacion {

  constructor(private readonly request: APIRequestContext) {}

  async iniciarSesion(): Promise<string> {

    // Enviar usuario y contraseña a la API
    const respuesta = await this.request.post(
      'https://automationintesting.online/api/auth/login',
      {
        data: {
          username: process.env.AUTH_USERNAME ?? 'admin',
          password: process.env.AUTH_PASSWORD ?? 'password'
        }
      }
    );

    // Verificar que la autenticación fue exitosa
    expect(respuesta.status()).toBe(200);

    // Obtener los datos enviados por el servidor
    const datos = await respuesta.json();

    // Comprobar que recibimos un token
    expect(typeof datos.token).toBe('string');
    expect(datos.token.length).toBeGreaterThan(0);

    return datos.token;
  }
}
