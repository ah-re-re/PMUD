import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { Layout, MenuProps } from 'antd';
import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setAppAdminState } from '@/store/features/appAdminStateSlice';
import adminRoutes from '@/router/adminRouters';
import CreateCategory from '@/page/Admin/CreateCategory';
import CreateProduct from '@/page/Admin/CreateProduct';
import { getRequest } from '@/hook/api';
const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];


const items: MenuProps['items'] = []
adminRoutes.map(a => a.state != 'login' && items.push({ label: a.label && a.label[0], key: a.state } as MenuItem))

const PrivateLayout = () => {
  const { appAdminState } = useSelector((state: RootState) => (state.appAdminState))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        let state = await getRequest('/auth/check')
        if (state) {
          navigate('home')
        }
        else {
          navigate('/login')
        }
      } catch (error) {
        navigate('/login')
        console.log(error)
      }
    })()

  }, [])
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" mode="inline" onClick={(e) => {
          dispatch(setAppAdminState(e.key))
          navigate(e.key)
        }}
          selectedKeys={[appAdminState]} items={items} />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: '#001529' }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Outlet />
        </Content>
      </Layout>
      <CreateCategory />
      <CreateProduct />
    </Layout>
  )
}

export default PrivateLayout