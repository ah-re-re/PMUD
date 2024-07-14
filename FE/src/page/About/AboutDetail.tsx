import { RootState } from '@/store'
import { setCurrentHeaderState } from '@/store/features/appStateSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { TypeCategory } from '../Admin/componentsAdmin/Category'
import { getRequest } from '@/hook/api'
import { Image } from 'antd'
import { StringTable } from '../Home/ProductDetail'

const AboutDetail = () => {
    const { aboutId } = useParams()
    const { headerState, language } = useSelector((state: RootState) => (state.appState))
    const [data, setData] = useState<TypeCategory>({} as TypeCategory)
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            headerState.length > 0 && headerState.find(h => h.name[0].name == aboutId) && (async () => {
                let _data: TypeCategory = await getRequest(`/categories/${headerState.find(h => h.name[0].name == aboutId)?.id}`)
                setData(_data)
            })()

        } catch (error) {
            console.log(error)
        }
        dispatch(setCurrentHeaderState(aboutId + ''))
    }, [dispatch, aboutId, headerState])
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
                    <Image className='py-8' width={'100%'} src={data.url} preview={false}></Image>
                </div>

            }
        </div>
    )
}

export default AboutDetail