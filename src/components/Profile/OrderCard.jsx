import { SettingsBackupRestoreOutlined } from '@mui/icons-material'
import { Button, Card } from '@mui/material'
import React from 'react'

const OrderCard = () => {
  return (
    <Card className='flex justify-between items-center p-5'>
        <div className='flex items-center space-x-5'>
            <img className='h-16 w-16' src='https://images.pexels.com/photos/16020573/pexels-photo-16020573.jpeg' alt=''/>
            <div>
                <p>Biryani</p>
                <p>$399</p>
            </div>
        </div>
        <div>
            <Button disabled variant='contained' className='cursor-not-allowed'>completed</Button>
        </div>

    </Card>
  )
}

export default OrderCard
