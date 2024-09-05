import { Outlet } from 'react-router-dom';
import style from './RootLayout.module.css';
import GNBLink from '@/components/GNBLink/GNBLink';

function RootLayout() {
  return (
    <div className={style.component}>
      <GNBLink initialSelected="navPerson" />
      <Outlet />
    </div>
  );
}

export default RootLayout;
