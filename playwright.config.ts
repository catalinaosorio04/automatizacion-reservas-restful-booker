
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Carpeta donde se encuentran las pruebas
  testDir: './tests',

  // Permitir ejecución paralela
  fullyParallel: true,

  // Utilizar dos workers
  workers: 2,

  // Generar reporte HTML y resultados en consola
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  // Configuración general
  use: {
    baseURL: 'https://automationintesting.online',

    // Ralentizar las acciones del navegador cuando se solicite.
    launchOptions: {
      slowMo: Number(process.env.PLAYWRIGHT_SLOW_MO ?? 0)
    },

    // Guardar evidencias cuando una prueba falle
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },

  // Navegador utilizado
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
