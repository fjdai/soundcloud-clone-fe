'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSearchParams } from 'next/navigation';
import { useWaveSurfer } from "@/utils/customHook";
import { WaveSurferOptions } from 'waveSurfer.js';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import './wave.scss';
import { Tooltip } from "@mui/material";

const WaveTrack = () => {
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio');
    const containerRef = useRef<HTMLDivElement>(null);
    const hoverRef = useRef<HTMLDivElement>(null);

    const [time, setTime] = useState<string>("0:00");
    const [duration, setDuration] = useState<string>("0:00");


    const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {
        return {
            waveColor: "#656666",
            progressColor: "#f50",
            height: 100,
            barWidth: 3,
            cursorColor: "none",
            url: `/api?audio=${fileName}`,
        }
    }, []);
    const waveSurfer = useWaveSurfer(containerRef, optionsMemo);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // Initialize waveSurfer when the container mounts
    // or any of the props change
    useEffect(() => {
        if (!waveSurfer) return
        setIsPlaying(false)

        const hover = hoverRef.current!;
        const waveform = containerRef.current!;
        waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))

        const subscriptions = [
            waveSurfer.on('play', () => setIsPlaying(true)),
            waveSurfer.on('pause', () => setIsPlaying(false)),
            waveSurfer.on('decode', (duration: number) => {
                setDuration(formatTime(duration));
            }),
            waveSurfer.on('timeupdate', (currentTime: number) => {
                setTime(formatTime(currentTime));
            }),
            waveSurfer.once('interaction', () => {
                waveSurfer.play()
            })
        ]

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [waveSurfer])

    // On play button click
    const onPlayClick = useCallback(() => {
        if (waveSurfer) {
            waveSurfer.isPlaying() ? waveSurfer.pause() : waveSurfer.play();
        }
    }, [waveSurfer]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    const calLeft = (moment: number) => {
        const duration = 208;
        const percent = (moment / duration) * 100;
        return `${percent}%`
    }

    const arrComments = [
        {
            id: 1,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 10,
            user: "username 1",
            content: "just a comment1"
        },
        {
            id: 2,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 30,
            user: "username 2",
            content: "just a comment3"
        },
        {
            id: 3,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 50,
            user: "username 3",
            content: "just a comment3"
        },
    ]

    return (
        <div style={{ marginTop: 20 }}>
            <div
                style={{
                    display: "flex",
                    gap: 15,
                    padding: 20,
                    height: 400,
                    background: "linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)"
                }}
            >
                <div className="left"
                    style={{
                        width: "75%",
                        height: "calc(100% - 10px)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}
                >
                    <div className="info" style={{ display: "flex" }}>
                        <div>
                            <div
                                onClick={() => onPlayClick()}
                                style={{
                                    borderRadius: "50%",
                                    background: "#f50",
                                    height: "50px",
                                    width: "50px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer"
                                }}
                            >
                                {isPlaying === true ?
                                    <PauseIcon
                                        sx={{ fontSize: 30, color: "white" }}
                                    />
                                    :
                                    <PlayArrowIcon
                                        sx={{ fontSize: 30, color: "white" }}
                                    />
                                }
                            </div>
                        </div>
                        <div style={{ marginLeft: 20 }}>
                            <div style={{
                                padding: "0 5px",
                                background: "#333",
                                fontSize: 30,
                                width: "fit-content",
                                color: "white"
                            }}>
                                Hỏi Dân IT's song
                            </div>
                            <div style={{
                                padding: "0 5px",
                                marginTop: 10,
                                background: "#333",
                                fontSize: 20,
                                width: "fit-content",
                                color: "white"
                            }}
                            >
                                Eric
                            </div>
                        </div>
                    </div>
                    <div ref={containerRef} className="wave-form-container">
                        <div className="time" >{time}</div>
                        <div className="duration" >{duration}</div>
                        <div ref={hoverRef} className="hover-wave"></div>
                        <div className="overlay"
                            style={{
                                position: "absolute",
                                height: "30px",
                                width: "100%",
                                bottom: "0",
                                background: "linear-gradient(black, black 1%, black 1%, rgba(255,255,255,0.5) 1% ,rgba(255,255,255,0))",
                            }}
                        ></div>
                        <div className="comments"
                            style={{ position: "relative" }}
                        >
                            {arrComments.map((item) => {
                                return (
                                    <Tooltip title="abc" arrow>
                                        <img
                                            key={item.id}
                                            style={{
                                                height: "20px",
                                                width: "20px",
                                                top: "71px",
                                                position: "absolute",
                                                zIndex: 20,
                                                left: calLeft(item.moment)
                                            }}
                                            onPointerMove={(e) => {
                                                const hover = hoverRef.current!;
                                                const container = containerRef.current!;
                                                if (item.moment && hover.offsetWidth <= 20)
                                                    hover.style.width = `${calLeft((item.moment + hover.offsetWidth * 208 / container.clientWidth))} `
                                            }}
                                            src={`http://localhost:8000/images/chill1.png`}
                                        />
                                    </Tooltip>

                                )
                            }
                            )}
                        </div>
                    </div>
                </div>
                <div className="right"
                    style={{
                        width: "25%",
                        padding: 15,
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <div style={{
                        background: "#ccc",
                        width: 250,
                        height: 250
                    }}>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default WaveTrack;