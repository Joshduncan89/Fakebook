import {
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import {
  AcademicCapIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { modalState } from "../atoms/modalAtoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Dropdownbar from "./Dropdown";

const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [toggleModal, setToggleModal] = useRecoilState(modalState);

  useEffect(() => {
    setTheme("dark");
    setMounted(true);
  }, []);

  const triggerModal = () => {
    setToggleModal(true);
  };

  const renderTheme = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon
          className='hidden md:inline-block h-7 w-7 cursor-pointer hover:scale-125 transition-all duration-75 ease-out hover:fill-yellow-300 '
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <div className='hidden md:inline-flex items-center justify-center hover:bg-black/5 rounded-full hover:scale-110  transition-all duration-75 ease-out group h-8 w-8'>
          <MoonIcon
            className='h-7 w-7 cursor-pointer  group-hover:fill-yellow-600'
            onClick={() => setTheme("dark")}
          />
        </div>
      );
    }
  };

  return (
    <div className='shadow-sm border-b z-50 bg-white sticky dark:bg-gray-700'>
      <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>
        {/* LEFT Logo*/}
        <div
          onClick={() => router.push("/")}
          className='cursor-pointer relative hidden lg:inline-grid lg:ml-3 items-center'
        >
          <h1 className='text-xl font-lobster'>FAKEBOOK</h1>
        </div>

        <AcademicCapIcon
          onClick={() => router.push("/")}
          className='cursor-pointer relative w-10 lg:hidden flex-shrink-0 mr-3'
        />

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

        <div className='flex items-center justify-end space-x-4 lg:mr-3'>
          {renderTheme()}

          <HomeIcon onClick={() => router.push("/")} className='h-10 navBtn' />
          <Dropdownbar />
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
              <img
                onClick={signOut}
                src={session?.user?.image}
                className='hidden md:inline-block w-10 h-10 rounded-full cursor-pointer'
              />
            </>
          ) : (
            <div>
              <button className='hidden md:inline-block' onClick={signIn}>
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
