Cómo conectar Firebase Realtime Database a una app Ionic usando environment.ts
1. Crear el proyecto en Firebase
Ingresa a Firebase Console

Crea un nuevo proyecto

Activa Realtime Database (modo de prueba si estás desarrollando)

2. Obtener configuración del proyecto
Ve a “Configuración del proyecto” en Firebase

En la sección "Tus apps", haz clic en el ícono </> para registrar una app web

Copia la configuración que Firebase te da (tiene valores como apiKey, databaseURL, etc.)

3. Agregar la configuración a environment.ts
Abre el archivo src/environments/environment.ts

Agrega el bloque de configuración de Firebase dentro del objeto environment, así:


export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_DOMINIO.firebaseapp.com",
    databaseURL: "https://TU_DOMINIO.firebaseio.com",
    projectId: "TU_ID",
    storageBucket: "TU_BUCKET.appspot.com",
    messagingSenderId: "TU_MENSAJES",
    appId: "TU_APP_ID"
  }
};

4. Instalar Firebase y AngularFire
Desde la terminal, instala los paquetes necesarios:

npm install firebase @angular/fire
