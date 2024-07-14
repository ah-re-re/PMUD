import { setAppState, setCurrentHeaderProductState, setCurrentHeaderState, setHeaderProductState, setHeaderState } from '@/store/features/appStateSlice';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { RootState } from '@/store';
import { TypeCategory } from '../Admin/componentsAdmin/Category';
import { postRequest } from '@/hook/api';

type Name = {
    name: string
}

const Services = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const outlet = useOutlet()
    const [dataServices, setDataService] = useState<Array<TypeCategory>>([])
    const { language } = useSelector((state: RootState) => (state.appState));
    useEffect(() => {
        if (location.pathname == '/services') {
          dispatch(setHeaderProductState([]))
          dispatch(setCurrentHeaderState(''))
          dispatch(setCurrentHeaderProductState(''))
        }
      }, [location.pathname == '/services'])
    useEffect(() => {
        try {
            (async () => {
                const data: Array<TypeCategory> = await postRequest("/categories/find", {
                    page: "services",
                    parent_id: ""
                })
                setDataService(data)
                dispatch(setHeaderState(data.map((dt => ({ name: dt.name, id: dt._id })))))
                dispatch(setAppState('services'))
            })()

        } catch (error) {
            console.log(error)
        }

    }, [dispatch])
    useEffect(() => {

    }, [])
    return (
        <div>
            {
                outlet ? outlet :
                    <div className='grid grid-cols-1 p-4 cursor-pointer'>
                        {dataServices.map((dt,index) => <div key={index} onClick={() => navigate(dt.name[0].name)} className={`w-full border-0 border-b-[1px] border-[#E2E2E2] border-solid`}>
                            <div className={'col-span-1 w-full flex flex-row justify-between'}>
                                <div className='text-lg py-2'>{dt.name[language].name}</div>
                                <div className='text-lg py-2 text-[#575757]'>{index==3?'2011-05-25':'2011-07-23'}</div>
                            </div>
                        </div>)}
                    </div>
            }
        </div>
    )
}

export default Services