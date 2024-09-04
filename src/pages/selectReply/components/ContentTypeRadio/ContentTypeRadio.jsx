import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { CONTENT_TYPE_LABEL, CONTENT_TYPES } from '@/constants';
import icons from '@/icons';
import { bool, func, oneOf } from 'prop-types';
import { memo, useEffect, useState } from 'react';
import style from './ContentTypeRadio.module.css';
import { useId } from 'react';

ContentTypeRadio.propTypes = {
  contentType: oneOf(CONTENT_TYPES).isRequired,
  selected: bool.isRequired,
  onSelect: func,
};

function ContentTypeRadio({ contentType, selected, onSelect }) {
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
        <span>{CONTENT_TYPE_LABEL[contentType]}</span>
      </label>
    </>
  );
}

export default memo(ContentTypeRadio);
