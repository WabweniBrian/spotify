import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleSmallPlayer } from "../../features/uiSlice";
import Draggable from "react-draggable";

const SmallerPlayer = ({ closeDropdowns }) => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const nodeRef = useRef(null);
  return (
    path !== "/login" && (
      <Draggable nodeRef={nodeRef} onClick={() => dispatch(closeDropdowns())}>
        <div
          className="small-player select-none fixed z-50 bottom-2 right-16 w-20 h-20 rounded-full border-4 overflow-hidden sm:cursor-pointer"
          onDoubleClick={() => dispatch(toggleSmallPlayer())}
          ref={nodeRef}
        >
          <div className="absolute w-5 h-5 rounded-full bg-card-dark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </Draggable>
    )
  );
};

export default SmallerPlayer;
