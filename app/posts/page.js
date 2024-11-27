'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state
  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts');
      setPosts(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecords();
  }, []);

  const handelDelete = async (id) => {
    await axios.delete(`http://localhost:5000/posts/${id}`);
    const filterData = posts.filter((post) => post.id !== id);
    setPosts(filterData);
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-48 py-20">
      <div className=" flex justify-between">
        <h1 className="text-3xl font bold">Blog Posts</h1>
        <Link
          href={'/posts/create'}
          className="px-4 py-1.5 bg-green-800 rounded text-white"
        >
          {' '}
          Create New Post
        </Link>
      </div>
      <table className="divide-y divide-gray-200 w-full mt-6">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-start font-bold text-gray-500 uppercase"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 font-bold text-start text-gray-500 uppercase"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start font-bold text-gray-500 uppercase"
            >
              Content
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-end font-bold text-gray-500 uppercase"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-3 text-gray-800 ">{post.id}</td>
              <td className="px-6 py-3 text-gray-800 ">{post.title}</td>
              <td className="px-6 py-3 text-gray-800 ">{post.content}</td>
              <td className="space-x-4 px-6 py-3 text-end ">
                <Link href={`/posts/${post.id}?mode=read`}>
                  <button className="text-blue-600">Read</button>
                </Link>
                <Link href={`/posts/${post.id}?mode=edit`}>
                  {' '}
                  <button className="text-blue-600">Edit</button>
                </Link>
                <button
                  className="text-red-600"
                  onClick={() => handelDelete(post.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
