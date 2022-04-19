import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts", id, "comments"), orderBy("time", "asc")),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );
  return (
    <div className='ml-10 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-black'>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className='flex items-center space-x-2 mb-3' key={comment.id}>
            <img className='rounded-full h-7' src={comment.data().userImg} />
            <p className='flex-1'>
              <span className='font-bold'>{comment.data().username}</span>{" "}
              {comment.data().comment}
            </p>
            <Moment fromNow className='pr-5 text-xs'>
              {comment.data().time?.toDate()}
            </Moment>
          </div>
        ))
      ) : (
        <p className='text-center -ml-10'>No comments</p>
      )}
    </div>
  );
};

export default Comments;
