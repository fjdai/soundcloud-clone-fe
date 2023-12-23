"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button, Divider } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Link from "next/link";

interface IProps {
    title: string;
    data: ITrackTop[];
}


const MainSlider = (props: IProps) => {
    const { data, title } = props

    const NextArrow = (props: any) => {
        return (
            <Button variant={"contained"} color="inherit"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    right: 0,
                    top: "25%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35
                }}
            >
                <ChevronRight />

            </Button>
        )
    }

    const PrevArrow = (props: any) => {
        return (
            <Button variant={"contained"} color="inherit"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    top: "25%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35
                }}
            >
                <ChevronLeft />
            </Button>
        )
    }

    const settings: Settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                }
            }
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />

    };
    return (
        <Box
            sx={{
                margin: "0 50px",
                ".track": {
                    padding: "0 10px",
                    "img": {
                        height: 190,
                        width: 190
                    }
                }
            }}
        >
            <h2>{title}</h2>

            <Slider {...settings}>
                {data.map((track, index) => {
                    return (
                        <div key={track._id} className="track">
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`} />
                            <Link href={`/track/${track._id}?audio=${track.trackUrl}`}>
                                <h4>{track.title}</h4>
                            </Link>
                            <h5>{track.description}</h5>
                        </div>
                    )
                })
                }
            </Slider>
            <Divider />
        </Box>

    );
}

export default MainSlider;