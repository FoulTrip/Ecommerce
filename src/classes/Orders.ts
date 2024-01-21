import { prisma } from "@/prisma/db";
import { ScalarOrder } from "@/types/user";
import { Order } from "@prisma/client";

/**
 * OrderService - Clase para manejar las operaciones de los pedidos en la base de datos.
 */
class OrderService {
  /**
   * Crea un nuevo pedido.
   * @param {Partial<Order>} data - Los datos del pedido a crear.
   * @returns {Promise<Order>} El pedido creado.
   */
  static async create(data: ScalarOrder): Promise<Order> {
    return prisma.order.create({ data });
  }

  /**
   * Obtiene un pedido por su ID.
   * @param {string} id - El ID del pedido a obtener.
   * @returns {Promise<Order | null>} El pedido obtenido, o null si no se encontró.
   */
  static async get(id: string): Promise<Order | null> {
    return prisma.order.findUnique({ where: { id } });
  }

  /**
   * Actualiza un pedido.
   * @param {string} id - El ID del pedido a actualizar.
   * @param {Partial<Order>} data - Los nuevos datos del pedido.
   * @returns {Promise<Order>} El pedido actualizado.
   */
  static async update(id: string, data: ScalarOrder): Promise<Order> {
    return prisma.order.update({ where: { id }, data });
  }

  /**
   * Elimina un pedido.
   * @param {string} id - El ID del pedido a eliminar.
   * @returns {Promise<Order>} El pedido eliminado.
   */
  static async delete(id: string): Promise<Order> {
    return prisma.order.delete({ where: { id } });
  }
}

export default OrderService