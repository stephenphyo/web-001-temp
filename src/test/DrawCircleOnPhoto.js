import { WindowSharp } from '@mui/icons-material';
import React, { useState, useEffect, useRef } from 'react';

import './DrawCircleOnPhoto.css';

import AvatarEditor from 'react-avatar-editor';

import image from './HORSEHEAD.jpg';

function DrawCircleOnPhoto() {

    /* useRef */
    const imageRef = useRef();
    
    /* useState */
    const [isMouseOnCanvas, setIsMouseOnCanvas] = useState(false);
    const [rotate, setRotate] = useState(0);
    const [scale, setScale] = useState(1);
    const [preview, setPreview] = useState(null);

    /* Functions */
    const getMousePos = (e) => {
        console.log(`${e.clientX}, ${e.clientY}`);
    };

    // const drawRectangle = () => {
    //     const canvas = canvasRef.current;
    //     const ctx = canvas.getContext('2d');

    //     // ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.strokeStyle = 'white';
    //     ctx.lineWidth = 2;
    //     // ctx.strokeRect(0, 30 + 1, 110, 90 + 1);
    //     ctx.beginPath();
    //     ctx.arc(50, 50, 100, 0, 2 * Math.PI);
    // };

    const getPreview = () => {
        // const objectURL = URL.createObjectURL(imageRef.current.getImage());
        setPreview(imageRef.current.getImage());
        console.log(imageRef.current.getImage())
    };

    /* useEffect */
    useEffect(() => {
        if (isMouseOnCanvas) {
            window.addEventListener('mousedown', getMousePos);

            return () => window.removeEventListener('mousedown', getMousePos);
        }
    }, [isMouseOnCanvas]);

    return (
        <div className='draw'>
            <div id='horizontal'>
                <div className='draw_image'>
                    <AvatarEditor
                        ref={imageRef}
                        image={image}
                        width={400}
                        height={400}
                        border={[100, 20]}
                        borderRadius={200}
                        color={[255, 255, 255, 0.5]}
                        scale={scale}
                        rotate={rotate}
                    />
                </div>
                <div className='draw_preview'>
                    <img src={preview} alt='' />
                </div>
            </div>
            <input type='range' min={0} max={360} value={rotate}
                onChange={(e) => setRotate(e.target.value)} />
            <input type='range' min={1} max={3} step={0.1} value={scale}
                onChange={(e) => setScale(e.target.value)} />
            <button onClick={getPreview}>Preview</button>
        </div>
    );
}

export default DrawCircleOnPhoto;