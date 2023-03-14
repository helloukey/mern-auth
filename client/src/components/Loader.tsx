type Props = {};
const Loader = (props: Props) => {
  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center">
      <button className="btn btn-circle loading w-16 h-16"></button>
    </div>
  );
};
export default Loader;
