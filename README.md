# IAcierta

IAcierta es una aplicación web lúdico-educativa basada en el formato del juego televisivo *Pasapalabra*. Permite a los usuarios responder preguntas y comparar sus respuestas en tiempo real con las de ChatGPT (GPT-3.5 Turbo o GPT-4o Mini). Desarrollada como parte de un Trabajo de Fin de Grado (ETSIT-UPM), tiene como objetivo evaluar el rendimiento lingüístico de modelos de lenguaje en español e inglés de forma interactiva y entretenida.

## Características

- Competencia en tiempo real contra un modelo de IA.
- Visualización del rendimiento del usuario frente a ChatGPT.
- Rosco numérico con colores para aciertos y errores.
- Evaluación basada en preguntas reales del juego y definiciones de la RAE y Cambridge.
- Ideal para estudios comparativos y para usuarios interesados en mejorar su vocabulario.

## Potencial investigativo

La aplicación permite ampliar la muestra de usuarios para futuros análisis sobre el rendimiento de modelos de lenguaje frente a personas reales.

## Tecnologías utilizadas

- Frontend: Angular
- Backend: Spring Boot
- Base de datos: MongoDB
- Integración IA: OpenAI API

PARA ARRANCAR EN LOCAL
**BACKEND**
Desde IAcierta: 
    - **mvn clean install** para instalar dependencias
    - **mvn spring-boot:run** para arrancar

**FRONTEND**
Desde IAcierta/frontend:
    - **npm install** para instalar dependencias
    - **ng build** para construir
    - **ng serve** para arrancar