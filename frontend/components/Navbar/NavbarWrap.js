export default function NavbarWrap({ children }) {
  return (
    <div className="border-primary w-full border-b-2 bg-white">
      <div className="mx-auto max-w-screen-2xl">{children}</div>
    </div>
  );
}
