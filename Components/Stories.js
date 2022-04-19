import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";

const Stories = () => {
  const { data: session } = useSession();
  const [fakeData, setFakeData] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setFakeData(suggestions);
  }, []);
  return (
    <div className='flex space-x-2 p-6 overflow-x-scroll mt-8 border-gray-200 border scrollbar-thin scrollbar-thumb-black dark:bg-gray-700 dark:scrollbar-thumb-red-500 dark:border-red-500'>
      {session && (
        <Story img={session?.user?.image} username={session?.user?.username} />
      )}
      {fakeData.map((p) => (
        <Story key={p.id} img={p.avatar} username={p.username} />
      ))}
    </div>
  );
};

export default Stories;
