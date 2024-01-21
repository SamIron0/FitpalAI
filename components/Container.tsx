const Container = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="p-5 justify-center items-center flex bg-black rounded-lg w-full border-[1px] border-gray-600 ">
      {children}
    </div>
  );
};
export default Container;
