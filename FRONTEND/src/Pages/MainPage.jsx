import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../Components/NavbarComponent';
import { BsFillPlusCircleFill, BsCardList, BsFillGrid3X3GapFill, BsBookmarkFill } from 'react-icons/bs';
import Footer from '../Components/Footer';
import axios from 'axios';

export default function MainPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate= useNavigate();
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('authToken');


  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:9595/api/posts/user/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          
        },
      }); 
      setPosts(response.data);
      console.log(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === 'New Post') {
      navigate('/newpost'); 
    } else if (option === 'Posts') {
      fetchPosts();
    }
  };

  return (
    <div className='main-page'>
      <NavbarComponent/>
      <div className='flex' style={{ height: '100vh' }}>
        <div className="sidebar" style={{ width: '350px', color: 'black', backgroundColor: 'lightgrey', paddingTop: '20px', paddingLeft: '30px', textAlign: 'left' ,height:'900px'}}>
          <ul className="list-unstyled">
            <li onClick={() => handleOptionClick('New Post')} className="mb-3">
              <BsFillPlusCircleFill /> New Post
            </li>
            <li onClick={() => handleOptionClick('Posts')} className="mb-3">
              <BsCardList /> Posts
            </li>
            <li onClick={() => handleOptionClick('Shorts')} className="mb-3">
              <BsFillGrid3X3GapFill /> Shorts
            </li>
            <li onClick={() => handleOptionClick('Bookmarks')} className="mb-3">
              <BsBookmarkFill /> Bookmarks
            </li>
          </ul>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
