import React from "react";

const MiniProfile = () => {
  return (
    <div className='flex items-center ml-10 mt-14 justify-between'>
      <img className='rounded-full h-14 w-14' src='/images/statue.jpeg' />
      <div>
        <h2 className='font-bold'>JohnDoe1</h2>
        <h2 className='text-gray-400'>Welcome to Instagram 2.0</h2>
      </div>
      <button className='text-blue-500 font-semibold'>Sign Out</button>
    </div>
  );
};

export default MiniProfile;
