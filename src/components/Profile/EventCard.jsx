import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = () => {
  return (
    <div>
        <Card sx={{width:340}}>
            <CardMedia sx={{height:345}} image='https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg'></CardMedia>
            <CardContent>
                <Typography variant='h5'>
                    Indian Fast Foods
                </Typography>
                <Typography variant='body2'>
                    50% of on ur first order
                </Typography>
                <div className='py-2 space-y-2'>
                    <p>{"Kadapa"}</p>
                    <p className='text-sm text-blue-500'>july 3,2025 12:00 AM</p>
                    <p className='text-sm text-red-500'>july 4,2025 12:00 AM</p>
                </div>
            </CardContent>
            {false&&<CardActions>
                <IconButton>
                   <DeleteIcon />
                </IconButton>
            </CardActions>}
        </Card>
      
    </div>
  )
}

export default EventCard
