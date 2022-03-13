import { modalState } from "../atoms/modalAtoms";
import { useRecoilState } from "recoil";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";

const Modal = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const fileRef = useRef(null);
  const captionRef = useRef(null);

  const uploadPost = async () => {
    if (loading) return;

    setIsLoading();

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timeStamp: serverTimestamp(),
    });
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as={"div"}
        onClose={setOpen}
        className='z-10 fixed inset-0 overflow-y-auto'
      >
        <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    alt='photo'
                    onClick={() => setSelectedFile(null)}
                  />
                ) : (
                  <div
                    className='flex mx-auto justify-center items-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'
                    onClick={() => fileRef.current.click()}
                  >
                    <CameraIcon className='h-6 w-6' aria-hidden='true' />
                  </div>
                )}
                <div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      className='text-lg leading-6 font-medium text-gray-900'
                      as='h3'
                    >
                      Upload a photo
                    </Dialog.Title>
                    <div>
                      <input
                        type='file'
                        ref={fileRef}
                        hidden
                        onChange={addImageToPost}
                      />
                    </div>
                    <div className='mt-2 '>
                      <input
                        ref={captionRef}
                        type='text'
                        className='w-full text-center focus:ring-0 border-none focus:bg-gray-100'
                        placeholder='Please enter a caption...'
                      />
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    className='inline-flex justify-center w-full bg-red-600 rounded-md text-white border border-transparent shadow-sm hover:bg-red-700 text-base font-medium focus:outline-none
                        focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm p-1'
                    onClick={uploadPost}
                  >
                    Upload Post
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
