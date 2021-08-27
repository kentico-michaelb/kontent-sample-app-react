import React from 'react';
import { translate } from 'react-translate';

import Link from '../Components/LowerCaseUrlLink';

const TasteOurCoffee = props => {
  let cafes = props.cafes.map((cafe, index) => {
    let city = cafe.city.value;
    let imageLink = cafe.photo.value[0].url;
    let itemId = cafe.system.id;

    return (
      <div className="col-xs-6 col-md-3" key={index}>
        <div data-kontent-item-id={itemId}>
          <Link to={`/${props.language}/cafes`} className="ourcoffee-tile-link">
            <h2 className="ourcoffee-tile-text center-text"
              data-kontent-element-codename="city"
            >{city}</h2>
            <span className="cafe-overlay"> </span>
            <img
              alt={city}
              className="ourcoffee-tile-image"
              src={imageLink}
              title={city}
              data-kontent-element-codename="photo"
            />
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="row">
      <div>
        <h1 className="title-tab">{props.t('title')}</h1>
      </div>
      {cafes}
    </div>
  );
};

export default translate('TasteOurCoffee')(TasteOurCoffee);
