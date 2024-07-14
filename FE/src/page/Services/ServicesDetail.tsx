import { RootState } from '@/store'
import { setCurrentHeaderState } from '@/store/features/appStateSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { TypeCategory } from '../Admin/componentsAdmin/Category'
import { getRequest } from '@/hook/api'
import { Button, Image, Input } from 'antd'
import { StringTable } from '../Home/ProductDetail'


const ServicesDetail = () => {
    const { servicesId } = useParams()
    const { headerState, language } = useSelector((state: RootState) => (state.appState))
    const [data, setData] = useState<TypeCategory>({} as TypeCategory)
    const dispatch = useDispatch();
    const Feedback = () => {
        const [input, setInput] = useState<string>('')
        return <>
            <div className='py-3 w-1/2 md:w-1/3'>
                <Input value={input} onChange={e => setInput(e.target.value)} placeholder={!language ? 'Nhận xét' : 'Feedback'} />
            </div>
            <Button onClick={() => setInput('')} className='bg-black text-white font-semibold'>{!language ? 'Gửi' : "Send"}</Button>
        </>
    }

    useEffect(() => {
        try {
            headerState.length > 0&& headerState.find(h => h.name[0].name == servicesId) && (async () => {
                let _data: TypeCategory = await getRequest(`/categories/${headerState.find(h => h.name[0].name == servicesId)?.id}`)
                setData(_data)
            })()

        } catch (error) {
            console.log(error)
        }
        dispatch(setCurrentHeaderState(servicesId + ''))
    }, [dispatch, servicesId, headerState])
    return (
        <div className='py-3 px-3 md:px-0'>
            {
                data._id && <div>
                    <div className='font-semibold'>{data.name[language].name}</div>
                    {
                        data.description[language].des.split('\n')[0] == "$T" ?
                        <StringTable data={data.description[language].des.slice(3,)} />
                        : <pre className='whitespace-pre-wrap'>{data.description[language].des}</pre>
                    }
                    {
                        data.url && <div className='w-full md:w-1/2'>
                            <Image preview={false} width={'100%'} className='py-4' src={data.url}></Image>
                        </div> 
                    }
                    {
                        servicesId == "Lời phản hồi" ? <Feedback /> : null
                    }
                </div>

            }
        </div>
    )
}

export default ServicesDetail