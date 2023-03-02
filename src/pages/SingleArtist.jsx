import { Tabs as TabWrapper, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import RightSidebar from "../components/common/RightSidebar";
import Sidebar from "../components/common/Sidebar";

import {
  About,
  Albums,
  ArtistBanner,
  ArtistSongs,
  Popular,
} from "../components/artists";

const SingleArtist = ({ closeDropdowns }) => {
  return (
    <div className="grid md:grid-cols-250-auto">
      <div>
        <Sidebar />
      </div>
      <div
        className="h-screen bg-card-dark/60 backdrop-blur-md overflow-auto hide-scrollbar pb-10"
        onClick={closeDropdowns}
      >
        <ArtistBanner />

        {/* Tab Component */}
        <div>
          <TabWrapper>
            <TabList>
              <Tab>Popular</Tab>
              <Tab>Albums</Tab>
              <Tab>Songs</Tab>
              <Tab>About</Tab>
            </TabList>
            <TabPanel>
              <Popular />
            </TabPanel>
            <TabPanel>
              <Albums />
            </TabPanel>
            <TabPanel>
              <ArtistSongs />
            </TabPanel>
            <TabPanel>
              <About />
            </TabPanel>
          </TabWrapper>
        </div>
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default SingleArtist;
