import { CONTENTS } from '@/constants';
import { useCallback, useState } from 'react';
import ContentsRadio from '../ContentsRadio/ContentsRadio';
import style from './ContentsRadioGroup.module.css';

function ContentsRadioGroup() {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelect = useCallback((contentType) => {
    setSelectedType(contentType);
  }, []);

  return (
    <div className={style.groupWrapper}>
      {CONTENTS.map((content, index) => (
        <ContentsRadio
          key={index}
          content={content}
          selected={selectedType === content}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}

export default ContentsRadioGroup;
