# Amigo Secreto 🎁✨

¿Listo para organizar un sorteo de Amigo Secreto o Secret Santa de manera fácil y divertida? ¡Has llegado al lugar correcto! Esta aplicación web está diseñada para que puedas asignar amigos secretos de forma justa, rápida y con un toque de diversion.

---

## Características principales 🌟

- **Agregar amigos**: Añade los nombres de tus amigos a la lista.
- **Eliminar amigos**: Elimina a cualquier amigo de la lista en caso de errores.
- **Sortear amigos**: Realiza un sorteo aleatorio para asignar amigos secretos, asegurando que nadie sea asignado a sí mismo.
- **Mostrar/ocultar amigo secreto**: Cada amigo puede ver su amigo secreto haciendo clic en un botón de "ojo" (👁️), manteniendo la privacidad del sorteo.
- **Diseño amigable**: Colores vibrantes y animaciones que dan un toque especial a la experiencia.
- **Sonido de sorteo**: Un sonido divertido se reproduce al realizar el sorteo para hacerlo más emocionante.

---

## Cómo usar 🚀

### Requisitos previos
- Un navegador web moderno (Chrome, Firefox, Edge, etc.).
- Conexión a Internet (solo para cargar fuentes y sonidos externos).

### Instrucciones
1. **Agregar amigos**:
   - Escribe el nombre de un amigo en el campo de texto y haz clic en "Añadir".
   - Repite este proceso para agregar a todos los amigos que participarán en el sorteo.

2. **Eliminar amigos**:
   - Si agregaste un nombre por error, haz clic en el botón "Eliminar" junto al nombre del amigo.

3. **Sortear amigos**:
   - Una vez que hayas agregado al menos 2 amigos, haz clic en "Sortear amigo".
   - Se reproducirá un sonido de trompetas y se realizará el sorteo.

4. **Mostrar/ocultar amigo secreto**:
   - Después del sorteo, cada amigo tendrá un botón de "ojo" (👁️) junto a su nombre.
   - Haz clic en el botón para ver quién es tu amigo secreto.
   - Haz clic nuevamente para ocultar el mensaje y mantener la privacidad para continuar con la visualizacion de los amigos secretos. 

---

## Tecnologías utilizadas 🛠️

- **HTML**: Estructura de la aplicación.
- **CSS**: Estilos y diseño mágico.
- **JavaScript**: Lógica del sorteo y funcionalidades interactivas.
- **Google Fonts**: Fuentes personalizadas para un diseño atractivo.
- **Sonido mágico**: Efecto de sonido para el sorteo (archivo local en `assets/magic-sound.mp3`).

---

## Estructura del proyecto 📂
amigo-secreto/
├── assets/
│ ├── amigo-secreto.png # Imagen del banner
│ ├── magic-sound.mp3 # Sonido mágico para el sorteo
│ └── play_circle_outline.png # Ícono para el botón de sortear
├── index.html # Archivo principal HTML
├── style.css # Estilos CSS
└── app.js # Lógica JavaScript
---

## Personalización 🎨

Si deseas personalizar el proyecto, aquí tienes algunas ideas:

1. **Cambiar colores**:
   - Modifica las variables de colores en el archivo `style.css` dentro de la sección `:root`.

   ```css
   :root {
       --color-primary: #6A1B9A; /* Morado mágico */
       --color-secondary: #F3E5F5; /* Morado claro */
       --color-button: #AB47BC; /* Morado vibrante */
       --color-text: #4A148C; /* Morado oscuro para texto */
   }
Cambiar el sonido:

Reemplaza el archivo assets/magic-sound.mp3 con otro sonido de tu preferencia.

Agregar más animaciones:

Usa @keyframes en el archivo style.css para crear nuevas animaciones.

Contribuir 🤝
¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, sigue estos pasos:

Haz un fork del repositorio.

Crea una nueva rama (git checkout -b nueva-funcionalidad).

Realiza tus cambios y haz commit (git commit -m "Agrega nueva funcionalidad").

Haz push a la rama (git push origin nueva-funcionalidad).

Abre un Pull Request y describe tus cambios.

Licencia 📄
Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo LICENSE.

Créditos 🙏
Sonido mágico: Pixabay.

Fuentes: Google Fonts.

Íconos: Material Icons.

¡Gracias por usar Amigo Secreto! Esperamos que esta herramienta haga tu sorteo más divertido y emocionante. 🎉✨