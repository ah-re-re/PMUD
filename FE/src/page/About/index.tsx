import { setAppState, setCurrentHeaderProductState, setCurrentHeaderState, setHeaderProductState, setHeaderState } from '@/store/features/appStateSlice';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import data from '@/mockdata.json'
import { setDataAbout } from '@/store/features/aboutStateSlice';
import { Outlet, useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { RootState } from '@/store';
import { TypeCategory } from '../Admin/componentsAdmin/Category';
import { postRequest } from '@/hook/api';

const About = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        try {
            (async () => {
                const data: Array<TypeCategory> = await postRequest("/categories/find", {
                    page: "about",
                    parent_id: ""
                })
                dispatch(setHeaderState(data.map((dt => ({ name: dt.name, id: dt._id })))))
                dispatch(setHeaderProductState([]))
                dispatch(setAppState('about'))
                location.pathname == '/about' && navigate(data[0].name[0].name, { state: { id: data[0]._id } })
            })()

        } catch (error) {
            console.log(error)
        }

    }, [dispatch])
    useEffect(() => {

    }, [])
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default About