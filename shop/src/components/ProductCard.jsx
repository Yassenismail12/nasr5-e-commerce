import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import styles from "./ProductCard.module.css";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className={`card bg-base-100 shadow-sm ${styles.card}`}>
      <figure className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <div className="flex items-start justify-between gap-3">
          <h2 className="card-title text-base">{product.title}</h2>
          <span className="badge badge-outline capitalize">{product.category}</span>
        </div>
        <p className="text-lg font-semibold">{currency.format(product.price)}</p>
        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
