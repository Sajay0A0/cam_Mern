import React from "react";
import ReactCardSlider from "react-card-slider-component";

const slides =[
    {
        img :"https://www.shutterstock.com/image-vector/chattogram-bangladesh-may-18-2023-600nw-2304647487.jpg",
        b_title :"Canon"

    },
    {
        img :"https://kreafolk.com/cdn/shop/articles/panasonic-logo-design-history-and-evolution-kreafolk.jpg?v=1707034412&width=2048",
        b_title :"Panasonic"

    },
    {
        img:"https://1000logos.net/wp-content/uploads/2021/05/Sony-logo.png",
        b_title:"Sony"
    },
    {
        img :"https://kreafolk.com/cdn/shop/articles/panasonic-logo-design-history-and-evolution-kreafolk.jpg?v=1707034412&width=2048",
        b_title :"Panasonic"

    },
    {
        img :"https://kreafolk.com/cdn/shop/articles/panasonic-logo-design-history-and-evolution-kreafolk.jpg?v=1707034412&width=2048",
        b_title :"Panasonic"

    },
    {
        img :"https://kreafolk.com/cdn/shop/articles/panasonic-logo-design-history-and-evolution-kreafolk.jpg?v=1707034412&width=2048",
        b_title :"Panasonic"

    },
];

const Horizon= ()=>{
    return(
        <div>
            <ReactCardSlider slides={slides} />
        </div>
    )
}
export default Horizon;


  