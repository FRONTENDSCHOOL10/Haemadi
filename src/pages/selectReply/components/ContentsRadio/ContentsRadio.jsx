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
  onSelect: func,
};

function ContentsRadio({ content, selected, onSelect }) {
  const icon = icons[`${content}${selected ? '_selected' : ''}`];
  const radioInputId = useId();

  const onChange = () => {
    onSelect(content);
  };

  return (
    <>
      <input
        className={style.radioInput}
        id={radioInputId}
        type="radio"
        name="content-type"
        value={content}
        onChange={onChange}
      />
      <label className={style.radioCard} htmlFor={radioInputId}>
        <SVGIcon {...icon} />
        <span>{CONTENT_LABEL[content]}</span>
      </label>
    </>
  );
}

export default memo(ContentsRadio);
