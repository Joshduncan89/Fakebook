import Image from "next/image";
import {
  PlusCircleIcon,
  SearchIcon,
  HeartIcon,
  UserGroupIcon,
  MenuIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { modalState } from "../atoms/modalAtoms";
import { useRecoilState } from "recoil";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [toggleModal, setToggleModal] = useRecoilState(modalState);
  console.log(session);

  const triggerModal = () => {
    setToggleModal(true);
  };

  return (
    <div className='shadow-sm border-b z-50 bg-white sticky'>
      <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>
        {/* LEFT Logo*/}
        <div
          onClick={() => router.push("/")}
          className='cursor-pointer relative hidden lg:inline-grid w-24'
        >
          <Image
            src='https://links.papareact.com/ocw'
            layout='fill'
            objectFit='contain'
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className='cursor-pointer relative w-10  lg:hidden flex-shrink-0'
        >
          <Image
            src='https://links.papareact.com/jjm'
            layout='fill'
            objectFit='contain'
          />
        </div>
        {/* CENTER Search Input*/}
        <div className='max-w-xs'>
          <div className='relative mt-1 p-3 rounded-md'>
            <div className='absolute inset-y-0 pl-3 flex items-center '>
              <SearchIcon className='h-5 w-5 text-gray-500' />
            </div>
            <input
              className='bg-gray-200 pl-10 block w-full sm:text-small border-gray-300 focus:ring-black focus:border-black
            focus:bg-gray-100
            rounded-md'
              input='text'
              placeholder='Search'
            />
          </div>
        </div>
        {/* RIGHT */}

        <div className='flex items-center justify-end space-x-4'>
          <HomeIcon onClick={() => router.push("/")} className='h-10 navBtn' />
          <MenuIcon className='h-6 md:hidden cursor-pointer' />
          {session ? (
            <>
              <div className='relative navBtn'>
                <PaperAirplaneIcon className='navBtn' />
                <div className='flex bg-red-500 rounded-full w-5 h-5 items-center justify-center absolute -top-1 animate-pulse cursor-pointer'>
                  3
                </div>
              </div>
              <PlusCircleIcon onClick={triggerModal} className='navBtn' />
              <UserGroupIcon className='navBtn' />
              <HeartIcon className='navBtn' />
              <img
                onClick={signOut}
                src={session?.user?.image}
                className='w-10 h-10 rounded-full cursor-pointer'
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
