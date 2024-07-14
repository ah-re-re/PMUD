import { postRequest } from '@/hook/api'
import { setAppState, setHeaderProductState, setHeaderState } from '@/store/features/appStateSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TypeCategory } from '../Admin/componentsAdmin/Category'
import { Image } from 'antd'
import empty from '@/assets/cart-empty.png'
import { RootState } from '@/store'
import logo from '@/assets/logo.png'

type typeName = {
    name: string;
    language: string;
}

type typeDes = {
    des: string;
    language: string;
}
export type TypeFind = {
    name: Array<typeName>;
    description?: Array<typeDes>;
    url: string;
    price?: string;
    path: string;
}

const Find = () => {
    const search = useSearchParams()[0]
    const { language } = useSelector((state: RootState) => state.appState)
    const dispatch = useDispatch()
    const [data, setData] = useState<Array<TypeFind>>([] as Array<TypeFind>)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(setHeaderState([]))
        dispatch(setHeaderProductState([]))
        dispatch(setAppState(''))
        try {
            (async () => {
                const _data = await Promise.all([postRequest("/products/search", {
                    query: search.get('q'),
                }), postRequest("/categories/search", {
                    query: search.get('q'),
                })])
                setData([..._data[0], ..._data[1]])
            })()

        } catch (error) {
            console.log(error)
        }
    }, [dispatch, search.get('q')])
    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 py-6'>
            {
                data.length > 0 ? data.map((dt, index) => <div onClick={() => navigate(dt.path)} key={index} className={`w-full col-span-1 cursor-pointer`}>
                    <div className='px-3 md:px-0 my-3 h-full'>
                        <div className='bg-white grid grid-cols-1 rounded-xl h-full'>
                            <div className='col-span-1 p-3'>
                                <img src={dt.url ? dt.url : logo} className='object-cover aspect-video w-full h-full rounded-xl' />
                            </div>
                            <div className={'col-span-1 p-3'}>
                                <div className='font-semibold text-xl py-2'>{dt.name[language].name}</div>
                                <div className='font-semibold'>{dt.price != undefined ? (dt.price + '' != '0' ? new Intl.NumberFormat('en-DE').format(Number(dt.price)) : null) : null}</div>
                                <div>{dt.description && dt.description[language].des}</div>
                            </div>
                        </div>

                    </div>
                </div>) :
                    <div className='col-span-4 mx-auto'>
                        <Image src={empty} width={'100%'} preview={false} />
                    </div>
            }
        </div>
    )
}

export default Find