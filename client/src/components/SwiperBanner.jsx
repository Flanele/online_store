import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles/SwiperBanner.css'

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import img1 from '../assets/banner_img-1.jpg';
import img2 from '../assets/banner_img-2.jpg';
import img3 from '../assets/banner_img-3.jpg';
import img4 from '../assets/banner_img-4.jpg';
import img5 from '../assets/banner_img-5.jpg';
import img6 from '../assets/banner_img-6.jpg';
import img7 from '../assets/banner_img-7.jpg';
import img8 from '../assets/banner_img-8.png';
import { Button, Text } from '@chakra-ui/react';

export default function SwiperBanner() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        autoplay={{
            delay: 4000
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="banner__container main-slide">
                <img src={img1} alt="" />
                <div className="slide__container">
                    <Text className="main-slide__text">The New Collection</Text>
                    <Button 
                        variant="outline" 
                        colorScheme="whiteAlpha" 
                        fontSize="24px"
                        _hover={{
                            color: "white", 
                            borderColor: "white" 
                        }}
                        sx={{textTransform: 'uppercase'}}
                    >
                        EXPLORE NOW
                    </Button>
                </div>
                <img src={img2} alt="" />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="banner__container second-slide">
                <img src={img3} />
                <img src={img4} />
                    <div className="slide__container">
                    <Button 
                        variant="outline" 
                        colorScheme="whiteAlpha" 
                        fontSize="24px"
                        _hover={{
                            color: "white", 
                            borderColor: "white" 
                        }}
                        sx={{textTransform: 'uppercase', marginLeft: '150px'}}
                    >
                        EXPLORE NOW
                    </Button> 
                    </div>                     
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="banner__container">
            <img src={img5} />
            <img src={img6} />
        </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="banner__container fourth-slide">
                <img src={img7} />
                <div className="fourth-slide__container">
                    <img src={img8} className="fourth-slide__img" />
                </div>
            </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
