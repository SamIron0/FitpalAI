const Container = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="p-5 justify-center items-center flex flex-col bg-zinc-800 rounded-lg w-full border-[1px] border-zinc-800 ">
      {children}
    </div>
  );
};
export default Container;
