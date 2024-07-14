import search from '@/assets/Shape.png'
import logo from '@/assets/logo.jpg'
import map from '@/assets/map.png'
import phone from '@/assets/phone.png'
import { postRequest } from '@/hook/api'
import { TypeFind } from '@/page/Find'
import appRoutes from '@/router/appRoutes'
import { RootState } from '@/store'
import { clearStateApp, setLangauge } from '@/store/features/appStateSlice'
import { CloseCircleOutlined, CloseOutlined, MenuUnfoldOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Badge, Drawer, Image, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import "./Header.css"
const { Search } = Input;
const Header = () => {
    const { appState, headerState, headerProductState, currentHeader, currentHeaderProduct, language } = useSelector((state: RootState) => (state.appState));
    const { cart } = useSelector((state: RootState) => (state.cartState));
    const [open, setOpen] = useState(false);
    const [opneMenu, setOpenMenu] = useState(false)
    const [dataSearch, setDataSearch] = useState<Array<TypeFind>>([] as Array<TypeFind>)
    const [searchValue, setSearchValue] = useState('');
    const dishpatch = useDispatch()
    useEffect(() => {
        (async () => {
            const _data: Array<TypeFind> = await postRequest('/products/search', {
                query: ""
            })
            setDataSearch(_data.slice(0, 5))
        })()
    }, [])
    const navigate = useNavigate()
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const showMenu = () => {
        setOpenMenu(true);
    };

    const onCloseMenu = () => {
        setOpenMenu(false);
    };


    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className='bg-black z-[1001]'>
            <div className='bg-black text-white px-3 py-6'>
                <div className='container mx-auto flex flex-row justify-between items-center'>
                    <div className='flex flex-row items-center cursor-pointer' onClick={() => navigate('/')}>
                        <Image src={logo} width={24} />
                        <div className='text-2xl pl-2 font-semibold'>HNPharmacy</div>
                    </div>
                    <div className='flex flex-row gap-6 justify-between items-center'>
                        {
                            windowSize.width > 1024 ? appRoutes.map(r => <Link to={r.path} key={r.path} className='no-underline font-semibold' style={{ color: appState == r.state ? 'white' : '#979797' }}>
                                {r.label && r.label[language]}
                            </Link>) : null
                        }
                    </div>
                    <div className='flex flex-row items-center gap-3'>
                        <div className='px-3'>
                            <Badge count={cart.length} offset={[0,10]} size='small'>
                                <div className='flex flex-row items-center'>
                                    <ShoppingCartOutlined className='cursor-pointer text-gray-400 text-2xl pt-2' onClick={() => navigate('/cart')} />
                                </div>
                            </Badge>
                        </div>
                        <Image src={search} className='cursor-pointer' onClick={() => showDrawer()} preview={false} width={20} />
                        {
                            windowSize.width > 1024 ?
                                <div className='w-28 flex justify-end'>
                                    <Select bordered={false} value={language} onChange={(e) => dishpatch(setLangauge(e))} options={[
                                        { value: 0, label: 'Tiếng việt' },
                                        { value: 1, label: 'English' },
                                    ]} />
                                </div> :
                                opneMenu ? <CloseOutlined className='text-xl pl-3 pt-2 text-[#979797] cursor-pointer' onClick={() => onCloseMenu()} /> :
                                    <MenuUnfoldOutlined className='text-xl pl-3 pt-2 text-[#979797] cursor-pointer' onClick={() => showMenu()} />
                        }
                    </div>
                </div>

            </div>
            {
                (!open && !opneMenu) &&
                <div className='bg-black text-white z-[1]'>
                    <div className='container mx-auto flex flex-row md:gap-1 flex-wrap'>
                        {
                            headerState.map(dt => (
                                <Link key={dt.id} to={appState == "home" ? dt.name[0].name : (appState + '/' + dt.name[0].name)} className='text-xs no-underline py-3 px-3' style={{ color: dt.name[0].name == currentHeader ? 'white' : '#979797' }}>{dt.name[language].name}</Link>

                            ))
                        }
                    </div>
                </div>
            }
            {
                (!open && !opneMenu) &&
                <div className='bg-[#F5F5F7] text-[#575757] z-[1]'>
                    <div className='container mx-auto flex flex-row md:gap-1 flex-wrap'>
                        {
                            headerProductState.map(dt => (
                                <Link key={dt.id} to={appState == "home" ? (currentHeader + '/' + dt.name[0].name) : (appState + '/' + currentHeader + '/' + dt.name[0].name)} className='text-xs no-underline py-3 px-3' style={{ color: dt.name[0].name == currentHeaderProduct ? 'black' : '#979797' }}>{dt.name[language].name}</Link>

                            ))
                        }

                    </div>
                </div>
            }
            <Drawer
                placement={'top'}
                closable={false}
                onClose={onClose}
                open={open}
                style={{ backgroundColor: 'black', paddingTop: 100 }}
            >

                <div className='container mx-auto flex flex-row items-center gap-3'>
                    <Search value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={value => {
                            navigate('/find?q=' + value);
                            onClose();
                            setSearchValue('');
                        }} /> <CloseCircleOutlined className='text-white text-2xl pt-2 cursor-pointer' onClick={() => onClose()} />
                </div>
                <div className='container mx-auto'>
                    <div className='text-white py-2 font-semibold text-lg'> {language == 0 ? 'Sản phẩm mới' : 'New Products'}</div>
                    {
                        dataSearch.map((dt, index) => <div key={index} className='text-white py-2 cursor-pointer px-1 rounded hover:bg-slate-900' onClick={() => {
                            navigate(dt.path);
                            dishpatch(clearStateApp());
                            onClose();
                        }}>{dt.name[language].name}</div>)
                    }
                </div>
            </Drawer>
            <Drawer
                placement={'left'}
                closable={false}
                onClose={onCloseMenu}
                open={opneMenu}
                style={{ backgroundColor: 'black', width: '100vw', paddingTop: 100 }}
            >
                <div className='flex flex-col min-h-[100%]'>
                    <div className='flex flex-col gap-3'>
                        {
                            appRoutes.map(r => <Link onClick={() => onCloseMenu()} to={r.path} key={r.path} className='no-underline text-2xl font-semibold' style={{ color: appState == r.state ? 'white' : '#979797' }}>
                                {r.label && r.label[language]}
                            </Link>)
                        }
                    </div>
                    <div className='flex-auto'></div>
                    <div className='text-white'>
                        <div className='w-28 flex justify-start pb-2'>
                            <Select bordered={false} value={language} onChange={(e) => dishpatch(setLangauge(e))} options={[
                                { value: 0, label: 'Tiếng việt' },
                                { value: 1, label: 'English' },
                            ]} />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='font-bold text-xs'>
                                <Image src={phone} preview={false} width={14} className='pr-1' />
                                0927.20.20.20
                            </div>
                            <div className='font-bold text-xs'>
                                <Image src={map} preview={false} width={14} className='pr-1' />
                                06 Bùi Đạt, phường An Hưng, TP Thanh Hóa
                            </div>
                        </div>
                    </div>

                </div>
            </Drawer>
        </div>
    )
}

export default Header