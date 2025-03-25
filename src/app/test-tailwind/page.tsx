export default function TestTailwindPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Tailwind Test
            </div>
            <p className="mt-2 text-slate-500">
              If you can see this card with styling, Tailwind is working
              correctly!
            </p>
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full bg-red-500 rounded"></div>
              <div className="h-4 w-full bg-yellow-500 rounded"></div>
              <div className="h-4 w-full bg-green-500 rounded"></div>
              <div className="h-4 w-full bg-blue-500 rounded"></div>
              <div className="h-4 w-full bg-purple-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
