import React, { useEffect , useRef} from 'react'
import { useNavigate, useParams, useLocation} from 'react-router-dom'
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import { useState } from 'react';

const Room = () => {

    const { roomId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const zpRef = useRef();
    const videoContainerRef = useRef(null);
    const [joined, setJoined] = useState(false);
    const [callType, setCallType] = useState("");

    const myMeeting = (type) => {
        const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
        const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            " "
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zpRef.current = zp;

        zp.joinRoom({
            container: videoContainerRef.current,
            sharedLinks: [
                {
                    name: 'video link',
                    url: `https://zego-video-call-zeta.vercel.app?type=${encodeURIComponent(type)}&roomId=${roomId}`, // Updated URL with your Vercel link
                },
            ],
            scenario: {
                mode: type === "one-on-one" ? ZegoUIKitPrebuilt.OneONoneCall : ZegoUIKitPrebuilt.GroupCall,
            },
            maxUsers: type === "one-on-one" ? 2 : 10,
            onJoinRoom: () => {
                setJoined(true);
            },
            onLeaveRoom: () => {
                navigate("/");
            },
        });
    };

    const handleExit = () => {
        if (zpRef.current) {
            zpRef.current.destroy();
            zpRef.current = null;
        }
        navigate("/");
    }

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const type = query.get("type");

        setCallType(type);
    }, [location.search])

    useEffect(() => {
        if (callType) {
            myMeeting(callType);
        }

        return () => {
            if (zpRef.current) {
                zpRef.current.destroy();
                zpRef.current = null;
            }
        };
    }, [callType, roomId, navigate])

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            {!joined && (
                <>
                    <header className=' bg-slate-400 w-full h-20 text-2xl font-bold flex items-center justify-center mb-4'>
                        {callType === "one-on-one" ? "One-On-One Video Call" : "Group Video Call"}
                    </header>
                    <button onClick={handleExit}
                        className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-8 rounded shadow-lg transition duration-200 mt-4 mb-8'
                    >Exit</button>
                </>
            )}
            <div ref={videoContainerRef} className='w-full h-full'></div>
        </div>
    )
}

export default Room;
