import { deleteRequest } from '@/hook/api';
import { openDrawerProduct, setReload } from '@/store/features/appAdminStateSlice';
import { setParentProductID, setProduct } from '@/store/features/drawerProductStateSlice';
import { Button, Popconfirm, Popover, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type typeName = {
  name: string;
  language: string;
}

type typeDes = {
  des: string;
  language: string;
}

export type typeImage = {
  name: typeName[]
  url: string;
  description: typeDes[]
}

export type TypeProduct = {
  _id: string;

  name: typeName[];
  description: typeDes[]
  price: number;

  images: typeImage[];

  category_id: string;

  discounts?: number;
  condition: string;
  size: string;
  weight: string;
  url: string;

}


const Product = (props: TypeProduct) => {
  const dispatch = useDispatch()
  const onUpdate = () => {
    dispatch(setProduct(props))
    dispatch(openDrawerProduct())
  }
  const onDelete = async () => {
    try {
      await deleteRequest(`/products/${props._id}`)
      dispatch(setReload())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-1/4 p-3' key={props._id}>
      <div>
        <div>{props.name[0].name}</div>
        <img className='w-full aspect-square object-cover' src={props.url} />
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

export default Product