import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateFailure, updateStart, updateSuccess } from "../redux/user/userSlice";
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function DashProfile() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({})
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
  const [updateUserError, setUpdateUserError] = useState(null)
  const filePickerRef = useRef();
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(
    () => {
      if (imageFile) {
        uploadImage();
      }
    },
    [imageFile]
  );

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit =  async (e)=>{
    e.preventDefault()
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    if(Object.keys(formData).length === 0){
      setUpdateUserError('No update made.')
      return;
    }
    if(imageFileUploading){
      setUpdateUserError('Please wait for image to upload.')
      return;
    }
    try{
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = res.json()
      if(!res.ok){
        dispatch(updateFailure(data.message))
        setUpdateUserError(data.message)
      }else{
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("User profile updated successfully")
      }
    }catch(error){
      dispatch(updateFailure(error.message))
      setUpdateUserError(error.message)
    }
  }

  const uploadImage = async () => {
    setImageFileUploading(true)
    setImageFileUploadError(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image(File must be less than 2MB)"
        );
        setImageFileUploadingProgress(null)
        setImageFileUrl(null)
        setImageFile(null)
        setImageFileUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({...formData, profilePicture: downloadURL})
          setImageFileUploading(false)
        });
      }
    );
  };

  const handleDeleteUser = async ()=>{
    setShowModal(false)
    try{
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      })

      const data = await res.json()
      if(!res.ok){
        dispatch(deleteUserFailure(data.message))
      }
      else{
        dispatch(deleteUserSuccess(data))
      }
    }
    catch(err){
        dispatch(deleteUserFailure(err.message))
    }
  }

  return (
    <div className="max-w-lg mx-auto w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar value={imageFileUploadingProgress || 0} text={`${imageFileUploadingProgress}%`} 
              strokeWidth={5}
              styles={{
                root:{
                  width: '100%',
                  height : '100%',
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path:{
                  stroke: `rgba(62, 152, 199, ${imageFileUploadingProgress / 100})`
                }
              }}
            />

          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-60'}`}
          />
        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
        
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}onChange={handleChange}
        />
        <TextInput type="password" id="password" placeholder="Password" onChange={handleChange}/>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={()=>setShowModal(true)}>Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>{updateUserSuccess}</Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>{error}</Alert>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete your account</h3>
            <div className="flex justify-center gap-4">
              <Button color='failure' onClick={handleDeleteUser}>Yes, I'm Sure</Button>
              <Button color='gray' onClick={()=>setShowModal(false)}>No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
