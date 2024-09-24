import { contentType } from '@/@types';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { CONTENT_LABEL } from '@/constants';
import icons from '@/icons';
import { bool, func } from 'prop-types';
import { memo, useId } from 'react';
import style from './ContentsRadio.module.css';

ContentsRadio.propTypes = {
  content: contentType.isRequired,
  selected: bool.isRequired,
  onChange: func,
};

function ContentsRadio({ content, selected, onChange }) {
  const icon = icons[`${content}${selected ? '_selected' : ''}`];
  const radioInputId = useId();

  const handleChange = () => {
    onChange?.(content);
  };

  return (
    <>
      <input
        className={style.radioInput}
        id={radioInputId}
        type="radio"
        name="typeOfContent"
        value={content}
        onChange={handleChange}
        checked={selected}
      />
      <label className={style.radioCard} htmlFor={radioInputId}>
        <SVGIcon {...icon} />
        <span>{CONTENT_LABEL[content]}</span>
      </label>
    </>
  );
}

export default memo(ContentsRadio);
