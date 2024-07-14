import { setDataProductHome } from '@/store/features/homeStateSlice';
import { useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useLocation, useOutlet, useParams } from 'react-router-dom';
import data from '@/mockdata.json'
import { RootState } from '@/store';
import Items from '@/component/Items';
import { setCurrentHeaderProductState, setCurrentHeaderState, setHeaderProductState } from '@/store/features/appStateSlice';
import { TypeCategory } from '../Admin/componentsAdmin/Category';
import { postRequest } from '@/hook/api';
import { TypeProduct } from '../Admin/componentsAdmin/Product';

const ProductHome = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { dataProductHome } = useSelector((state: RootState) => (state.homeState))
  const { headerState, language } = useSelector((state: RootState) => (state.appState))
  const outlet = useOutlet()
  const { pathname } = useLocation()
  useEffect(() => {
    decodeURIComponent(pathname.split('/').slice(1,).join('/')) == id && dispatch(setCurrentHeaderProductState(''))
  }, [decodeURIComponent(pathname.split('/').slice(1,).join('/')) == id])
  useEffect(() => {
    try {
      headerState.length > 0 && (async () => {
        const _data: Array<TypeProduct> = await postRequest("/products/find", {
          category_id: headerState.find(h => h.name[0].name == id)?.id
        })
        dispatch(setDataProductHome(_data))
        dispatch(setHeaderProductState(_data.map(dt => ({ name: dt.name, id: dt._id }))))
        dispatch(setCurrentHeaderState(id + ''))
      })()
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, id, headerState])


  return (
    <>
      {
        outlet ? outlet :
          dataProductHome.map(dt => <Items path={dt.name[0].name} type='V' key={dt._id.toString()} id={dt._id} des={dt.description[language].des} name={dt.name[language].name} url={dt.url} />)
      }
    </>
  )
}

export default ProductHome