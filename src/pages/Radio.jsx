import RightSidebar from "../components/common/RightSidebar";
import Sidebar from "../components/common/Sidebar";

const Radio = ({ closeDropdowns }) => {
  return (
    <div className="grid md:grid-cols-250-auto">
      <div>
        <Sidebar />
      </div>
      <div
        className="min-h-screen px-4  pb-6 lg:px-6 bg-card-dark/60 backdrop-blur-md"
        onClick={closeDropdowns}
      >
        <h1 className="text-xl font-semibold">Radio</h1>
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Radio;
