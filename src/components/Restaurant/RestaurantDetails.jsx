import React from 'react';
import { Grid } from '@mui/material';

const RestaurantDetails = () => {
  return (
    <div className='px-5 lg:px-20' >
        <section>
            <h3 className='text-gray-500 py-2 mt-10'>Home/India/ Indian Fast Fodd 3 </h3>

            <div>
            <Grid item xs={12}>
                    <div>
                        <img
                        src="http://res.cloudinary.com/dcpesbd8q/image/upload/v1707802815/ux3xq93xzfbqhtudigv2.jpg"
                        alt="Banner"
                        style={{
                            width: '100%',
                            height: '40vh',
                            objectFit: 'cover',
                       
                            display: 'block',
                        }}
                        />
                    </div>
            </Grid>
            <div className="flex">
                        <div className="w-1/2 pt-4 pr-4">
                        <img
                        src="http://res.cloudinary.com/dcpesbd8q/image/upload/v1707802815/ux3xq93xzfbqhtudigv2.jpg"
                        alt="Banner"
                        style={{
                            width: '100%',
                            height: '40vh',
                            objectFit: 'cover',
                       
                            display: 'block',
                        }}
                        />
                        </div>
                        <div className="w-1/2 pt-4 pr-0">
                        <img
                        src="http://res.cloudinary.com/dcpesbd8q/image/upload/v1707802815/ux3xq93xzfbqhtudigv2.jpg"
                        alt="Banner"
                        style={{
                            width: '100%',
                            height: '40vh',
                            objectFit: 'cover',
                       
                            display: 'block',
                        }}
                        />
                        </div>
            </div>


            </div>
        </section>

    </div>
  );
};

export default RestaurantDetails;
