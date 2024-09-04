import { useCallback, useState } from 'react';
import ContentTypeRadio from '../ContentTypeRadio/ContentTypeRadio';
import style from './ContentTypeGroup.module.css';

function ContentTypeRadioGroup() {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelect = useCallback((contentType) => {
    setSelectedType(contentType);
  }, []);

  return (
    <div className={style.groupWrapper}>
      <ContentTypeRadio
        contentType="music"
        selected={selectedType === 'music'}
        onSelect={handleSelect}
      />
      <ContentTypeRadio
        contentType="quotes"
        selected={selectedType === 'quotes'}
        onSelect={handleSelect}
      />
      <ContentTypeRadio
        contentType="book"
        selected={selectedType === 'book'}
        onSelect={handleSelect}
      />
      <ContentTypeRadio
        contentType="video"
        selected={selectedType === 'video'}
        onSelect={handleSelect}
      />
    </div>
  );
}

export default ContentTypeRadioGroup;
