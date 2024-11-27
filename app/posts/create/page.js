'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const handelSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/posts', { title, content });
    router.push('/');
  };
  return (
    <div className="flex flex-col items-center py-20">
      <h1 className="text-3xl font-bold">Create New Post</h1>
      <form
        onSubmit={handelSubmit}
        className="flex flex-col space-y-4 mt-6 border p-6"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-slate-500"
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border border-slate-500"
        />
        <button className="w-full bg-green-700 py-1.5">Create Post</button>
      </form>
    </div>
  );
};

export default Create;
