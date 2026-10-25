export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-enter flex flex-1 flex-col [&>*]:w-full">
      {children}
    </div>
  );
}
