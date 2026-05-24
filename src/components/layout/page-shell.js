
export function PageShell({ children }) {
  return (
    <div className="flex  flex-col  text-white">
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 ">
        {children}
      </main>
    </div>
  );
}

