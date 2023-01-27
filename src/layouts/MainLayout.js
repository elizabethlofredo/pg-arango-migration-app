export function MainLayout({ children }) {
  return (
    <div className="h-100">
      <div className="bg-primary p-2">
        <img height="80" src="/images/banner.png" />
      </div>
      <main className="p-4">{children}</main>
    </div>
  );
}
