import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';

// if image have 3000 pixels then 6 will display in full screen
// pins will display on screen according to screen size

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({pins}) => {

  return (
    <div>
      <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointColumnsObj}>
        {pins?.map((pin) => <Pin key={pin?._id} pin={pin} className="w-max"/>)}
      </Masonry>
    </div>
  )
}

export default MasonryLayout;

