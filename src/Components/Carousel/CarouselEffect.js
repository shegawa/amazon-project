import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carousel.css';
import { img } from './img/Data';

function CarouselEffect() {
    return (
        <div>
            <Carousel
                autoPlay
                infiniteLoop
                showIndicators
                showThumbs={false}
            >
                {img.map((imageItemLink) => (
                    <img key={imageItemLink} src={imageItemLink} alt="" />
                ))}
            </Carousel>
            <div className='caro-img'></div>
        </div>
    );
}

export default CarouselEffect;