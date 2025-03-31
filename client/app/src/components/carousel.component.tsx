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

  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '500px',
    width: '50%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'left',
    background: '#364d79',
  };

  return (
    <div>
      <Carousel style={contentStyle} arrows infinite={false}>
        <div style={contentStyle}>
          <img
            alt="avatar"
          // eslint-disable-next-line max-len
            src="https://avatars.mds.yandex.net/i?id=3a4b25811801d377b6df70980e7c1591_l-8342740-images-thumbs&ref=rim&n=13&w=1920&h=1080"
            style={contentStyle}
          />
        </div>
        <div>
          <img
            alt="avatar"
          // eslint-disable-next-line max-len
            src="https://i.pinimg.com/originals/04/e4/e6/04e4e6471384cac27fc928008fcc891b.jpg"
            style={contentStyle}
          />
        </div>
        <div>
          <img
            alt="avatar"
          // eslint-disable-next-line max-len
            src="https://i.tez-tour.travel/img/hotels/14733/4.jpg"
            style={contentStyle}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default ImgCarousel;
// import React from 'react';
// import { Carousel } from 'antd';

// const contentStyle: React.CSSProperties = {
//   margin: 0,
//   height: '160px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// };

// const ImgCarousel: React.FC = () => {
//   const onChange = (currentSlide: number) => {
//     console.log(currentSlide);
//   };

//   return (
//     <Carousel afterChange={onChange}>
//       <div>
//         <h3 style={contentStyle}>1</h3>
//       </div>
//       <div>
//         <h3 style={contentStyle}>2</h3>
//       </div>
//       <div>
//         <h3 style={contentStyle}>3</h3>
//       </div>
//       <div>
//         <h3 style={contentStyle}>4</h3>
//       </div>
//     </Carousel>
//   );
// };

// export default ImgCarousel;
