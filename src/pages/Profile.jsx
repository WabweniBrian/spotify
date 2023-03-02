import { useSelector } from "react-redux";
import RightSidebar from "../components/common/RightSidebar";
import Sidebar from "../components/common/Sidebar";
import { userStore } from "../features/authSlice";

const Profile = ({ closeDropdowns }) => {
  const { user } = useSelector(userStore);
  return (
    <div className="grid md:grid-cols-250-auto">
      <div>
        <Sidebar />
      </div>
      <div
        className="h-screen px-4 lg:px-6 bg-card-dark/60 backdrop-blur-md overflow-auto hide-scrollbar pb-10"
        onClick={closeDropdowns}
      >
        <h1 className="text-xl font-semibold mt-5">Profile</h1>
        <div className="mt-4 grid grid-cols-1 md:gris-cols-2">
          <div className="flex gap-6">
            <div>
              <img
                src={user?.images[0]?.url || "/images/avatar.png"}
                alt=""
                className="profile w-36 h-36 rounded-full sm:cursor-pointer"
              />
            </div>
            <div>
              <h1 className="font-semibold text-5xl">
                {user?.display_name || "No name"}
              </h1>
              <p>Number of followers: {user?.followers?.total}</p>
              <p>
                Your Profile link:{" "}
                <a
                  href={user?.external_urls?.spotify}
                  className="text-blue-500 hover:underline"
                >
                  {user?.external_urls?.spotify}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Profile;
