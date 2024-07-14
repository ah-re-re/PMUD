import logo from '@/assets/logo.jpg'
import map from '@/assets/map.png'
import phone from '@/assets/phone.png'
import appRoutes from '@/router/appRoutes'
import { RootState } from '@/store'
import { Image } from 'antd'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {
  const { appState, language } = useSelector((state: RootState) => (state.appState));
  const navigate = useNavigate()
  return (
    <div className='container mx-auto text-white'>
      <div className='flex flex-col justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-3 p-3 border-b-[#202020] border-[0px] border-b-[1px] border-solid'>
          <div className='col-span-1 pb-6 md:pb-0'>
            <div className='flex flex-row items-center cursor-pointer' onClick={() => navigate('/')}>
              <Image preview={false} width={24} src={logo} />
              <div className='pl-2 font-semibold'>HNPharmacy</div>
            </div>
            <div className='pt-6 font-bold'>
              Hiệu thuốc Hà Nội
            </div>
          </div>
          <div className='col-span-1 flex flex-col md:items-center'>
            <div className='flex flex-col gap-4'>
              {
                appRoutes.map(r => <Link to={r.path} key={r.path} className='no-underline font-semibold' style={{ color: appState == r.state ? 'white' : '#979797' }}>
                  {r.label && r.label[language]}
                </Link>)
              }
            </div>
          </div>
          <div className='col-span-1'>
            <div className='flex flex-col pt-3 md:pt-0 md:items-end md:justify-end container mx-auto'>
              <div className='flex flex-col gap-3'>
                <div className='text-xs text-[#979797]'>
                  Liên Hệ
                </div>
                <div className='font-bold text-xs'>
                  <Image src={phone} preview={false} width={14} className='pr-1' />
                  0987654321
                </div>
                <div className='font-bold text-xs'>
                  <Image src={map} preview={false} width={14} className='pr-1' />
                  Hai Bà Trưng, Hà Nội
                  {}
                </div>
                <div className='w-full h-40 bg-white'>
                  <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15016.626371239125!2d105.72982512076418!3d19.79095689456106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3136f8385a153211%3A0x2ab0438ee603b47e!2zQW4gSG_huqFjaCwgVGhhbmggSG_DoSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1684458079864!5m2!1svi!2s"></iframe>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className='p-3 text-[#CDCDCD] text-xs'>
          Hiệu thuốc Hà Nội
        </div>
      </div>
    </div>
  )
}

export default Footer