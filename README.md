# Sitio web Estático para prueba en S3

## Descripción del proyecto

Este proyecto es un ejemplo de sitio web estático preparado para ser alojado en Amazon S3. Incluye archivos HTML, CSS, JavaScript e imágenes, y está pensado para demostrar el proceso completo de despliegue y configuración de un sitio web estático en AWS S3, permitiendo el acceso público y siguiendo buenas prácticas de organización de archivos. El repositorio contiene además una guía paso a paso para la configuración del bucket y las políticas necesarias para la publicación exitosa del sitio.

👀 👀 Recuerden si van a alojar una web estatica no es lo correcto, pero para esta practica sirve

## Proceso de Creación de un Bucket S3 para Alojamiento Web Estático

Aquí están los pasos detallados para crear tu bucket de S3 y configurarlo para servir tu sitio web:

### Paso 1: Iniciar Sesión en la Consola de AWS

1. Abre tu navegador web y ve a la **Consola de Administración de AWS**: [https://aws.amazon.com/console/](https://aws.amazon.com/console/)
2. **Inicia sesión** con tus credenciales de AWS (cuenta raíz o usuario IAM con los permisos adecuados para S3).

### Paso 2: Navegar al Servicio S3

1. Una vez dentro de la consola, en la barra de búsqueda superior, escribe "S3" y selecciona **"S3"** bajo "Servicios". O bien, puedes encontrarlo en "Almacenamiento" dentro de la sección "Servicios" o en tu lista de "Servicios visitados recientemente".

### Paso 3: Crear un Nuevo Bucket

1. En la página de S3, haz clic en el botón **"Crear bucket"**.
2. **Configuración del Bucket:**

   - **Nombre del bucket:** Este es el nombre más importante y debe ser **único a nivel global** (en todo AWS). Además, para que S3 sirva tu sitio web estático con un dominio personalizado (si lo tuvieras en el futuro), el nombre del bucket **DEBE COINCIDIR EXACTAMENTE** con el nombre de tu dominio o subdominio. Por ejemplo, si tu sitio fuera `misitioejemplo.com`, tu bucket debería llamarse `misitioejemplo.com`. Para esta prueba, puedes usar algo como `mi-sitio-s3-prueba-tu-nombre`.
     - **Recomendación:** Usa un nombre simple, todo en minúsculas, sin espacios ni caracteres especiales.
   - **Región de AWS:** Selecciona la región geográfica más cercana a tus usuarios para reducir la latencia. Para Colombia, la región de **"Norte de Virginia (us-east-1)"** o **"Ohio (us-east-2)"** suelen ser buenas opciones.
   - **Configuración de objetos:** Puedes dejar las configuraciones predeterminadas.
   - **Configuración de Bloqueo de Acceso Público para el bucket:** Por defecto, S3 bloquea todo el acceso público para mayor seguridad. Para un sitio web estático, **NECESITARÁS DESHABILITAR ESTO**.
     - Desmarca la casilla **"Bloquear todo el acceso público"**.
     - Aparecerá un mensaje de advertencia. Deberás marcar la casilla **"Reconozco que la configuración actual puede generar que este bucket y los objetos que contiene se hagan públicos."** para confirmar. Esto es necesario para que tu sitio web sea visible.
   - **Configuración avanzada:** Puedes dejar las configuraciones predeterminadas. No necesitamos el versionamiento, etiquetado o cifrado para este sitio de prueba.

3. Haz clic en **"Crear bucket"** en la parte inferior de la página.

### Paso 4: Subir los Archivos de tu Sitio Web al Bucket

1. Una vez que el bucket se haya creado, haz clic en el **nombre de tu nuevo bucket** en la lista.
2. Dentro del bucket, haz clic en el botón **"Cargar"**.
3. Arrastra y suelta todos los archivos y carpetas de tu proyecto `mi-sitio-s3` ( `index.html`, la carpeta `css`, la carpeta `js`, y la carpeta `images` con su contenido) en el área de carga, o usa los botones "Añadir archivos" y "Añadir carpeta".
   - **Importante:** Asegúrate de que la estructura de carpetas ( `css/`, `js/`, `images/`) se mantenga al subir. S3 lo manejará automáticamente si arrastras la carpeta `mi-sitio-s3` completa o sus subcarpetas.
4. Haz clic en **"Cargar"** en la parte inferior para iniciar la subida.

### Paso 5: Configurar el Bucket para Alojamiento de Sitios Web Estáticos

1. Dentro de tu bucket, haz clic en la pestaña **"Propiedades"**.
2. Desplázate hacia abajo hasta la sección **"Alojamiento de sitios web estáticos"**.
3. Haz clic en **"Editar"**.
4. Selecciona **"Habilitar"** la opción de alojamiento de sitios web estáticos.
5. En **"Documento de índice"**, escribe `index.html`. Este es el archivo que S3 servirá cuando alguien acceda a la raíz de tu sitio.
6. En **"Documento de error"** (opcional, pero recomendado), puedes escribir `error.html` si tuvieras una página de error personalizada. Por ahora, puedes dejarlo vacío o poner `index.html` también.
7. Haz clic en **"Guardar cambios"**.

### Paso 6: Configurar la Política de Bucket para Acceso Público

Aunque deshabilitaste el bloqueo de acceso público, aún necesitas una política de bucket para permitir que los objetos (tus archivos) sean leídos por el público.

1. Dentro de tu bucket, haz clic en la pestaña **"Permisos"**.

2. Desplázate hacia abajo hasta la sección **"Política de bucket"**.

3. Haz clic en **"Editar"**.

4. Pega la siguiente política en el editor de políticas. **Reemplaza `YOUR_BUCKET_NAME` con el nombre exacto de tu bucket de S3.**

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": ["s3:GetObject"],
         "Resource": ["arn:aws:s3:::YOUR_BUCKET_NAME/*"]
       }
     ]
   }
   ```

   Esta política permite que cualquier persona (`"Principal": "*"`) pueda realizar la acción `s3:GetObject` (leer objetos) en todos los objetos dentro de tu bucket (`"Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"`).

5. Haz clic en **"Guardar cambios"**.

   - **Advertencia:** Te aparecerá un mensaje indicando que el bucket ahora es público. Confirma que estás de acuerdo.

### Paso 7: Probar tu Sitio Web Estático

1. Vuelve a la pestaña **"Propiedades"** de tu bucket.
2. Desplázate de nuevo a la sección **"Alojamiento de sitios web estáticos"**.
3. Verás una **"URL de punto de enlace del sitio web"**. Haz clic en ese enlace.

! Si todo salió bien, deberías ver tu landing page de AWS S3 funcionando en tu navegador.
