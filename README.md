# Descripcion General:
 - Junto con Nextjs usamos TypeScript para mejorar la tipificación y proporcionar una estructura más robusta al código.
 - Se emplea la biblioteca bcrypt para el hash y verificación de contraseñas, garantizando la seguridad de las credenciales de usuario.
 - Las operaciones de la base de datos se realizan a través de Prisma, que actúa como ORM (Object-Relational Mapping) para MongoDB.
 - Se ha implementado el manejo de tokens JWT para la autenticación de usuarios, proporcionando una capa adicional de seguridad.
 - El código está organizado en módulos y clases, siguiendo buenas prácticas de diseño de código para facilitar el mantenimiento y escalabilidad del sistema.
Este sistema desarrollado con Next.js, TypeScript, Prisma y MongoDB proporciona una base sólida para la creación y gestión de un comercio electrónico, con funciones de usuarios, productos, pedidos y seguridad implementadas de manera robusta y profesional.

# Documentación Detallada del Código

## Clase UserService
La clase UserService se encarga de gestionar las operaciones relacionadas con los usuarios en la base de datos. Está diseñada para interactuar con la base de datos utilizando Prisma y MongoDB. Aquí se describen las principales funciones de la clase:

### Función create(data: ScalarUser): Promise<User>
Esta función se utiliza para crear un nuevo usuario en la base de datos. Recibe un objeto data que contiene la información del usuario, como el correo electrónico y la contraseña. La contraseña se almacena encriptada usando el algoritmo bcrypt. Si el correo electrónico ya está en uso, se lanzará un error.

### Función get(id: string): Promise<User | null>
Obtiene un usuario por su ID. Devuelve el usuario correspondiente al ID proporcionado o null si no se encuentra ningún usuario.

### Función update(id: string, data: Omit<ScalarUser, "password">): Promise<User>
Actualiza la información de un usuario identificado por su ID. La función toma el ID del usuario y un objeto data con los nuevos datos del usuario, excluyendo la contraseña.

### Función updatePassword(id: string, password: string): Promise<User>
Actualiza la contraseña de un usuario identificado por su ID. La nueva contraseña se almacena encriptada.

### Función delete(id: string): Promise<User>
Elimina un usuario de la base de datos según su ID.

### Función signin(email: string, password: string): Promise<User>
Realiza el proceso de autenticación para un usuario. Verifica si las credenciales proporcionadas (correo electrónico y contraseña) coinciden con algún usuario en la base de datos. Devuelve el usuario si la autenticación es exitosa, de lo contrario, lanza un error.

### Función changeRole(id: string, role: Role): Promise<User>
Cambia el rol de un usuario identificado por su ID. Puede asignar roles como USER o ADMIN.

## Clase TokenService
La clase TokenService se encarga de manejar la creación y verificación de tokens JWT (JSON Web Tokens). Está diseñada para interactuar con la biblioteca jsonwebtoken.

### Función createToken(payload: object, secret: string): string
Crea un token JWT utilizando un payload y una clave secreta proporcionada.

### Función verifyToken(token: string, secret: string): object | null
Verifica un token JWT utilizando la clave secreta proporcionada. Devuelve el payload si la verificación es exitosa, de lo contrario, devuelve null.

## Clase ReviewService
La clase ReviewService gestiona las operaciones relacionadas con las revisiones de productos en la base de datos.

### Función addReview(productId: string, userId: string, content: string): Promise<Review>
Añade una reseña a un producto identificado por su ID. La reseña incluye el contenido, el ID del usuario que la realiza y el ID del producto asociado.

## Clase RatingService
La clase RatingService gestiona las operaciones relacionadas con las calificaciones de productos en la base de datos.

### Función addRating(productId: string, userId: string, value: number): Promise<Rating>
Añade una calificación a un producto identificado por su ID. La calificación incluye el valor de la calificación, el ID del usuario que la realiza y el ID del producto asociado.

## Clase ProductService
La clase ProductService se encarga de las operaciones relacionadas con los productos en la base de datos.

### Función create(data: ScalarProduct): Promise<Product>
Crea un nuevo producto en la base de datos. Incluye la creación de imágenes asociadas al producto y las dimensiones del mismo.

### Función get(id: string): Promise<Product | null>
Obtiene un producto por su ID. Devuelve el producto correspondiente al ID proporcionado o null si no se encuentra ningún producto.

### Función update(id: string, data: ScalarProduct): Promise<Product>
Actualiza la información de un producto identificado por su ID. Incluye la actualización de imágenes asociadas al producto y las dimensiones del mismo.

### Función delete(id: string): Promise<Product>
Elimina un producto de la base de datos según su ID. También elimina las imágenes asociadas al producto.

## Clase OrderService
La clase OrderService gestiona las operaciones relacionadas con los pedidos en la base de datos.

### Función create(data: ScalarOrder): Promise<Order>
Crea un nuevo pedido en la base de datos.

### Función get(id: string): Promise<Order | null>
Obtiene un pedido por su ID. Devuelve el pedido correspondiente al ID proporcionado o null si no se encuentra ningún pedido.

### Función update(id: string, data: ScalarOrder): Promise<Order>
Actualiza la información de un pedido identificado por su ID.

### Función delete(id: string): Promise<Order>
Elimina un pedido de la base de datos según su ID.

## Clase CartService
La clase CartService gestiona las operaciones relacionadas con los carritos en la base de datos.

### Función create(data: ScalarCart): Promise<Cart>
Crea un nuevo carrito en la base de datos.

### Función get(id: string): Promise<Cart | null>
Obtiene un carrito por su ID. Devuelve el carrito correspondiente al ID proporcionado o null si no se encuentra ningún carrito.

### Función update(id: string, data: ScalarCart): Promise<Cart>
Actualiza la información de un carrito identificado por su ID.

### Función delete(id: string): Promise<Cart>
Elimina un carrito de la base de datos según su ID.

## Modelo de Datos
El código incluye un modelo de datos definido en Prisma, que representa las entidades y relaciones en la base de datos MongoDB. Se incluyen modelos como User, Product, Rating, Review, Order, Cart, entre otros, con atributos y relaciones bien definidas.
El esquema de la base de datos utiliza MongoDB como proveedor de datos y está diseñado para soportar un sistema de comercio electrónico. Incluye modelos para usuarios, productos, calificaciones, reseñas, pedidos, carritos, entre otros.