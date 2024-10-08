import { memo } from 'react';
import { Link } from 'react-router-dom';
import { node, oneOf } from 'prop-types';

import styles from './LinkButton.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { useMediaStore } from '@/stores/mediaStore';

const LINK_URL = {
  bottles: './calendar',
  statistics: './statistics',
};

LinkButton.propTypes = {
  children: node.isRequired,
  type: oneOf(['bottles', 'statistics']),
};

function LinkButton({ children, type = 'bottles' }) {
  const desktop = useMediaStore((store) => store.desktop);
  const iconSize = desktop
    ? type === 'bottles'
      ? { width: 30, height: 36 }
      : { width: 36, height: 36 }
    : {};

  return (
    <Link
      className={styles.linkButton}
      aria-label={`${children} 페이지`}
      to={LINK_URL[type]}
    >
      <SVGIcon {...icons[type]} {...iconSize} />
      <span>{children}</span>
    </Link>
  );
}

export default memo(LinkButton);
