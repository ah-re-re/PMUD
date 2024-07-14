import { setaddQuantity, setremoveQuantity } from '@/store/features/cartStateSlice'
import { Button, Image } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'

type CartItem = {
    index: number,
    name: string,
    price: number,
    image: string,
    quantity: number,
}

const CartItem = (props: CartItem) => {
    const dispatch = useDispatch()
    return (
        <div className='md:px-0 py-4 grid grid-cols-3 gap-3'>
            <div className='col-span-2'>
                <img className='w-full aspect-video object-cover rounded-lg' src={props.image} />
            </div>
            <div className='col-span-1'>
                <div className='font-semibold pb-3'>{props.name}</div>
                <div className='pb-3 text-red-600 font-bold'>{new Intl.NumberFormat('en-DE').format(props.price)} đ</div>
                <div>
                    <Button type='primary' onClick={() => dispatch(setremoveQuantity(props.index))}>-</Button>
                    <div className='inline px-3'>{props.quantity}</div>
                    <Button type='primary' onClick={() => dispatch(setaddQuantity(props.index))}>+</Button>
                </div>
            </div>
        </div>
    )
}

export default CartItem