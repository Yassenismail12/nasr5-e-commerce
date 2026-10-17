export default function Loader() {
  return (
    <div className="flex justify-center p-20" role="status" aria-label="Loading">
      <span className="loading loading-spinner loading-lg" aria-hidden="true" />
    </div>
  );
}