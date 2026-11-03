## Caso 1. Evitar reservas con fechas ocupadas

**Prioridad:** Alta

**Tipo de prueba:** Negativa 

**Escenario:** Intentar crear una reserva en una habitación que ya tiene una reserva para las mismas fechas.

**Resultado esperado:** El sistema debe rechazar la reserva cuando las fechas se solapan y no debe generar una reserva adicional.

**Riesgo que cubre:** Evitar reservas duplicadas para una misma habitación y fechas, lo que podría ocasionar conflictos de disponibilidad para los huéspedes.

## Caso 2. Validar fechas de reserva incorrectas

**Prioridad:** Alta

**Tipo de prueba:** Negativa 

**Escenario:** Intentar crear una reserva cuya fecha de salida sea anterior o igual a la fecha de entrada.

**Resultado esperado:** El sistema debe rechazar la solicitud y devolver un error de validación, sin crear la reserva.

**Riesgo que cubre:** Evitar registros con períodos de alojamiento inválidos que afecten la disponibilidad y la integridad de los datos.

## Caso 3. Validar la información de una reserva en la interfaz

**Prioridad:** Media

**Tipo de prueba:** Funcional

**Escenario:** Completar una reserva desde la interfaz y verificar que la confirmación muestre correctamente los datos del huésped.

**Resultado esperado:** La confirmación debe mostrar información coherente con los datos ingresados por el usuario.

**Riesgo que cubre:** Evitar que el usuario reciba información incorrecta o incompleta sobre su reserva, aun cuando el sistema haya procesado la solicitud.

## Justificación de la priorización

Los dos primeros escenarios tienen prioridad alta porque protegen la disponibilidad de habitaciones y la validez de las reservas.

El tercer escenario tiene prioridad media porque se concentra en la información presentada al usuario después de realizar la reserva.

