import { getRequest } from '@/hook/api'
import { Button } from 'antd'
import { useEffect, useState } from 'react'

type typeCart = {
    name: string,
    price: number,
    image: string,
    quantity: number
}

type TypeData = {
    _id: string,
    name: string,
    phone: string,
    address: string,
    cart: typeCart[]
}

const CartsAdmin = () => {
    const [carts, setCarts] = useState<Array<TypeData>>([])
    useEffect(() => {
        try {
            (async () => {
                let data = await getRequest('/carts')
                setCarts(data)
            })()
        } catch (error) {
            console.log(error)
        }
    })
    const onActive = (id: string) => {
        getRequest("/carts/" + id)
    }
    return (
        <div className='flex flex-col gap-4'>
            {carts.map((c, index) => <div key={index} className='bg-blue-300 p-4 rounded-md flex flex-row justify-between'>
                <div>
                    <div>Họ tên: {c.name}</div>
                    <div>Điện thoại: {c.phone}</div>
                    <div>Địa chỉ: {c.address}</div>
                    <div className='font-semibold'>Sản phẩm</div>
                    {
                        c.cart.map(ca => <div>
                            <div>{ca.name}</div>
                            <div>{new Intl.NumberFormat('en-DE').format(ca.price)} x {ca.quantity}</div>
                        </div>)
                    }
                    <div className='font-semibold'>Số tiền: {new Intl.NumberFormat('en-DE').format((c.cart.reduce((sum, c) => sum + c.price, 0) + 1000))}</div>
                </div>
                <div>
                    <Button type='primary' onClick={() => onActive(c._id)}>Active</Button>
                </div>
            </div>)}
        </div>
    )
}

export default CartsAdmin