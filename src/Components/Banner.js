import React from 'react';
import { translate } from 'react-translate';
import RichTextElement from './RichTextElement';

const Banner = props => {
  const heroUnit = props.heroUnit;
  const itemId = props.heroUnit.system.id;
  const images = heroUnit.image && heroUnit.image.value;
  const imageUrl = images && images.length && images[0].url;

  return (
    <section
      className="banner-section"
      style={
        imageUrl ? { backgroundImage: 'url(' + imageUrl + ')' } : undefined
      }
      data-kontent-item-id={itemId}
      data-kontent-element-codename="image"
    >
      <h2 className="banner-heading" data-kontent-element-codename="title">
        {heroUnit.title && heroUnit.title.value}
      </h2>
      {heroUnit.marketingMessage && (
        <RichTextElement
          element={heroUnit.marketingMessage}
          className="banner-text"
          dataKontentElementCodename="marketing_message"
        />
      )}
    </section>
  );
};

export default translate('Banner')(Banner);
