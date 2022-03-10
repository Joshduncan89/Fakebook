import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

const Post = ({ username, caption, userImg }) => {
  return (
    <div className='border bg-white rounded-sm my-7'>
      <div className='flex items-center p-5'>
        <img src={userImg} className='h-12 w-12 rounded-full border p-1 mr-3' />
        <p className='flex-1 font-bold'>{username}</p>
        <DotsHorizontalIcon className='h-5' />
      </div>

      <img src={userImg} className='object-cover w-full' />
      <div className='flex justify-between p-3'>
        <div className='flex space-x-4'>
          <HeartIcon className='btn' />
          <ChatIcon className='btn' />
          <PaperAirplaneIcon className='btn' />
        </div>
        <BookmarkIcon className='btn' />
      </div>
      <p className='p-5 truncate'>
        <span className='mr-1 font-bold'>{username} </span>
        {caption}
      </p>
      <form className='flex items-center p-4'>
        <EmojiHappyIcon className='h-5' />
        <input
          type='text'
          className='flex-1 border-none focus:ring-0 outline-none'
          placeholder='Add a comment...'
        />
        <button className='font-semibold text-blue-400'>Post</button>
      </form>
    </div>
  );
};

export default Post;
