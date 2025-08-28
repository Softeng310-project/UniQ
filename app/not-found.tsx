// 404 Not Found page with custom styling
// Displays error message when users navigate to non-existent pages
export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Faint background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[25rem] font-bold text-gray-100 select-none">UniQ</h1>
      </div>
      {/* Main 404 Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 relative z-10">
        <h1 className="text-8xl font-extrabold text-[#385684]">404</h1>
        <p className="mt-6 text-3xl text-[#385684]">Page Not Found</p>
        <div className="mt-8 text-7xl text-[#385684]">˙◠˙</div>
      </main>
    </div>
  );
}