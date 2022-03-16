import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";

import {
  addDoc,
  collection,
  serverTimestamp,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Comments from "./Comments";

const Post = ({ username, caption, userImg, image, id }) => {
  const [comment, setComment] = useState("");
  const { data: session } = useSession();

  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.indexOf((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
      setHasLiked(true);
    }
  };
  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImg: session.user.image,
      time: serverTimestamp(),
    });
  };
  return (
    <div className='border bg-white rounded-sm my-7'>
      {/* HEADER */}

      <div className='flex items-center p-5'>
        <img src={userImg} className='h-12 w-12 rounded-full border p-1 mr-3' />
        <p className='flex-1 font-bold'>{username}</p>
        <DotsHorizontalIcon className='h-5' />
      </div>

      {/* IMAGE */}

      <img src={image} className='object-cover w-full' />

      {/* BUTTONS */}
      {session && (
        <div className='flex justify-between p-2'>
          <div className='flex space-x-4'>
            {hasLiked == true ? (
              <HeartIconFilled
                className='btn text-red-500'
                onClick={likePost}
              />
            ) : (
              <HeartIcon className='btn' onClick={likePost} />
            )}
            <ChatIcon className='btn' />
            <PaperAirplaneIcon className='btn' />
          </div>
          <BookmarkIcon className='btn' />
        </div>
      )}

      {/* COMMENTS */}
      <div className='px-5 py-2 truncate'>
        {likes.length > 0 && (
          <p className='font-bold mb-1 text-sm'>{likes.length} likes </p>
        )}
        <p className='mr-1 mb-1 font-bold'>
          {username} <span className='font-normal'> {caption}</span>
        </p>
      </div>

      <Comments id={id} />

      {/* INPUT BOX */}
      {session && (
        <form className='flex items-center p-4'>
          <EmojiHappyIcon className='h-5' />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type='text'
            className='flex-1 border-none focus:ring-0 outline-none'
            placeholder='Add a comment...'
          />
          <button
            type='submit'
            onClick={sendComment}
            disabled={!comment.trim()}
            className='font-semibold text-blue-400'
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
