export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="h-40 bg-gray-200 rounded-lg mb-4" />
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-7 bg-gray-200 rounded w-1/3" />
    </div>
  );
}
