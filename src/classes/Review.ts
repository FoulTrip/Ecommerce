import { prisma } from "@/prisma/db";
import { Review } from "@prisma/client";

/**
 * ReviewService - Clase para manejar las operaciones de las revisiones en la base de datos.
 */
class ReviewService {
  /**
   * Agrega una reseña a un producto.
   * @param {string} productId - El ID del producto a reseñar.
   * @param {string} userId - El ID del usuario que realiza la reseña.
   * @param {string} content - El contenido de la reseña.
   * @returns {Promise<Review>} La reseña creada.
   */
  static async addReview(
    productId: string,
    userId: string,
    content: string
  ): Promise<Review> {
    return prisma.review.create({
      data: {
        content,
        productId,
        userId,
      },
    });
  }
}

export default ReviewService;
