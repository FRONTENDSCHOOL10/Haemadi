import { Link } from 'react-router-dom';
import styles from './settingsPage.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { useMediaStore } from '@/stores/mediaStore';
import ProfileSettingInfo from './components/ProfileSettingInfo/ProfileSettingInfo';
import OtherSettingList from './components/OtherSettingList/OtherSettingList';

function SettingsPage() {
  return (
    <>
      <ProfileSettingInfo />
      <OtherSettingList />
    </>
  );
}

export default SettingsPage;
