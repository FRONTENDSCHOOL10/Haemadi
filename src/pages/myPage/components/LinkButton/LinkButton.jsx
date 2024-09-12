import { memo } from 'react';
import { Link } from 'react-router-dom';
import { node, oneOf } from 'prop-types';

import styles from './LinkButton.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';

LinkButton.propTypes = {
  children: node.isRequired,
  type: oneOf(['bottles', 'statistics']),
};

function LinkButton({ children, type = 'bottles' }) {
  return (
    <Link
      className={styles.linkButton}
      aria-label={`${children} 페이지`}
      to={'./calender'}
    >
      <SVGIcon {...icons[type]} />
      <span>{children}</span>
    </Link>
  );
}

export default memo(LinkButton);
