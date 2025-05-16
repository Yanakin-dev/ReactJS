import React, { useEffect, useState } from 'react'
import leftChevron from "../../assets/left-arrow.svg";
import rightChevron from "../../assets/right-arrow.svg";
import "./Slider.css";
import sliderData from "../../data/sliderData";

export default function Slider() {

    const [sliderIndex, setSliderIndex] = useState(1);

    useEffect(() => {
        const timer = setInterval(nextImage, 2000);
        return () => clearInterval(timer);

    }, []);

    const nextImage = () => {
        setSliderIndex(state => {
            if (state >= sliderData.length) return 1;
            return state + 1;
        });

    }
    const prevImage = () => {
        let newIndex = sliderIndex - 1;
        if (newIndex < 1) newIndex = sliderData.length;
        setSliderIndex(newIndex);
    }
    return (
        <>
            <p className="index-info">{ sliderIndex} / { sliderData.length }</p>
            <div className="slider">
                <p className="image-info">{ sliderData[sliderIndex - 1].description }</p>
                <img src={`/images/img-${ sliderIndex }.jpg`} alt="estate room" className="slider-img" />

                <button className="navigation-button prev-button" onClick={ prevImage }>
                    <img src={leftChevron} alt="previous image" />
                </button>

                <button className="navigation-button next-button" onClick={ nextImage }>
                    <img src={rightChevron} alt="next image" />
                </button>
            </div>
        </>
    )
}
