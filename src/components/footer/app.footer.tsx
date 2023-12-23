"use client"
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {

    const hasMounted = useHasMounted();

    if (!hasMounted) return (<></>)
    return (
        <div>
            <AppBar position="fixed"
                sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
            >
                <Container sx={{
                    display: "flex",
                    gap: 10,
                    ".rhap_volume-indicator": { background: "#333 !important" },
                    ".rhap_progress-indicator": { background: "#333 !important" },
                    ".rhap_container svg": { color: "#333 !important" }
                }}>
                    <AudioPlayer
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
                        volume={1}
                        style={{
                            boxShadow: "unset",
                            background: "#f2f2f2",
                        }}
                        layout="horizontal"
                    />
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "center",
                        minWidth: 100
                    }}>
                        <div style={{ color: "#ccc" }}>Gia Dai</div>
                        <div style={{ color: "#333" }}>Who am I ?</div>
                    </div>
                </Container>
            </AppBar>
        </div>
    )
}

export default AppFooter;