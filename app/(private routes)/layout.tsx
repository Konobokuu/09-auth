export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>{/* TODO: Add private header with user menu */}</header>
      {children}
    </div>
  );
}
