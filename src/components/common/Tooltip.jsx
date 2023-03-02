/* eslint-disable no-unreachable */

const Tooltip = ({ postion, content, hidden }) => {
  const getPostion = () => {
    switch (postion) {
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 before:left-1/2 before:-translate-x-1/2 before:-top-[0.33rem]";
        break;
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 before:left-1/2 before:-translate-x-1/2 before:-bottom-[0.33rem]";
        break;
      case "left":
        return "right-full top-1/2 -translate-y-1/2 before:top-1/2 before:-translate-y-1/2 before:-right-1";
        break;
      case "right":
        return "left-full top-1/2 -translate-y-1/2 before:top-1/2 before:-translate-y-1/2 before:-left-1";
        break;

      default:
        return "bottom-full left-1/2 -translate-x-1/2 before:left-1/2 before:-translate-x-1/2 before:-bottom-[0.33rem]";
        break;
    }
  };

  return (
    <div
      className={` text-sm  w-fit ${content.length > 8 && "!w-[120px]"} ${
        hidden && "md:!hidden"
      }  !text-white  absolute z-[999] px-4 py-[3px] rounded bg-[#686a7e] before:absolute before:w-[0.65rem] before:h-[0.65rem] before:bg-[#686a7e] before:rotate-45 hidden group-hover:flex-center-center ${getPostion()}`}
    >
      <span className="flex-shrink-0"> {content}</span>
    </div>
  );
};

export default Tooltip;
