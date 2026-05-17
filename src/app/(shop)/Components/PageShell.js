export function PageShellMain({ children }) {
  return (
    <div className="flex flex-col bg-[#0B0F19] text-white min-h-screen">
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col mt-20 md:mt-25 px-4 flex-1">
        {children}
      </main>
    </div>
  );
}

