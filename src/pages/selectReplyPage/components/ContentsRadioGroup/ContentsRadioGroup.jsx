import { CONTENTS } from '@/constants';
import { func, oneOf } from 'prop-types';
import { useCallback } from 'react';
import ContentsRadio from '../ContentsRadio/ContentsRadio';
import style from './ContentsRadioGroup.module.css';

ContentsRadioGroup.propTypes = {
  selectedValue: oneOf(['music', 'quote', 'book', 'video']),
  onSelect: func,
};

function ContentsRadioGroup({ selectedValue, onSelect }) {
  const handleChange = useCallback(
    (contentType) => {
      onSelect?.(contentType);
    },
    [onSelect]
  );

  return (
    <fieldset className={style.groupWrapper}>
      <legend className="sr-only">Ai 답장 컨텐츠 선택</legend>
      {CONTENTS.map((content, index) => (
        <ContentsRadio
          key={index}
          content={content}
          selected={selectedValue === content}
          onChange={handleChange}
        />
      ))}
    </fieldset>
  );
}

export default ContentsRadioGroup;
