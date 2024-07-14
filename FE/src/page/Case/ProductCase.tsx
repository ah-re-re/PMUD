import { useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useLocation, useOutlet, useParams } from 'react-router-dom';
import data from '@/mockdata.json'
import { RootState } from '@/store';
import Items from '@/component/Items';
import { setCurrentHeaderProductState, setCurrentHeaderState, setHeaderProductState } from '@/store/features/appStateSlice';
import { setDataProductCase } from '@/store/features/caseStateSlice';
import { TypeProduct } from '../Admin/componentsAdmin/Product';
import { postRequest } from '@/hook/api';
import { setDataProductProduct } from '@/store/features/productStateSlice';
import ItemsProduct from '@/component/ItemsProduct';

const ProductCase = () => {
    const { caseid } = useParams();
    const dispatch = useDispatch();
    const { dataProductCase } = useSelector((state: RootState) => (state.caseState))
    const { headerState, language } = useSelector((state: RootState) => (state.appState))
    const outlet = useOutlet()
    const { pathname } = useLocation()
    useEffect(() => {
        decodeURIComponent(pathname.split('/').slice(2,).join('/')) == caseid && dispatch(setCurrentHeaderProductState(''))
    }, [decodeURIComponent(pathname.split('/').slice(2,).join('/')) == caseid])
    useEffect(() => {
        try {
            headerState.length > 0 && (async () => {
                const _data: Array<TypeProduct> = await postRequest("/products/find", {
                    category_id: headerState.find(h => h.name[0].name == caseid)?.id
                })
                dispatch(setCurrentHeaderState(caseid + ''))
                dispatch(setDataProductCase(_data))
                dispatch(setHeaderProductState(_data.map(dt => ({ name: dt.name, id: dt._id }))))
            })()
        } catch (error) {
            console.log(error)
        }
    }, [dispatch, caseid, headerState])
    return (
        < >
            {
                outlet ? outlet :
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-8'>
                        {dataProductCase.map(dt => <ItemsProduct price={dt.price.toString()} path={dt.name[0].name} type='H' des={dt.description[language].des} key={dt._id.toString()} id={dt._id} name={dt.name[language].name} url={dt.url} />)}
                    </div>
            }
        </>
    )
}

export default ProductCase