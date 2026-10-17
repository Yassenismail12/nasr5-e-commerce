import { useCallback, useState } from "react";
import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../api/productsAPI";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const debouncedSearch = useDebounce(search, 350);

  const fetchProducts = useCallback(async () => {
    const query = debouncedSearch.trim();
    if (query) {
      const result = await searchProducts(query);
      return result.products;
    }
    if (category) {
      const result = await getProductsByCategory(category);
      return result.products;
    }
    const result = await getProducts({ limit: 100 });
    return result.products;
  }, [category, debouncedSearch]);
  const fetchCategories = useCallback(() => getCategories(), []);

  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useFetch(fetchProducts);
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch(fetchCategories);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-semibold uppercase tracking-widest text-primary">
            Shop
          </p>
          <h1 className="mt-2 text-3xl font-bold">All products</h1>
        </div>
        <label className="form-control w-full sm:max-w-sm">
          <span className="label-text mb-2">Search products</span>
          <input
            type="search"
            className="input input-bordered"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try “laptop”"
          />
        </label>
      </div>

      {categoriesError && <ErrorMessage message={categoriesError} />}

      <div
        className="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Product categories"
      >
        <button
          type="button"
          className={`btn btn-sm ${category === "" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setCategory("")}
          aria-pressed={category === ""}
        >
          All
        </button>
        {!categoriesLoading &&
          categories?.map((item) => {
            const slug = typeof item === "string" ? item : item.slug;
            const label = typeof item === "string" ? item : item.name;
            return (
              <button
                type="button"
                key={slug}
                className={`btn btn-sm capitalize ${category === slug ? "btn-primary" : "btn-outline"}`}
                onClick={() => setCategory(slug)}
                aria-pressed={category === slug}
              >
                {label}
              </button>
            );
          })}
      </div>

      {productsLoading && <Loader />}
      {productsError && <ErrorMessage message={productsError} />}
      {!productsLoading && !productsError && products?.length === 0 && (
        <p className="rounded-box bg-base-100 p-8 text-center">
          No products match your search.
        </p>
      )}
      {!productsLoading && !productsError && products?.length > 0 && (
        <section
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Products"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}
