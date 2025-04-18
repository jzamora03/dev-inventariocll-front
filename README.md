### Inventario CCL - Frontend

Este proyecto es la interfaz web del sistema de gestión de inventario desarrollado para la empresa **CCL**. Permite a los usuarios autenticados consultar productos, registrar movimientos de entrada y salida, y visualizar el historial de movimientos.

---

### Tecnologías utilizadas

- [Angular 19](https://angular.io/)
- [Bootstrap 5](https://getbootstrap.com/)
- [RxJS](https://rxjs.dev/)
- Consumo de API REST con autenticación JWT

---

### Requisitos previos

Antes de comenzar, asegúrate de tener lo siguiente instalado:

- **Node.js (v18 o superior)**  
  [Descargar Node.js](https://nodejs.org/)
- **Angular (v19 o superior)**  
  npm install -g @angular/cli
 
---

  > [!NOTE]
  > En el proyecto se encuentran unos archivos **enviroment**, en la ruta `src/environments/environment.ts` en la linea 3 `apiUrlapiUrl: 'http://localhost:xxxx'` se debe agregar el puerto en el cual se esta levantado el backend.

### **Configuración Inicial**
1. Descargar o clonar el repositorio
   
    ```bash
   git clone https://github.com/jzamora03/dev-inventariocll-front.git
   cd dev-inventariocll-front
    # Si deseas abrir el codigo desde el cmd con Visual Studio code usa
    code .
2. Instalar dependencias (presionar `CONTROL + SHIFT + Ñ` para abrir la consola, y verificar que no este en power shell, si no command prompt)
   
      ```bash
     npm install
      ```
3. Levantar el front
   
    ```bash
   ng serve
    ```
4. Luego de cargue todo en nuestro navegador
   
    ```bash
   http://localhost:4200/
    ```

5. En login usar datos quemados como
   
    ```bash
    Usuario: adminprueba
    conraseña: 321
    ```

