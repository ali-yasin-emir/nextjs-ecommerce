import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./action";
import formatPrice from "@/lib/format";

export const metadata = {
  title: "Your Cart - Flowmazon",
};

const CartPage = async () => {
  const cart = await getCart();

  return (
    <div className="flex pb-24 flex-col gap-6 max-md:gap-4 max-md:px-12 pt-24">
      <h1 className="py-12 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <div className="">
        <p>Your cart is empty.</p>
        </div>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
