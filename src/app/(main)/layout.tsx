export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start justify-start h-screen w-screen overflow-hidden">
      <div>header</div>
      <div className="p-10 flex-1 w-full h-full overflow-x-hidden overflow-y-hidden hover:overscroll-y-auto">
        {children}
      </div>
    </div>
  );
}
