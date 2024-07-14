import  { useEffect } from 'react'
import data from '@/mockdata.json'
import Items from '@/component/Items'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useLocation, useOutlet } from 'react-router-dom';
import { setAppState, setCurrentHeaderProductState, setCurrentHeaderState, setHeaderProductState, setHeaderState } from '@/store/features/appStateSlice';
import { setDataProduct } from '@/store/features/productStateSlice';
import { TypeCategory } from '../Admin/componentsAdmin/Category';
import { postRequest } from '@/hook/api';
import ItemsProduct from '@/component/ItemsProduct';
export const Product = () => {
  const { dataProduct } = useSelector((state: RootState) => (state.productState));
  const { language } = useSelector((state: RootState) => (state.appState));
  const outlet = useOutlet()
  const dispatch = useDispatch();
  const location = useLocation()
  useEffect(() => {
    if (location.pathname == '/products') {
      dispatch(setHeaderProductState([]))
      dispatch(setCurrentHeaderState(''))
      dispatch(setCurrentHeaderProductState(''))
    }
  }, [location.pathname == '/products'])
  useEffect(() => {
    try {
      (async () => {
        const data: Array<TypeCategory> = await postRequest("/categories/find", {
          page: "products",
          parent_id: ""
        })
        dispatch(setHeaderState(data.map((dt => ({name: dt.name, id: dt._id})))))
        dispatch(setDataProduct(data));
        dispatch(setAppState('products'))
      })()

    } catch (error) {
      console.log(error)
    }
  }, [dispatch])
  return (
    <>
      {
        outlet ? outlet :
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-3 md:px-0'>
            {dataProduct.map(dt => <ItemsProduct path={dt.name[0].name} type='H' key={dt._id} id={dt._id} name={dt?.name[language]?.name} url={dt.url} des={dt?.description[language]?.des} />)}
          </div>
      }
    </>
  )
}
