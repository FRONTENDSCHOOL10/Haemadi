import { useMediaStore } from '@/stores/mediaStore';
import { Outlet, useLocation } from 'react-router-dom';
import GlobalNav from '../GlobalNav/GlobalNav';
import style from './RootLayout.module.css';

function RootLayout() {
  const { pathname } = useLocation();
  const desktop = useMediaStore((store) => store.desktop);
  const renderMobileNav = pathname === '/' || pathname === '/my';

  return (
    <div className={style.component}>
      <Outlet />
      {/* GlobalNav는 home과 my 페이지에서만 mobile에서도 렌더링, 나머지는 desktop에서만 렌더링 */}
      {renderMobileNav ? <GlobalNav /> : desktop && <GlobalNav />}
    </div>
  );
}

export default RootLayout;
