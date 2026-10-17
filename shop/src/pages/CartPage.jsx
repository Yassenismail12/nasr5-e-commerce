import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "../store/cartSlice";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold uppercase tracking-widest text-primary">
            Your order
          </p>
          <h1 className="mt-2 text-3xl font-bold">Shopping cart</h1>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => dispatch(clearCart())}
          >
            Clear cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <section className="rounded-box bg-base-100 p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-base-content/70">
            Browse the store and add something you like.
          </p>
          <Link to="/products" className="btn btn-primary mt-6">
            Browse products
          </Link>
        </section>
      ) : (
        <section className="space-y-4">
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-4 rounded-box bg-base-100 p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <img
                  src={item.thumbnail}
                  alt=""
                  className="h-20 w-20 rounded-lg object-contain"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-base-content/70">
                    {currency.format(item.price)} each
                  </p>
                </div>
                <div
                  className="join"
                  role="group"
                  aria-label={`Quantity for ${item.title}`}
                >
                  <button
                    type="button"
                    className="btn join-item btn-sm"
                    aria-label={`Decrease ${item.title} quantity`}
                    disabled={item.quantity <= 1}
                    onClick={() => dispatch(decreaseQty(item.id))}
                  >
                    -
                  </button>
                  <span className="btn join-item btn-sm pointer-events-none">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="btn join-item btn-sm"
                    aria-label={`Increase ${item.title} quantity`}
                    onClick={() => dispatch(increaseQty(item.id))}
                  >
                    +
                  </button>
                </div>
                <p className="min-w-24 text-right font-semibold">
                  {currency.format(item.price * item.quantity)}
                </p>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm text-error"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between rounded-box bg-base-100 p-5 shadow-sm">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-xl font-bold">{currency.format(total)}</span>
          </div>
        </section>
      )}
    </main>
  );
}
