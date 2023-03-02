import React from "react";
import { dummyAlbums } from "../../data/dummyData";
import AlbumsInfo from "../albums/AlbumsInfo";

const Albums = () => {
  return (
    <div className="px-4 lg:px-6">
      <AlbumsInfo
        title="Halsey's albums"
        albums={dummyAlbums.slice(5, dummyAlbums.length)}
      />
    </div>
  );
};

export default Albums;
