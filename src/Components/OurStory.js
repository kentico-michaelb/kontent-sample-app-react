import React from 'react';
import { translate } from 'react-translate';
import RichTextElement from './RichTextElement';

const OurStory = props => {
  const itemId = props.fact.system.id
  const fact = props.fact;
  const images = fact.image && fact.image.value;
  const imageUrl = images && images.length && images[0].url;

  return (
    <div className="row"
      data-kontent-item-id={itemId}
    >
      <h1 className="title-tab"
        data-kontent-element-codename="title"
      >
        {fact.title && fact.title.value}
      </h1>
      <div className="col-sm-12">
        <div
          className="ourstory-section center-text"
          style={
            imageUrl ? { backgroundImage: 'url(' + imageUrl + ')' } : undefined
          }
          data-kontent-element-codename="image"
        >
          {fact.description && 
            <RichTextElement 
              element={fact.description} 
              dataKontentElementCodename="description"
          />}
        </div>
      </div>
    </div>
  );
};

export default translate('OurStory')(OurStory);
