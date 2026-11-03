import { test, expect } from '@playwright/test';
import { ClienteAutenticacion } from '../../src/api/ClienteAutenticacion';

test('Obtener un token de autenticación válido', async ({ request }) => {

  // Crear el cliente de autenticación
  const clienteAutenticacion = new ClienteAutenticacion(request);

  // Iniciar sesión y obtener el token
  const token = await clienteAutenticacion.iniciarSesion();

  //console.log('Token obtenido:', token);

  // Verificar que recibimos un token
  expect(token.length).toBeGreaterThan(0);

});