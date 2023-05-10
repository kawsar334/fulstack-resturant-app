import "./slider.scss"
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
// import "./styles.css";
import { Navigation } from "swiper";
const Slider = () => {
    const slidItems= [
        {
            id:1,
            title:"this is title",
            img:"/imgs/b.png",
            cat:"breackfast",

        },
        {
            id: 2,
            title: "this is title",
            img: "/imgs/p2.png",
            cat: "breackfast",

        },
        {
            id: 3,
            title: "this is title",
            img: "/imgs/p3.png",
            cat: "breackfast",

        },
        {
            id: 4,
            title: "this is title",
            img: "/imgs/p4.png",
            cat: "breackfast",

        },
        {
            id: 5,
            title: "this is title",
            img: "/imgs/p5.png",
            cat: "breackfast",

        },
        {
            id: 6,
            title: "this is title",
            img: "/imgs/b.png",
            cat: "breackfast",

        },

    ]
  return (
    <div className="slider">
        
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">


            {
                slidItems.map((item)=>(

                    <SwiperSlide key={item.id}>
                       <div className="item">
                        <div className="itemtop">
                            <img src={item.img} alt="Loading..." />
                        </div>
                        <div className="itembottom">
                            <h1>{item.title}</h1>
                            <a href="#">Order Now</a>
                        </div>
                       </div>
                    </SwiperSlide>
                ))
            }
              {/* <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
              <SwiperSlide>Slide 5</SwiperSlide>
              <SwiperSlide>Slide 6</SwiperSlide>
              <SwiperSlide>Slide 7</SwiperSlide>
              <SwiperSlide>Slide 8</SwiperSlide>
              <SwiperSlide>Slide 9</SwiperSlide> */}
              
              

          </Swiper>
    </div>
  )
}

export default Slider