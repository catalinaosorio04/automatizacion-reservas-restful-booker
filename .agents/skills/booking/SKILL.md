---
name: qa-test-automation
description: Diseñar, implementar y verificar pruebas automatizadas en diferentes proyectos, respetando su arquitectura y tecnologías.
---
## Propósito
Implementar pruebas automatizadas mantenibles, reutilizables e independientes del tipo de aplicación, siguiendo buenas prácticas de QA y principios SOLID.

## Entradas
- Repositorio y estructura del proyecto.
- Requisitos funcionales y criterios de aceptación.
- Tecnologías, herramientas y frameworks disponibles.
- Datos de prueba y configuración del entorno.
- Escenarios que se necesitan automatizar.

## Pasos
1. Analizar el proyecto antes de realizar cambios.
2. Identificar su arquitectura, tecnologías y convenciones.
3. Comprender el escenario y sus reglas de negocio.
4. Seleccionar la estrategia y el tipo de prueba adecuados.
5. Reutilizar componentes existentes antes de crear nuevos.
6. Implementar las pruebas aplicando principios SOLID, código limpio y separación de responsabilidades.
7. Incorporar aserciones técnicas y de negocio según corresponda.
8. Ejecutar las pruebas y analizar los resultados.
9. Documentar cambios, evidencias, errores y limitaciones.

## Convenciones
- Respetar la arquitectura y las convenciones del repositorio.
- Aplicar principios SOLID cuando corresponda, evitando complejidad innecesaria.
- Utilizar nombres descriptivos y mantener consistencia en el código.
- Usar POM cuando existan interfaces automatizables y el patrón sea apropiado.
- Utilizar fixtures para preparar datos, recursos y dependencias cuando el framework lo permita.
- Separar las interacciones de la aplicación de las validaciones de los escenarios.
- Priorizar selectores estables y esperas automáticas sobre tiempos fijos.
- Mantener las pruebas independientes y reutilizables.
- No asumir que todos los proyectos tienen API, UI o una tecnología específica.

## Verificación
- Identificar los comandos de instalación, compilación y ejecución definidos en el proyecto.
- Ejecutar las pruebas relacionadas con los cambios.
- Ejecutar las verificaciones adicionales disponibles cuando corresponda.
- Conservar reportes, trazas y evidencias generadas.
- Informar los comandos ejecutados y sus resultados.

## Criterios de éxito
- Los escenarios cumplen los requisitos y criterios de aceptación.
- Las aserciones verifican el comportamiento esperado.
- El código respeta la arquitectura y aplica buenas prácticas de diseño.
- Las pruebas pueden ejecutarse de forma independiente.
- Los resultados son reproducibles y verificables.
- No existen fallos conocidos sin reportar.

## Manejo de errores e información insuficiente
- No inventar requisitos, endpoints, datos ni comportamientos.
- Si falta información esencial, solicitarla antes de implementar la parte afectada.
- Si una prueba falla, investigar si el origen está en la automatización, los datos, el entorno o la aplicación.
- No modificar aserciones para ocultar defectos.
- No introducir soluciones temporales sin justificación.
- Documentar errores, bloqueos y limitaciones.
- No realizar commits ni cambios fuera del alcance sin autorización.

## Entrega
Al finalizar, informar:
- Archivos creados o modificados.
- Decisiones técnicas y principios de diseño aplicados.
- Pruebas y comandos ejecutados.
- Resultados obtenidos.
- Errores, riesgos y oportunidades de mejora.
```