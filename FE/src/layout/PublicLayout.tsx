import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
// @ts-ignore
import MessengerCustomerChat from 'react-messenger-customer-chat'

const PublicLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='flex-auto bg-[#F9F9F9] pb-7'>
                <div className='container mx-auto'>
                    <Outlet />
                </div>
            </div>
            <div className='bg-black'>
                <Footer />
            </div>
            <MessengerCustomerChat
                pageId="112942438446480"
                appId="773407067514617"
                language="vn-VN"
            />
        </div>
    )
}

export default PublicLayout