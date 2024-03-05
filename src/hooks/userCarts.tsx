import { useEffect, useState } from "react";
import CartService from "@/classes/Cart";
import { ScalarCart } from "@/types/user";

const useUserCarts = (userId: string | undefined) => {
  const [userCarts, setUserCarts] = useState<ScalarCart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCarts = async () => {
      try {
        if (userId) {
          const carts = await CartService.getByUser(userId);

          // Asegúrate de que cada objeto tenga las propiedades requeridas por el tipo Cart
          const formattedCarts: ScalarCart[] = carts.map((cart) => ({
            id: cart.id,
            quantity: cart.quantity,
            userId: cart.userId,
            productId: cart.productId,
            user: cart.userId, // Asegúrate de proporcionar un valor para la propiedad user
            product: cart.productId, // Asegúrate de proporcionar un valor para la propiedad product
          }));

          setUserCarts(formattedCarts);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserCarts();
  }, [userId]);

  return { userCarts, loading, error };
};

export default useUserCarts;
