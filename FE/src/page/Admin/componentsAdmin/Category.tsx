import { deleteRequest, postRequest } from '@/hook/api';
import { RootState } from '@/store';
import { openDrawerCategory, setReload } from '@/store/features/appAdminStateSlice';
import { setCategory, setParentCategoryID } from '@/store/features/drawerCategoryStateSlice';
import { Button, Popconfirm, Popover, message } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export type typeName = {
    name: string;
    language: string
}

export type typeDes = {
    des: string;
    language: string;
}
export type TypeCategory = {
    _id: string;
    name: typeName[];
    description: typeDes[];
    parent_id: string;
    url: string;
    page: string;
}

const Category = (props: TypeCategory) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onUpdate = () => {
        console.log(props)
        dispatch(setCategory(props))
        dispatch(openDrawerCategory())
    }
    const onDelete = async () => {
        try {
            postRequest('/products/deleteByParentID', {
                id: props._id
            })
            await deleteRequest(`/categories/${props._id}`)
            dispatch(setReload())
        } catch (error) {
            message.error('' + error)
        }
    }

    const onClick = () => {
        dispatch(setParentCategoryID(props._id))
        navigate(props._id)
    }
    return (
        <div className='w-1/4 p-3' key={props._id}>
            <div className='cursor-pointer' onClick={onClick}>
                <div>{props.name[0].name}</div>
                <img className='w-full aspect-square object-cover' src={props.url} />
                {/* <div>{props.description[0].des}</div> */}

            </div>
            <div className='flex flex-row justify-end'>
                <Button type='primary' className='w-full' onClick={onUpdate}>Update</Button>
                <Popconfirm
                    title="Bạn có muốn xóa không?"
                    onConfirm={onDelete}
                    okText="Có"
                    cancelText="Không"
                >
                    <Button type='primary' className='w-full' danger>Delete</Button>
                </Popconfirm>
            </div>
        </div>
    )
}

export default Category