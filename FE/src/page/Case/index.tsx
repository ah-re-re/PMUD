import React, { useEffect } from 'react'
import data from '@/mockdata.json'
import Items from '@/component/Items'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useLocation, useOutlet } from 'react-router-dom';
import { setAppState, setCurrentHeaderProductState, setCurrentHeaderState, setHeaderProductState, setHeaderState } from '@/store/features/appStateSlice';
import { setDataCase } from '@/store/features/caseStateSlice';
import { TypeCategory } from '../Admin/componentsAdmin/Category';
import { postRequest } from '@/hook/api';
import { setDataProduct } from '@/store/features/productStateSlice';
import ItemsProduct from '@/component/ItemsProduct';

const Case = () => {
    const { dataCase } = useSelector((state: RootState) => (state.caseState));
    const { language } = useSelector((state: RootState) => (state.appState));

    const outlet = useOutlet()
    const dispatch = useDispatch();
    const location = useLocation()
    useEffect(() => {
        if (location.pathname == '/case') {
            dispatch(setHeaderProductState([]))
            dispatch(setCurrentHeaderState(''))
            dispatch(setCurrentHeaderProductState(''))
        }
    }, [location.pathname == '/case'])
    useEffect(() => {
        try {
            (async () => {
                const data: Array<TypeCategory> = await postRequest("/categories/find", {
                    page: "case",
                    parent_id: ""
                })
                dispatch(setHeaderState(data.map((dt => ({ name: dt.name, id: dt._id })))))
                dispatch(setDataCase(data));
                dispatch(setAppState('case'))
            })()

        } catch (error) {
            console.log(error)
        }
    }, [dispatch])
    return (
        <>
            {
                outlet ? outlet :
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-2 md:px-0'>
                        {dataCase.map(dt => <ItemsProduct path={dt.name[0].name} type='H' key={dt._id} id={dt._id} name={dt?.name[language]?.name} url={dt.url} des={dt?.description[language]?.des} />)}
                    </div>
            }
        </>
    )
}

export default Case