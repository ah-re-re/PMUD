import React, { useEffect, useState } from 'react'
import Category, { TypeCategory } from './Category';
import { Button, message } from 'antd';
import { getRequest, postRequest } from '@/hook/api';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawerCategory } from '@/store/features/appAdminStateSlice';
import { useOutlet, useParams } from 'react-router-dom';
import { RootState } from '@/store';
import { clearCategory } from '@/store/features/drawerCategoryStateSlice';




const Categories = () => {
    const { reload, appAdminState } = useSelector((state: RootState) => state.appAdminState)
    const { parentId } = useSelector((state: RootState) => state.drawerCategoryState)
    const [data, setData] = useState<Array<TypeCategory>>([])
    const [parent, setParent] = useState<TypeCategory>({ name: [{ name: '' }], description: [{ des: '' }] } as TypeCategory)
    const { categoryID1 } = useParams()
    const outlet = useOutlet()
    const dispatch = useDispatch()
    useEffect(() => {
        try {
            (async () => {
                if (!categoryID1) {
                    const _data: Array<TypeCategory> = await postRequest("/categories/find", {
                        page: appAdminState,
                        parent_id: ""
                    })

                    setData(_data)
                    setParent({ name: [{ name: '' }], description: [{ des: '' }] } as TypeCategory)
                }
                else {
                    const dataP: TypeCategory = await getRequest(`/categories/${categoryID1}`)
                    const _data: Array<TypeCategory> = await postRequest("/categories/find", {
                        page: appAdminState,
                        parent_id: parentId
                    })
                    setParent(dataP)
                    setData(_data)
                }
            })()

        } catch (error) {
            console.log(error)
        }
    }, [reload, appAdminState])
    return (
        <>
            {
                outlet ? outlet :
                    <div>
                        <Button
                            style={{ marginBottom: "30px" }}
                            type="primary"
                            onClick={() => {
                                dispatch(clearCategory())
                                dispatch(openDrawerCategory())
                            }
                            }
                        >
                            <PlusOutlined />
                            Tạo loại
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
                                    <Category {...dt} />
                                )
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default Categories