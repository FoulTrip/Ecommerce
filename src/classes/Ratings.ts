import { prisma } from "@/prisma/db";
import { Rating } from "@prisma/client";

/**
 * RatingService - Clase para manejar las operaciones de las calificaciones en la base de datos.
 */
class RatingService {
  /**
   * Agrega una calificación a un producto.
   * @param {string} productId - El ID del producto a calificar.
   * @param {string} userId - El ID del usuario que realiza la calificación.
   * @param {number} value - El valor de la calificación.
   * @returns {Promise<Rating>} La calificación creada.
   */
  static async addRating(
    productId: string,
    userId: string,
    value: number
  ): Promise<Rating> {
    return prisma.rating.create({
      data: {
        value,
        productId,
        userId,
      },
    });
  }
}

export default RatingService;
