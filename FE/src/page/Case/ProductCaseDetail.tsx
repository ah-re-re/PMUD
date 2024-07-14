import { getRequest } from '@/hook/api'
import { RootState } from '@/store'
import { setCurrentHeaderProductState } from '@/store/features/appStateSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { TypeProduct } from '../Admin/componentsAdmin/Product'
import { Image } from 'antd'
import { StringTable } from '../Home/ProductDetail'

const ProductCaseDetail = () => {
  const { caseID } = useParams()
  const [data, setData] = useState<TypeProduct>({} as TypeProduct)
  const { headerProductState, language } = useSelector((state: RootState) => (state.appState))
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      headerProductState.length > 0 && headerProductState.find(h => h.name[0].name == caseID) && (async () => {
        let _data = await getRequest(`/products/${headerProductState.find(h => h.name[0].name == caseID)?.id}`)
        setData(_data)
      })()

    } catch (error) {
      console.log(error)
    }
    dispatch(setCurrentHeaderProductState(caseID + ''))
  }, [caseID, dispatch, headerProductState])
  return (
    <div className='py-3 px-3 md:px-0'>
      {
        data._id &&
        <div>
          <div className='text-2xl font-semibold'>{data.name[language].name}</div>
          <Image className='py-8' src={data.url} width={'100%'} preview={false}></Image>
          <pre className='pb-8 whitespace-pre-wrap'>{data.description[language].des}</pre>
          {
            data.images.map(img => <div>
              <pre className='text-2xl font-semibold'>{img.name[language].name}</pre>
              {
                img.url && <Image className='py-8' width={'100%'} src={img.url} preview={false}></Image>
              }
              {
                img.description[language].des.split('\n')[0] == "$T" ?
                  <StringTable data={img.description[language].des.slice(3,)} />
                  : <pre className='whitespace-pre-wrap'>{img.description[language].des}</pre>
              }
            </div>)
          }
        </div>
      }
    </div >
  )
}

export default ProductCaseDetail