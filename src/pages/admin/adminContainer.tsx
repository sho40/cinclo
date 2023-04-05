import MainContainer from '@/components/admin/main/MainContainer';
import SideMenuContainer from '@/components/admin/sideMenu/SideMenuContainer';

export default function AdminContainer() {
  
  return (
    <div className='flex min-h-screen bg-admin-palette-light-gray'>
      <SideMenuContainer />
      <MainContainer />
    </div>
  )
}
