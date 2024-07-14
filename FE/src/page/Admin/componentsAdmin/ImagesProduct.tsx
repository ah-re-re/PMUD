import { deleteImageName, setImageDes, setImageName, setImageUrl } from '@/store/features/drawerProductStateSlice'
import { CloseOutlined, InboxOutlined } from '@ant-design/icons'
import { Button, Col, Image, Input, Row, UploadProps, message } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import Dragger from 'antd/es/upload/Dragger'
import { useDispatch } from 'react-redux'
import { typeImage } from './Product'

export type TypeImagesProduct = {
    data: typeImage;
    keyImages: number;
}

const ImagesProduct = (props: TypeImagesProduct) => {
    const dispatch = useDispatch()
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
        dispatch(setImageUrl({ key: props.keyImages, url: src as string }))
    };
    return (
        <div style={{border: '1px solid lightgray', padding: 12, margin: '12px 0', borderRadius: 10}}>
            <Row gutter={16}>
                <Col span={24}>
                    <div className="w-full aspect-square py-3">
                        {props.data.url ?
                            (
                                <div className='flex flex-col aspect-square items-center w-full relative'>
                                    <Image width={'100%'} preview={false} className='aspect-square object-cover rounded-2xl' src={props.data.url}> </Image>
                                    <Button className='absolute top-0 right-0' type='ghost' onClick={() => { dispatch(setImageUrl({ key: props.keyImages, url: '' })) }}><CloseOutlined /></Button>
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
            <Row gutter={16}>
                <Col span={12}>
                    <p>Tên</p>
                    <Input value={props.data.name[0].name} onChange={(e) => { dispatch(setImageName({ key: props.keyImages, name: e.target.value, language: 'vn' })) }} placeholder="please enter url description" />
                </Col>
                <Col span={12}>
                    <p>Name</p>
                    <Input value={props.data.name[1].name} onChange={(e) => { dispatch(setImageName({ key: props.keyImages, name: e.target.value, language: 'en' })) }} placeholder="please enter url description" />

                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <p>Mô tả</p>
                    <Input.TextArea value={props.data.description[0].des} onChange={(e) => { dispatch(setImageDes({ key: props.keyImages, des: e.target.value, language: 'vn' })) }} rows={4} placeholder="please enter url description" />
                </Col>
                <Col span={12}>
                    <p>Description</p>
                    <Input.TextArea value={props.data.description[1].des} onChange={(e) => { dispatch(setImageDes({ key: props.keyImages, des: e.target.value, language: 'en' })) }} rows={4} placeholder="please enter url description" />

                </Col>
            </Row>
            <Button type='primary' danger onClick={() => dispatch(deleteImageName(props.keyImages))}>Delete</Button>
        </div>
    )
}

export default ImagesProduct