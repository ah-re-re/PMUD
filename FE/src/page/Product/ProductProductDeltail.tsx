import { setCurrentHeaderProductState } from '@/store/features/appStateSlice'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { TypeProduct } from '../Admin/componentsAdmin/Product'
import { getRequest } from '@/hook/api'
import { Button, Image, Tabs, message } from 'antd'
import { RootState } from '@/store'
import { StringTable } from '../Home/ProductDetail'
import { addCard } from '@/store/features/cartStateSlice'

const ProductProductDeltail = () => {
  const { productsID } = useParams()
  const [data, setData] = useState<TypeProduct>({} as TypeProduct)
  const { headerProductState, language, currentHeader, headerState } = useSelector((state: RootState) => (state.appState))
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      headerProductState.length > 0 && headerProductState.find(h => h.name[0].name == productsID) && (async () => {
        let _data = await getRequest(`/products/${headerProductState.find(h => h.name[0].name == productsID)?.id}`)
        setData(_data)
      })()

    } catch (error) {
      console.log(error)
    }
    dispatch(setCurrentHeaderProductState(productsID + ''))
  }, [productsID, dispatch, headerProductState])
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (divRef.current) {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        const marginTop = scrollPosition;
        divRef.current.style.top = `${marginTop - 200 > 0 ? marginTop - 200 : 0}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className='py-3 px-3 md:px-0'>
      {
        data._id &&
        <div className='w-full h-full'>
          <div className='grid col-span-1 md:grid-cols-5 gap-6 py-11'>
            <img src={data.url} className='col-span-3 w-full aspect-[6/4] object-cover rounded-xl'></img>
            <div
              className='col-span-3 md:col-span-2 relative'>
              <div ref={divRef} className='md:absolute right-0 w-full'>
                <div className='p-3 md:p-6 bg-white rounded-xl flex flex-col gap-4'>
                  <p className='text-[#3BB346] text-sm'>Trung tâm tải xuống</p>
                  <p className='text-lg text-[#1C1F23] font-semibold'>{headerState.find(h => h.name[0].name == currentHeader)?.name[language].name}</p>
                  <p className='text-3xl font-bold'>{data.name[language].name}</p>
                  <p>{data.condition}</p>
                  <div className='flex flex-row'><p className='text-xs text-[#575757] font-semibold pr-1' >Size:</p> <p className='text-xs text-[#1C1F23] font-semibold'>{data.size}</p></div>
                  <div className='flex flex-row'><p className='text-xs text-[#575757] font-semibold pr-1' >Weight:</p> <p className='text-xs text-[#1C1F23] font-semibold'>{data.weight}</p></div>
                  <p className='text-xl font-bold pt-2' style={{ borderTop: '1px solid lightgray' }}>{new Intl.NumberFormat('en-DE').format(data.price) + ' đ'}</p>
                  <pre className='whitespace-pre-wrap'>{data.description[language].des}</pre>
                  <Button onClick={() => { dispatch(addCard({ name: data.name[language].name, price: data.price, image: data.url, quantity: 1 })); message.success(language==0? "Đã thêm vào giỏ hàng": 'Added to cart') }} type='primary' size='large'>{language == 0 ? "Thêm vào giỏ hàng" : "Add Card"}</Button>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-3/5'>
            <Tabs
              defaultActiveKey="0"
              items={data.images.map((img, i) => {
                const id = String(i);
                return {
                  label: `${img.name[language].name ? img.name[language].name : id}`,
                  key: id,
                  children: <div>
                    {
                      img.description[language].des.split('\n')[0] == "$T" ?
                        <StringTable data={img.description[language].des.slice(3,)} />
                        : img.description[language].des && <pre className='whitespace-pre-wrap pb-3'>{img.description[language].des}</pre>
                    }
                    <Image className='w-full' width={'100%'} src={img.url} loading='eager' preview={false} />
                  </div>,
                  style: { minHeight: 500 }
                };
              })}
            />
          </div>
        </div>
      }
    </div >
  )
}

export default ProductProductDeltail