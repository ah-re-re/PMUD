import { useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useLocation, useOutlet, useParams } from 'react-router-dom';
import data from '@/mockdata.json'
import { RootState } from '@/store';
import Items from '@/component/Items';
import { setCurrentHeaderProductState, setCurrentHeaderState, setHeaderProductState } from '@/store/features/appStateSlice';
import { setDataProductProduct } from '@/store/features/productStateSlice';
import { postRequest } from '@/hook/api';
import { TypeProduct } from '../Admin/componentsAdmin/Product';
import ItemsProduct from '@/component/ItemsProduct';


const ProductProduct = () => {
    const { productsid } = useParams();
    const dispatch = useDispatch();
    const { dataProductProduct } = useSelector((state: RootState) => (state.productState))
    const { headerState, language } = useSelector((state: RootState) => (state.appState))
    const outlet = useOutlet()
    const { pathname } = useLocation()
    useEffect(() => {
        decodeURIComponent(pathname.split('/').slice(2,).join('/')) == productsid && dispatch(setCurrentHeaderProductState(''))
    }, [decodeURIComponent(pathname.split('/').slice(2,).join('/')) == productsid])
    useEffect(() => {
        try {
            headerState.length > 0 && (async () => {
                const _data: Array<TypeProduct> = await postRequest("/products/find", {
                    category_id: headerState.find(h => h.name[0].name == productsid)?.id
                })
                dispatch(setHeaderProductState(_data.map(dt => ({ name: dt.name, id: dt._id }))))
                dispatch(setDataProductProduct(_data))
                dispatch(setCurrentHeaderState(productsid + ''))
            })()
        } catch (error) {
            console.log(error)
        }
    }, [dispatch, productsid, headerState])
    return (
        < >
            {
                outlet ? outlet :
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-3 md:px-0'>
                        {dataProductProduct.map(dt => <ItemsProduct path={dt.name[0].name} price={dt.price.toString()} des={dt.description[language].des} type='H' key={dt._id.toString()} id={dt._id} name={dt.name[language].name} url={dt.url} />)}
                    </div>
            }
        </>
    )
}

export default ProductProduct