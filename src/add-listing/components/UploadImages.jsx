import { useState, useEffect } from "react";
import { X } from 'lucide-react';
import { storage } from "./../../../configs/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PropTypes from 'prop-types';
import { carImages } from "./../../../configs/schema";
import { db } from "./../../../configs";

function UploadImages({ triggerUploadImages, setLoader }) {
    const [selectedFileList, setSelectedFileList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (triggerUploadImages !== null) {  // Update condition to check for null
            UploadImageToServer();
        }
    }, [triggerUploadImages]);

    // Add image to selected file list
    const onFileSelected = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setSelectedFileList(prev => [...prev, file]);
        }
    };  

    // Remove image from selected file list
    const onImageRemove = (image) => {
        setSelectedFileList(prev => prev.filter(item => item !== image));
    };

    const UploadImageToServer = async () => {
        try {
            setError(null);
            
            for (const file of selectedFileList) {
                const fileName = Date.now() + '.jpeg';
                const storageRef = ref(storage, 'car-marketplace/' + fileName);
                const metaData = {
                    contentType: 'image/jpeg'
                };

                const snapshot = await uploadBytes(storageRef, file, metaData);
                const downloadUrl = await getDownloadURL(snapshot.ref);
                
                await db.insert(carImages).values({
                    imageUrl: downloadUrl,
                    carListingId: triggerUploadImages
                }).execute();
            }
            
            setSelectedFileList([]);
            setLoader(false);
        } catch (err) {
            setError('Failed to upload images');
            console.error(err);
            setLoader(false);
        }
    };

    return (
        <div>
            <h2 className="font-medium text-xl my-3">Upload Images</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {selectedFileList && selectedFileList.map((image, index) => (
                    <div key={index}>
                        <X onClick={() => onImageRemove(image, index)} width={20} className="absolute m-2 text-white hover:text-red-500 hover:shadow-sm"/>
                        <img src={URL.createObjectURL(image)} alt="Car" className="w-full h-40 object-cover border border-gray-500 rounded-xl"/>
                    </div>
                ))}

                <label htmlFor="upload-images">
                    <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-8 hover:cursor-pointer hover:shadow-md h-40 flex justify-center items-center">
                        <h2 className="text-lg text-center text-primary">+</h2>
                    </div>
                </label>
                <input type="file" multiple={true} id="upload-images" className="opacity-0" onChange={onFileSelected}/>
            </div>
        </div>
    );
}

UploadImages.propTypes = {
    triggerUploadImages: PropTypes.number,  // Allow null by not using .isRequired
    setLoader: PropTypes.func.isRequired
};

export default UploadImages;
