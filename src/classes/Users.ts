import { prisma } from "@/prisma/db";
import { ScalarUser } from "@/types/user";
import { User, Role } from "@prisma/client";
import bcrypt from "bcrypt";

/**
 * UserService - Clase para manejar las operaciones de los usuarios en la base de datos.
 */
class UserService {
  /**
   * Crea un nuevo usuario.
   * @param {Partial<User>} data - Los datos del usuario a crear.
   * @returns {Promise<User>} El usuario creado.
   */
  static async create(data: ScalarUser): Promise<User> {
    const existEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existEmail) {
      throw new Error("El correo electronico ya esta en uso");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  /**
   * Obtiene un usuario por su ID.
   * @param {string} id - El ID del usuario a obtener.
   * @returns {Promise<User | null>} El usuario obtenido, o null si no se encontró.
   */
  static async get(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  /**
   * Actualiza un usuario.
   * @param {string} id - El ID del usuario a actualizar.
   * @param {Partial<User>} data - Los nuevos datos del usuario.
   * @returns {Promise<User>} El usuario actualizado.
   */
  static async update(
    id: string,
    data: Omit<ScalarUser, "password">
  ): Promise<User> {
    return await prisma.user.update({ where: { id }, data });
  }

  /**
   * Actualiza la contraseña de un usuario.
   * @param {string} id - El ID del usuario a actualizar.
   * @param {string} password - La nueva contraseña del usuario.
   * @returns {Promise<User>} El usuario actualizado.
   */
  static async updatePassword(id: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  /**
   * Elimina un usuario.
   * @param {string} id - El ID del usuario a eliminar.
   * @returns {Promise<User>} El usuario eliminado.
   */
  static async delete(id: string): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }

  /**
   * loguea un usuario.
   * @param {string} email - El email del usuario existente.
   * @param {string} password - Contraseña del usuario existente.
   * @returns {Promise<User>} El usuario existente.
   * @throws {Error} Si las credenciales son incorrectas.
   */
  static async signin(email: string, password: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciales inválidas");
    }

    return user;
  }

  /**
   * Cambia el rol de un usuario.
   * @param {string} id - El ID del usuario a actualizar.
   * @param {Role} role - El nuevo rol del usuario.
   * @returns {Promise<User>} El usuario actualizado.
   */
  static async changeRole(id: string, role: Role): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { role },
    });
  }
}

export default UserService;
