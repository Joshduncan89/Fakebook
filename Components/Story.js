import React from "react";

const Story = ({ img, username }) => {
  return (
    <div>
      <img
        src={img}
        className='h-14 w-14 rounded-full border-2 p-[1.5px] cursor-pointer object-contain border-red-500 hover:scale-110 transition-all duration-100 ease-out '
      />
      <p className='text-xs w-14 text-center truncate'>{username}</p>
    </div>
  );
};

export default Story;
