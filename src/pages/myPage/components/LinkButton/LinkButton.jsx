import { memo } from 'react';
import { Link } from 'react-router-dom';
import { node, oneOf } from 'prop-types';

import styles from './LinkButton.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';

const LINK_URL = {
  bottles: './calender',
  statistics: './statistics',
};

LinkButton.propTypes = {
  children: node.isRequired,
  type: oneOf(['bottles', 'statistics']),
};

function LinkButton({ children, type = 'bottles' }) {
  return (
    <Link
      className={styles.linkButton}
      aria-label={`${children} 페이지`}
      to={LINK_URL[type]}
    >
      <SVGIcon {...icons[type]} />
      <span>{children}</span>
    </Link>
  );
}

export default memo(LinkButton);
