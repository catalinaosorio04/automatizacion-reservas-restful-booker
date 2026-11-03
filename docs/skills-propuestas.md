## 1. Preparación de datos de prueba

**Prioridad:** Media

**Propósito:** Esta skill ayudaría a generar datos para ejecutar pruebas positivas, negativas y de valores límite, teniendo en cuenta las reglas del sistema.

**Usuario:** QA encargado de diseñar y ejecutar pruebas.

**Entradas:** Requerimientos, reglas de validación y escenarios de prueba.

**Salidas:** Datos válidos, inválidos y de valores límite, junto con los resultados esperados.

**Verificación:** Revisaría que los datos generados cumplan con las reglas del sistema y sirvan para ejecutar los escenarios.

La idea sería facilitar la preparación de datos sin tener que pensar manualmente en todas las combinaciones.

## 2. Análisis de requerimientos

**Prioridad:** Alta

**Propósito:** Esta skill ayudaría a revisar historias de usuario y criterios de aceptación para identificar escenarios de prueba, posibles inconsistencias o información que haga falta aclarar.

**Usuario:** QA, analistas funcionales y desarrolladores.

**Entradas:** Historias de usuario, criterios de aceptación y reglas de negocio.

**Salidas:** Escenarios de prueba propuestos, dudas y posibles riesgos.

**Verificación:** Compararía los escenarios que propone el agente con los criterios de aceptación para comprobar que tengan sentido y no se estén dejando cosas importantes por fuera.

Esto permitiría tener una mejor idea de lo que debemos probar antes de comenzar la automatización.

## 3. Análisis de despliegues

**Prioridad:** Alta

**Propósito:** Esta skill serviría para revisar los cambios realizados en una nueva versión y sugerir qué funcionalidades sería importante volver a probar.

**Usuario:** QA, desarrolladores y personas encargadas de los despliegues.

**Entradas:** Cambios realizados, bugs corregidos y resultados de las pruebas automatizadas.

**Salidas:** Funcionalidades que podrían verse afectadas, riesgos y pruebas smoke o de regresión recomendadas.

**Verificación:** Revisaría que las pruebas recomendadas tengan relación con los cambios realizados y con los resultados reales de las ejecuciones.

También podría revisar los resultados de las pruebas automatizadas y señalar posibles problemas antes del despliegue.

## ¿Cuál implementaría primero?

Implementaría primero la **skill de análisis de requerimientos**, porque considero que antes de comenzar a probar es importante entender bien qué debe hacer el sistema.

Esto ayudaría a identificar escenarios que podríamos pasar por alto y a aclarar dudas desde el principio.

## ¿Cómo sabría si es útil?

Compararía el tiempo que me toma analizar los requerimientos con y sin la skill. También revisaría si propone escenarios útiles, identifica dudas reales y cuántas correcciones tengo que hacerle.

## ¿Por qué usar una skill y no un script o una fixture?

Utilizaría una skill cuando necesite analizar información o generar propuestas que requieran interpretación.

En cambio, usaría un script para tareas repetitivas, como ejecutar pruebas o generar reportes, y una fixture de Playwright para preparar recursos que las pruebas necesitan