export default function TabNavbar({ children }: any) {
  return (
    <ul
      className="w-full flex rounded-2xl p-1"
      style={{ backgroundColor: "#EAEAEA" }}
    >
      {children}
    </ul>
  );
}
