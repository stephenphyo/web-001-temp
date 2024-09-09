import React, { useState, useEffect, useCallback } from 'react';

/* CSS Imports */
import './ImagePreview.css';

/* Image Imports */
import UploadIcon from './upload_icon.png';

/* Package Imports */
import { useDropzone } from 'react-dropzone';

function ImagePreview() {

    /* useState */
    const [selectedImage, setSelectedImage] = useState();
    const [preview, setPreview] = useState();

    /* useDropzone */
    const onDrop = useCallback(acceptedFiles => {
        setSelectedImage(acceptedFiles[0]);
      }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop, noClick: true});

    /* Functions */
    const onSelectImage = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedImage(null);
            return;
        }
        setSelectedImage(e.target.files[0]);
    }

    const uploadImage = () => {
        console.log(selectedImage.path);
    }

    /* useEffect */
    useEffect(() => {
        if (!selectedImage) {
            setPreview(null);
            return;
        }

        const objectURL = URL.createObjectURL(selectedImage);
        setPreview(objectURL);

        // Cleanup Funtion
        // Revoke Data URIs to avoid Memory Leaks
        return () => URL.revokeObjectURL(objectURL);
    }, [selectedImage]);

    return (
        <div className='image_preview'>
            <div className='image_container'>
                {
                    !selectedImage
                    ?
                    <div className='image_select' {...getRootProps()}>
                        <img id='upload_icon' alt='upload_icon' src={ UploadIcon } />
                        {
                            !isDragActive
                            ?
                                <p>Select an image</p>
                            :
                                <p>Drop here</p>
                        }
                        <label id='btn_input_file' htmlFor='input_file'>SELECT FILE</label>
                        <input id='input_file' type='file'
                            onChange={(e) => onSelectImage(e)} {...getInputProps()} />
                    </div>
                    :
                    <img src={preview} alt='image_preview' />
                }
            </div>
            <button id='btn_upload'onClick={() => uploadImage()}>
                Upload Image
            </button>
            <button id='btn_clear' onClick={() => setSelectedImage(null)}>
                Clear Image
            </button>
        </div>
    );
}

export default ImagePreview;