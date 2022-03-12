import Posts from "./Posts";
import Stories from "./Stories";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";

const Feed = () => {
  return (
    <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto bg-gray-50'>
      {/* SECTION Posts / Stories */}
      <section className='col-span-2'>
        <Stories />
        <Posts />
      </section>

      {/* SECTION Mini Profile / Suggestions */}
      <section className='hidden xl:inline-grid md:col-span-1'>
        <div>
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  );
};

export default Feed;
