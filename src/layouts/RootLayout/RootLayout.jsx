import { useAuthStore } from '@/stores/authStore';
import { useMediaStore } from '@/stores/mediaStore';
import { useSunStore } from '@/stores/sunStore';
import { getStorage } from '@/utils';
import { memo, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import GlobalNav from '../GlobalNav/GlobalNav';
import style from './RootLayout.module.css';

function RootLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const desktop = useMediaStore((store) => store.desktop);
  const sunset = useSunStore((store) => store.sunset);
  const checkSignIn = useAuthStore((store) => store.checkSignIn);

  useEffect(() => {
    // 로그인 되어있지 않으면 (토큰 유효성 검사 포함) demo | auth 페이지로 이동
    if (!checkSignIn()) {
      if (!getStorage('completeDemo')) navigate('/demo/1');
      else navigate('/auth');
    }
  }, [navigate, checkSignIn]);

  const renderMobileNav = pathname === '/' || pathname === '/my';

  // darkBg가 필요한 경로 리스트
  const darkBgRoutes = ['/music', '/pick-up-bottle', '/letter-box'];

  // 홈에서는 시간에 따라, 나머지 경로는 darkBgRoutes에 따라 설정
  const darkBg = pathname === '/' ? sunset : darkBgRoutes.includes(pathname);

  return (
    <div className={style.component}>
      <Outlet />
      {/* GlobalNav는 home과 my 페이지에서만 mobile에서도 렌더링, 나머지는 desktop에서만 렌더링 */}
      {(renderMobileNav || desktop) && <GlobalNav darkBg={darkBg} />}
    </div>
  );
}

export default memo(RootLayout);
