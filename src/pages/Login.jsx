import { FaSpotify } from "react-icons/fa";
import { getLoginUrl } from "../features/apiSlice";

const Login = () => {
  return (
    <div className="min-h-screen flex-center-center pt-20 bg-card-dark/60 backdrop-blur-md flex-col">
      <div className="max-w-[500px] w-[95%]">
        <h1 className="text-3xl text-center">Login</h1>
        <div className="mt-2">
          <span className="text-primary">Note:</span> We recommend logging in
          with your google account for more features such as creating new
          playlists, adding songs to playlists etc. When you login with your
          spotify account, you won't have these feature instead we shall import
          your default playlists created with your original spotify account and
          you can't modify them.
        </div>
        <div className="flex-align-center gap-3 flex-col sm:flex-row mt-4">
          <div className="w-full">
            <a
              href={getLoginUrl()}
              className="px-3 py-[6px] !opacity-100 bg-primary w-full text-white rounded-full capitalize transition-a hover:bg-[#45d62b] flex-center-center gap-2"
            >
              <FaSpotify className="!opacity-100" />
              <span className="font-rubik">Login with Spotify</span>
            </a>
          </div>
          <div className="w-full">
            <button className="px-3 py-[6px]  bg-dark-light w-full text-white rounded-full capitalize transition-a flex-center-center gap-2 hover:bg-hover-color-dark">
              <img src="/images/google.png" alt="" width={12} />
              <span className="font-rubik">Login in with Google</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <p className="text-center  text-muted pb-2">
          Created By{" "}
          <a
            href="https://www.github.com/WabweniBrian"
            className="text-primary hover:underline"
          >
            Wabweni Brian
          </a>{" "}
          | All Rights Reserved | &copy;{new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Login;
