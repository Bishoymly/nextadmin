export default function Page({ children }) {
  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-4">{children}</div>
  );
}
