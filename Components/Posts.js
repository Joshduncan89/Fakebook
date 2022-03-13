import React from "react";
import Post from "./Post";

const Posts = () => {
  const DUMMY_DATA = [
    {
      id: "123",
      username: "JohnDoe1",
      userImg: "/images/statue.jpeg",
      caption:
        "I am a caption for dummy data  yoooooo whatsup hows it going this data is super cool this instagram clone is better",
    },
    {
      id: "125",
      username: "JohnDoe1",
      userImg: "/images/statue.jpeg",
      caption:
        "I am a caption for dummy data  yoooooo whatsup hows it going this data is super cool this instagram clone is better",
    },
  ];
  return (
    <div>
      {DUMMY_DATA.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          caption={post.caption}
        />
      ))}
    </div>
  );
};

export default Posts;
