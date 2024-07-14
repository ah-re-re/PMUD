import { useEffect } from 'react'
import data from '@/mockdata.json'
import Items from '@/component/Items'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setDataHome } from '@/store/features/homeStateSlice';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { setAppState, setCurrentHeaderProductState, setCurrentHeaderState, setHeaderProductState, setHeaderState } from '@/store/features/appStateSlice';
import { getRequest, postRequest } from '@/hook/api';
import { TypeCategory } from '../Admin/componentsAdmin/Category';
export const Home = () => {
  const { dataHome } = useSelector((state: RootState) => (state.homeState));
  const { language } = useSelector((state: RootState) => (state.appState));
  const outlet = useOutlet()
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname == '/') {
      dispatch(setHeaderProductState([]))
      dispatch(setCurrentHeaderState(''))
      dispatch(setCurrentHeaderProductState(''))
    }
  }, [location.pathname == '/'])
  useEffect(() => {
    try {
      (async () => {
        const data: Array<TypeCategory> = await postRequest("/categories/find", {
          page: "home",
          parent_id: ""
        })
        dispatch(setHeaderState(data.map((dt => ({ name: dt.name, id: dt._id })))))
        dispatch(setDataHome(data));
        dispatch(setAppState('home'))
      })()

    } catch (error) {
      console.log(error)
    }

  }, [dispatch])

  return (
    <>
      {
        outlet ? outlet :
          <div className='flex flex-wrap'>
            {dataHome.map(dt => <Items path={dt.name[0].name} type='V' key={dt._id} id={dt._id} name={dt?.name[language]?.name} url={dt.url} des={dt?.description[language]?.des} />)}
          </div>
      }
    </>
  )
}
