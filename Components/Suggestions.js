import { useEffect, useState } from "react";
import faker from "@faker-js/faker";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const data = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(data);
  }, []);
  return (
    <div>
      <div className='flex items-center ml-10 my-5 justify-between'>
        <h2 className='text-sm text-gray-400 font-semibold'>
          Suggestions for you
        </h2>
        <button className='font-semibold'>See All</button>
      </div>

      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className='flex items-center justify-between my-2'
        >
          <img
            className='rounded-full w-10 h-10 ml-10 object-contain'
            src={profile.avatar}
          />
          <div className='flex-1 ml-2'>
            <h2 className='font-bold'>{profile.username}</h2>
            <p className='text-gray-400'>Meet this person today</p>
          </div>
          <button className='font-semibold text-blue-500'>Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
