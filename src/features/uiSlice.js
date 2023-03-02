import { createSlice } from "@reduxjs/toolkit";

const themeFromLS = JSON.parse(localStorage.getItem("spotifyTheme")) || {
  image: "/images/windows-wallpaper.jpg",
  imageID: 1,
};

const initialState = {
  isDropdownOpen: false,
  isSidebarOpen: false,
  isLeftSidebarOpen: false,
  isMusicListOpen: false,
  isPlaylistOpen: false,
  isThemeMenuOpen: false,
  isProfileDropdownOpen: false,
  isSongDropdownOpen: false,
  theme: themeFromLS,
  showSmallPlayer: true,
  modal: {
    showAddToPlaylistModal: false,
    song: {},
  },
  deletemodal: {
    showDeleteModal: false,
    id: "",
  },
  editmodal: {
    showEditModal: false,
    id: "",
    title: "",
  },
  showShareModal: false,
  toast: {
    showToast: false,
    content: "",
    classType: "",
    icon: null,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openDropdown: (state) => {
      state.isDropdownOpen = true;
    },
    closeDropdown: (state) => {
      state.isDropdownOpen = false;
    },
    toggleDropdown: (state) => {
      state.isDropdownOpen = !state.isDropdownOpen;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleLeftSidebar: (state) => {
      state.isLeftSidebarOpen = !state.isLeftSidebarOpen;
    },
    openMusicList: (state) => {
      state.isMusicListOpen = true;
    },
    closeMusicList: (state) => {
      state.isMusicListOpen = false;
    },
    toggleMusicList: (state) => {
      state.isMusicListOpen = !state.isMusicListOpen;
    },
    openPlaylist: (state) => {
      state.isPlaylistOpen = true;
    },
    closePlaylist: (state) => {
      state.isPlaylistOpen = false;
    },
    togglePlaylist: (state) => {
      state.isPlaylistOpen = !state.isPlaylistOpen;
    },
    openProfileDropdown: (state) => {
      state.isProfileDropdownOpen = true;
    },
    closeProfileDropdown: (state) => {
      state.isProfileDropdownOpen = false;
    },
    toggleProfileDropdown: (state) => {
      state.isProfileDropdownOpen = !state.isProfileDropdownOpen;
    },
    openSongDropdown: (state) => {
      state.isSongDropdownOpen = true;
    },
    closeSongDropdown: (state) => {
      state.isSongDropdownOpen = false;
    },
    toggleSongDropdown: (state) => {
      state.isSongDropdownOpen = !state.isSongDropdownOpen;
    },
    openThemeMenu: (state) => {
      state.isThemeMenuOpen = true;
    },
    closeThemeMenu: (state) => {
      state.isThemeMenuOpen = false;
    },
    toggleThemeMenu: (state) => {
      state.isThemeMenuOpen = !state.isThemeMenuOpen;
    },
    getTheme: (state, action) => {
      state.theme = { image: action.payload.image, imageID: action.payload.id };
    },
    toggleSmallPlayer: (state) => {
      state.showSmallPlayer = !state.showSmallPlayer;
    },
    openAddToPlaylistModal: (state, action) => {
      state.modal = { showAddToPlaylistModal: true, song: action.payload };
    },
    closeAddToPlaylistModal: (state) => {
      state.modal = { ...state.modal, showAddToPlaylistModal: false };
    },
    openDeleteModal: (state, action) => {
      state.deletemodal = { showDeleteModal: true, id: action.payload };
    },
    closeDeleteModal: (state, action) => {
      state.deletemodal = { showDeleteModal: false, id: action.payload };
    },
    openEditModal: (state, action) => {
      state.editmodal = {
        ...state.editmodal,
        showEditModal: true,
        id: action.payload.id,
        title: action.payload.title,
      };
    },
    closeEditModal: (state) => {
      state.editmodal = { ...state.editmodal, showEditModal: false };
    },
    openshareModal: (state) => {
      state.showShareModal = true;
    },
    closeshareModal: (state) => {
      state.showShareModal = false;
    },
    showToast: (state, action) => {
      state.toast = {
        ...state.toast,
        showToast: true,
        content: action.payload.content,
        classType: action.payload.classType,
        icon: action.payload.icon,
      };
    },
    hideToast: (state) => {
      state.toast = { ...state.toast, showToast: false, icon: "" };
    },
  },
});

export default uiSlice.reducer;

export const uiStore = (state) => state.ui;

export const {
  openDropdown,
  closeDropdown,
  toggleDropdown,
  toggleSidebar,
  toggleLeftSidebar,
  openMusicList,
  closeMusicList,
  toggleMusicList,
  openPlaylist,
  closePlaylist,
  togglePlaylist,
  openSongDropdown,
  closeSongDropdown,
  toggleSongDropdown,
  openThemeMenu,
  openProfileDropdown,
  closeProfileDropdown,
  toggleProfileDropdown,
  closeThemeMenu,
  toggleThemeMenu,
  getTheme,
  toggleSmallPlayer,
  openAddToPlaylistModal,
  closeAddToPlaylistModal,
  openDeleteModal,
  closeDeleteModal,
  openEditModal,
  closeEditModal,
  openshareModal,
  closeshareModal,
  showToast,
  hideToast,
} = uiSlice.actions;
