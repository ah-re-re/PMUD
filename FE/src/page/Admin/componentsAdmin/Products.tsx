import React, { useEffect, useState } from 'react'
import Category, { TypeCategory } from './Category';
import { Button, message } from 'antd';
import { getRequest, postRequest } from '@/hook/api';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawerCategory, openDrawerProduct } from '@/store/features/appAdminStateSlice';
import { useOutlet, useParams } from 'react-router-dom';
import { RootState } from '@/store';
import Product, { TypeProduct } from './Product';
import { clearProduct } from '@/store/features/drawerProductStateSlice';




const Products = () => {
    const { reload } = useSelector((state: RootState) => state.appAdminState)

    const [data, setData] = useState<Array<TypeProduct>>([])
    const [parent, setParent] = useState<TypeCategory>({} as TypeCategory)
    const { categoryID1 } = useParams()
    const outlet = useOutlet()
    const dispatch = useDispatch()
    useEffect(() => {
        try {
            (async () => {
                const _data: Array<TypeProduct> = await postRequest("/products/find", {
                    category_id: categoryID1
                })

                setData(_data)
                const dataP: TypeCategory = await getRequest(`/categories/${categoryID1}`)
                setParent(dataP)
            })()

        } catch (error) {
            console.log(error)
        }
    }, [reload])
    return (
        <>
            {
                outlet ? outlet :
                    <div>
                        <Button
                            style={{ marginBottom: "30px" }}
                            type="primary"
                            onClick={() =>
                                {
                                    dispatch(clearProduct())
                                    dispatch(openDrawerProduct())
                                } 
                            }
                        >
                            <PlusOutlined />
                            Tạo sp
                        </Button>
                        {
                            parent.url ?
                                <div className='flex flex-row gap-3'>
                                    <img className='w-1/4 aspect-square object-cover' src={parent.url} />
                                    <div>
                                        <div className='text-xl'>{parent.name[0].name}</div>
                                        <div>{parent.description[0].des}</div>
                                    </div>

                                </div> : null
                        }

                        <div className='flex flex-wrap'>
                            {
                                data.map(dt =>
                                    <Product {...dt} />
                                )
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default Products