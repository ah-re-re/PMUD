import { RootState } from '@/store'
import { setCurrentHeaderProductState } from '@/store/features/appStateSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { TypeProduct } from '../Admin/componentsAdmin/Product'
import { getRequest } from '@/hook/api'
import { Image, Tabs } from 'antd'

interface StringTableProps {
  data: string;
}

export const StringTable: React.FC<StringTableProps> = ({ data }) => {
  const rows = data.split('\n').map((row, index) => {
    const cells = row.split('||').map((cell, cellIndex) => (
      <td key={cellIndex} className={index == 0 ? `font-semibold` : ''}>{cell}</td>
    ));

    return <tr key={index}>{cells}</tr>;
  });
  return (
    <table className="w-full table-fixed">
      <tbody>{rows}</tbody>
    </table>
  );
};

const ProductDetail = () => {
  const { productID } = useParams()
  const [data, setData] = useState<TypeProduct>({} as TypeProduct)
  const { headerProductState, language } = useSelector((state: RootState) => (state.appState))
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      headerProductState.length > 0 && headerProductState.find(h => h.name[0].name == productID) && (async () => {
        let _data = await getRequest(`/products/${headerProductState.find(h => h.name[0].name == productID)?.id}`)
        setData(_data)
      })()

    } catch (error) {
      console.log(error)
    }
    dispatch(setCurrentHeaderProductState(productID + ''))
  }, [productID, dispatch, headerProductState])
  return (
    <div className='py-3 px-3 md:px-0'>
      {
        data._id ?
          <div>
            <div className='text-2xl font-semibold'>{data.name[language].name}</div>
            <Image className='py-8' src={data.url} width={'100%'} preview={false}></Image>
            <pre className='pb-8 whitespace-pre-wrap'>{data.description[language].des}</pre>
            {
              data.images.map((img, index) => <div key={index}>
                <pre className='text-2xl font-semibold'>{img.name[language].name}</pre>
                <div className='w-full'>
                  {
                    img.url && <img className={'py-8 w-full ' + (img.description[language].des.split('\n')[0] == "$T" ? 'md:w-1/3 object-contain' : 'md:w-full object-cover')} src={img.url} ></img>
                  }
                </div>
                {
                  img.description[language].des.split('\n')[0] == "$T" ?
                    <StringTable data={img.description[language].des.slice(3,)} />
                    : <pre className='whitespace-pre-wrap'>{img.description[language].des}</pre>
                }
              </div>)
            }
          </div>
          : null
      }
    </div >
  )
}

export default ProductDetail