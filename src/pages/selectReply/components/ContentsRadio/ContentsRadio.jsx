import { contentType } from '@/@types';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { CONTENT_LABEL } from '@/constants';
import icons from '@/icons';
import { bool, func } from 'prop-types';
import { memo, useEffect, useId, useState } from 'react';
import style from './ContentsRadio.module.css';

ContentsRadio.propTypes = {
  contentType: contentType.isRequired,
  selected: bool.isRequired,
  onSelect: func,
};

function ContentsRadio({ contentType, selected, onSelect }) {
  const [content, setContent] = useState(() => icons[contentType]);
  const radioInputId = useId();

  useEffect(() => {
    setContent(icons[`${contentType}${selected ? '_selected' : ''}`]);
  }, [contentType, selected]);

  const onChange = () => {
    onSelect(contentType);
  };

  return (
    <>
      <input
        className={style.radioInput}
        id={radioInputId}
        type="radio"
        name="content-type"
        value={contentType}
        onChange={onChange}
      />
      <label className={style.radioCard} htmlFor={radioInputId}>
        <SVGIcon {...content} />
        <span>{CONTENT_LABEL[contentType]}</span>
      </label>
    </>
  );
}

export default memo(ContentsRadio);
