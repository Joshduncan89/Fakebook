import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";

const Stories = () => {
  const [fakeData, setFakeData] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setFakeData(suggestions);
  }, []);
  return (
    <div className='flex space-x-2 p-6 overflow-x-scroll mt-8 border-gray-200 border scrollbar-thin scrollbar-thumb-black'>
      {fakeData.map((p) => (
        <Story key={p.id} img={p.avatar} username={p.username} />
      ))}
    </div>
  );
};

export default Stories;
