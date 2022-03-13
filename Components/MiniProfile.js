import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className='flex items-center ml-10 mt-14 justify-between'>
      <img
        className='rounded-full h-14 w-14'
        src={session?.user?.image ? session.user.image : "/images/statue.jpeg"}
      />
      <div>
        <h2 className='font-bold'>{session?.user?.username}</h2>
        <h2 className='text-gray-400'>Welcome to Instagram 2.0</h2>
      </div>
      <button onClick={signOut} className='text-blue-500 font-semibold'>
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
