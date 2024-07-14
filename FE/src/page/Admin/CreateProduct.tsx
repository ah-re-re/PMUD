import { patchRequest, postRequest } from '@/hook/api'
import { RootState } from '@/store'
import { closeDrawerProduct, setReload } from '@/store/features/appAdminStateSlice'
import { addImage, setCondition, setDesProduct, setDiscounts, setNameProduct, setPrice, setProductURL, setSize, setWeight } from '@/store/features/drawerProductStateSlice'
import { CloseOutlined, InboxOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, Image, Input, InputNumber, Row, Space, UploadProps, message } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import Dragger from 'antd/es/upload/Dragger'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ImagesProduct from './componentsAdmin/ImagesProduct'


const CreateProduct = () => {
    const { drawerProduct } = useSelector((state: RootState) => (state.appAdminState))
    const { name, images, type, productID, price, discounts, condition, size, weight, url, description } = useSelector((state: RootState) => (state.drawerProductState))
    const { categoryID1 } = useParams()
    const dispatch = useDispatch()
    const onClose = () => {
        dispatch(closeDrawerProduct())
        dispatch(setReload())
    }
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
        let src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(info.file.originFileObj as RcFile);
            reader.onload = () => resolve(reader.result as string);
        });
        dispatch(setProductURL(src as string))
    };

    const onSubmit = async () => {
        const body = {
            name: name,
            images: images,
            price,
            discounts,
            condition,
            description,
            size,
            weight,
            url,
            category_id: categoryID1
        }
        if (type == "C") {
            await postRequest('/products', body)
            onClose()
        }
        else {
            await patchRequest(`/products/${productID}`, body)
            onClose()
        }
    }
    return (
        <div>
            <Drawer
                title="Create a new product"
                width={720}
                onClose={onClose}
                open={drawerProduct}
                extra={
                    <Space>
                        <Button onClick={onSubmit}
                            type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <p>Name</p>
                        <Input value={name[0].name} onChange={(e) => dispatch(setNameProduct({ name: e.target.value, language: 'vn' }))} placeholder="Please enter user name" />
                    </Col>
                    <Col span={12}>
                        <p>Tên</p>
                        <Input value={name[1].name} onChange={(e) => dispatch(setNameProduct({ name: e.target.value, language: 'en' }))} placeholder="Please enter user name" />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <p>Mô tả</p>
                        <Input.TextArea value={description[0].des} onChange={(e) => dispatch(setDesProduct({ des: e.target.value, language: 'vn' }))} rows={4} placeholder="please enter url description" />
                    </Col>
                    <Col span={12}>
                        <p>Description</p>
                        <Input.TextArea value={description[1].des} onChange={(e) => dispatch(setDesProduct({ des: e.target.value, language: 'en' }))} rows={4} placeholder="please enter url description" />

                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <p>Price</p>
                        <InputNumber value={price} onChange={(e) => dispatch(setPrice(e ? e : 0))} />
                    </Col>
                    <Col span={12}>
                        <p>Discounts</p>
                        <InputNumber value={discounts} onChange={(e) => dispatch(setDiscounts(e ? e : 0))} />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <p>Size</p>
                        <Input value={size} onChange={(e) => dispatch(setSize(e.target.value))} />
                    </Col>
                    <Col span={12}>
                        <p>Weight</p>
                        <Input value={weight} onChange={(e) => dispatch(setWeight(e.target.value))} />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <p>Condition</p>
                        <Input value={condition} onChange={(e) => dispatch(setCondition(e.target.value))} />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <div className="w-full aspect-square py-3">
                            {url ?
                                (
                                    <div className='flex flex-col aspect-square items-center w-full relative'>
                                        <Image width={'100%'} preview={false} className='aspect-square object-cover rounded-2xl' src={url}> </Image>
                                        <Button className='absolute top-0 right-0' type='ghost' onClick={() => { dispatch(setProductURL('')) }}><CloseOutlined /></Button>
                                    </div>
                                )
                                :
                                <div className='w-full aspect-square object-cover rounded-2xl'>
                                    <Dragger
                                        showUploadList={false}
                                        onChange={handleChange}
                                        beforeUpload={beforeUpload}
                                        className="w-full h-full"
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">
                                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                            band files
                                        </p>
                                    </Dragger>
                                </div>
                            }

                        </div>
                    </Col>
                </Row>
                {
                    images.map((image, index) => {
                        return <ImagesProduct keyImages={index} key={index} data={image} />
                    })
                }
                <Button type='primary' onClick={() => dispatch(addImage())}>add</Button>
            </Drawer>
        </div >
    )
}

export default CreateProduct