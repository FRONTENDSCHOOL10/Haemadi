import { CONTENTS } from '@/constants';
import { useCallback, useState } from 'react';
import ContentsRadio from '../ContentsRadio/ContentsRadio';
import style from './ContentsGroup.module.css';

function ContentsGroup() {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelect = useCallback((contentType) => {
    setSelectedType(contentType);
  }, []);

  return (
    <div className={style.groupWrapper}>
      {CONTENTS.map((content, index) => (
        <ContentsRadio
          key={index}
          contentType={content}
          selected={selectedType === content}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}

export default ContentsGroup;
