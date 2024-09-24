import { motion } from 'framer-motion';
import { oneOf } from 'prop-types';
import { memo } from 'react';
import style from './ProgressBar.module.css';

ProgressBar.propTypes = {
  progress: oneOf([1, 2, 3, 4, 5]).isRequired,
};

function ProgressBar({ progress }) {
  const progressPercent = 20 * progress;
  const progressText = `${progress} / 5`;

  return (
    <div
      className={style.wrapper}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={5}
      aria-valuenow={progress}
      aria-label={`진행도: ${progressText}`}
    >
      <motion.div
        className={style.progressBar}
        animate={{ width: `${progressPercent}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

export default memo(ProgressBar);
