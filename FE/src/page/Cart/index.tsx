import cartlogo from '@/assets/cart.png'
import { postRequest } from '@/hook/api'
import { RootState } from '@/store'
import { setAppState, setHeaderProductState, setHeaderState } from '@/store/features/appStateSlice'
import { clearCard, setAdressCart, setNameCart, setPhoneCart } from '@/store/features/cartStateSlice'
import { Button, Divider, Image, Input, message } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'

const Cart = () => {
    const { language } = useSelector((state: RootState) => state.appState)
    const { cart, name, phone, address } = useSelector((state: RootState) => state.cartState)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeaderState([]))
        dispatch(setHeaderProductState([]))
        dispatch(setAppState(''))
    }, [dispatch])
    return (
        <div className='my-3 px-3 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-3'>
            <div className='col-span-2'>
                {
                    cart.length <= 0 ?
                        <div>
                            <div className='font-semibold'> Hãy liên hệ với số điện thoại 0987654321 để được hỗ trợ</div>
                            <Image preview={false} src={cartlogo}></Image>
                        </div> :
                        cart.map((c, index) => <CartItem key={index} index={index} name={c.name} price={c.price} image={c.image} quantity={c.quantity} />)
                }
            </div>
            <div className='col-span-1 py-4'>
                <div className='border-[1px] border-black border-solid rounded-md p-2'>
                    <div className='font-semibold text-xl pt-5'>
                        Tiến hành đặt hàng
                    </div>
                    <Divider />
                    <div className='flex flex-col'>
                        Họ tên <Input value={name} onChange={e => dispatch(setNameCart(e.target.value))} className='my-3 w-1/2' />
                    </div>
                    <div className='flex flex-col'>
                        Số điện thoại
                        <Input value={phone} onChange={e => dispatch(setPhoneCart(e.target.value))} className='my-3 w-1/3' />
                    </div>
                    <div>
                        Địa chỉ
                        <Input value={address} onChange={e => dispatch(setAdressCart(e.target.value))} className='my-3' />
                    </div>
                    <div className='flex flex-row justify-between py-4'>
                        <div>
                            Tiền sản phẩm:
                        </div>
                        <div>{new Intl.NumberFormat('en-DE').format(cart.reduce((sum, c) => sum + c.price * c.quantity, 0))}</div>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div>
                            Phí giao hàng:
                        </div>
                        <div>{new Intl.NumberFormat('en-DE').format(1000)}</div>
                    </div>
                    <Divider />
                    <div className='font-semibold flex flex-row justify-between'>
                        <div>
                            Tổng tiền:
                        </div>
                        <div>{new Intl.NumberFormat('en-DE').format((cart.reduce((sum, c) => sum + c.price * c.quantity, 0) + 1000))}</div>
                    </div>
                    <Button onClick={() => {
                        if (name && phone && address) {
                            postRequest('/carts', { name, phone, address, cart });
                            dispatch(clearCard());
                            message.success("Bạn đã đặt hàng thành công")
                        }
                        else {
                            message.info("Bạn chưa điền đủ thông tin")

                        }
                    }} type='primary' disabled={cart.length <= 0} className='w-full my-4'>Đặt hàng</Button>
                </div>
            </div>
        </div>
    )
}

export default Cart