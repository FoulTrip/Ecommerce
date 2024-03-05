import { prisma } from "@/prisma/db";
import { ScalarCart } from "@/types/user";
import { Cart } from "@prisma/client";

/**
 * CartService - Clase para manejar las operaciones de los carritos en la base de datos.
 */
class CartService {
  /**
   * Crea un nuevo carrito.
   * @param {Partial<Cart>} data - Los datos del carrito a crear.
   * @returns {Promise<Cart>} El carrito creado.
   */
  static async create(data: ScalarCart): Promise<Cart> {
    return prisma.cart.create({ data });
  }

  /**
   * Obtiene un carrito por su ID.
   * @param {string} id - El ID del carrito a obtener.
   * @returns {Promise<Cart | null>} El carrito obtenido, o null si no se encontró.
   */
  static async get(id: string): Promise<Cart | null> {
    return prisma.cart.findUnique({ where: { id } });
  }

  /**
   * Actualiza un carrito.
   * @param {string} id - El ID del carrito a actualizar.
   * @param {Partial<Cart>} data - Los nuevos datos del carrito.
   * @returns {Promise<Cart>} El carrito actualizado.
   */
  static async update(id: string, data: ScalarCart): Promise<Cart> {
    return prisma.cart.update({ where: { id }, data });
  }

  /**
   * Elimina un carrito.
   * @param {string} id - El ID del carrito a eliminar.
   * @returns {Promise<Cart>} El carrito eliminado.
   */
  static async delete(id: string): Promise<Cart> {
    return prisma.cart.delete({ where: { id } });
  }

  /**
   * Obtiene todos los carritos que pertenecen a un usuario.
   * @param {string} userId - El ID del usuario.
   * @returns {Promise<Cart[]>} Lista de carritos del usuario.
   */
  static async getByUser(userId: string): Promise<Cart[]> {
    return prisma.cart.findMany({ where: { userId } });
  }
}

export default CartService;
