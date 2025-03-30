import React from 'react';
import { Carousel } from 'antd';

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: '50%',
};

const ImgCarousel: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange}>
      <div>
        <img
          alt="avatar"
        // eslint-disable-next-line max-len
          src="https://avatars.mds.yandex.net/i?id=3a4b25811801d377b6df70980e7c1591_l-8342740-images-thumbs&ref=rim&n=13&w=1920&h=1080"
          style={imgStyle}
        />
      </div>
      <div>
        <img
          alt="avatar"
        // eslint-disable-next-line max-len
          src="https://i.pinimg.com/originals/04/e4/e6/04e4e6471384cac27fc928008fcc891b.jpg"
          style={imgStyle}
        />
      </div>
      <div>
        <img
          alt="avatar"
        // eslint-disable-next-line max-len
          src="https://i.tez-tour.travel/img/hotels/14733/4.jpg"
          style={imgStyle}
        />
      </div>
      <div>
        <img
          alt="avatar"
        // eslint-disable-next-line max-len
          src="https://i.ytimg.com/vi/7e6bGHVZkVI/maxresdefault.jpg"
          style={imgStyle}
        />
      </div>

    </Carousel>
  );
};

export default ImgCarousel;
