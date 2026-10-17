import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="hero overflow-hidden rounded-3xl bg-primary text-primary-content">
        <div className="hero-content flex-col gap-8 py-12 text-center sm:py-20">
          <div className="max-w-2xl">
            <p className="mb-3 font-semibold uppercase tracking-[0.2em]">
              Welcome to ShopEasy
            </p>
            <h1 className="text-4xl font-bold sm:text-6xl">
              Find something you love.
            </h1>
            <p className="mt-5 text-lg opacity-90">
              Browse a curated range of everyday finds and add your favorites
              to your cart.
            </p>
            <Link to="/products" className="btn btn-secondary mt-8">
              Browse products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
