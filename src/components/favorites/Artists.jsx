import React from "react";
import { useSelector } from "react-redux";
import { dataStore } from "../../features/dataSlice";
import ArtistList from "../artists/ArtistList";

const Artists = () => {
  const { favoriteArtists } = useSelector(dataStore);
  return (
    <div>
      <div className="pt-3">
        <ArtistList artists={favoriteArtists} title="Your artists" />
      </div>
    </div>
  );
};

export default Artists;
