import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';     // Sanity Client
import MasonryLayout from './MasonryLayout';     // Website layout having different dimensions of images
import Spinner from './Spinner';     // Display cicle ---> show website is loding the content
import { feedQuery, searchQuery } from '../utils/data';

const Feed = () => {
  const [loading, setloading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams(); 
  
  useEffect(() => {
    setloading(true);

    if(categoryId){
      const query = searchQuery(categoryId);   // Fetching all the pins or posts for a specific category

      client.fetch(query)
        .then((data) => {
          setPins(data);
          setloading(false);
        })

    } else {
      client.fetch(feedQuery)
      .then((data) => {
        setPins(data);
        setloading(false);
      })

    }

  }, [categoryId])  // here categoryId is a Dependency Array
  // The useEffect manages an array that contains the state variables or functions 
  //which are kept an eye for any changes.These changes then trigger the callback function.

  if(loading) return <Spinner message='We are adding new ideas to your feed!'/>

  if(!pins?.length) return <h2>No Pins Available</h2>

  return (
    <div>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
}

export default Feed;
