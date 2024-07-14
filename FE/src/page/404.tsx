import React from 'react'
import { Image } from 'antd'

const NotFoundPage = () => {
  return (
      <div className='container mx-auto h-full flex justify-center items-center'>
        <Image preview={false} className='object-cover' src='https://cdn-icons-png.flaticon.com/512/103/103085.png'></Image>
      </div>
  )
}

export default NotFoundPage