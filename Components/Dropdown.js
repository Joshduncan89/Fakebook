import { useState, Fragment, useEffect } from "react";
import { Menu, Switch, Transition } from "@headlessui/react";
import { LogoutIcon } from "@heroicons/react/solid";

import { DocumentAddIcon } from "@heroicons/react/solid";

import { signOut, useSession, signIn } from "next-auth/react";
import {
  HomeIcon,
  MenuIcon,
  PaperAirplaneIcon,
  SunIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { useTheme } from "next-themes";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtoms";

const Dropdownbar = () => {
  const [toggleModal, setToggleModal] = useRecoilState(modalState);
  const { systemTheme, theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  const triggerModal = () => {
    setToggleModal(true);
  };

  const logout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      signOut();
    }
  };

  const renderTheme = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return <button className='bg-blue-500 border  w-3 h-3 rounded-full' />;
    } else {
      return <button className='bg-white border  w-3 h-3 rounded-full' />;
    }
  };
  return (
    <Menu as='div' className='relative inline-block md:hidden'>
      <div className='flex items-center justify-center'>
        <Menu.Button className='inline-flex w-full justify-center items-center  text-sm font-medium text-black dark:text-white hover:bg-opacity-30  focus:outline-none'>
          <MenuIcon className='h-7 w-7 -mr-3' />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-1 py-1 '>
            <Menu.Item>
              {({ active }) => (
                <button
                  disabled
                  className={`${
                    active ? "bg-slate-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <HomeIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                  ) : (
                    <HomeIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                  )}
                  Home
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  disabled
                  className={`${
                    active ? "bg-slate-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <PaperAirplaneIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  ) : (
                    <PaperAirplaneIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  )}
                  Share
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={triggerModal}
                  className={`${
                    active ? "bg-slate-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  href='/contribute'
                >
                  {active ? (
                    <DocumentAddIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  ) : (
                    <DocumentAddIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  )}
                  New Post
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  disabled
                  onClick={logout}
                  className={`${
                    active ? "bg-slate-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <UserGroupIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  ) : (
                    <UserGroupIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  )}
                  Discover
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className={`${
                    active ? "bg-slate-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                >
                  {active ? (
                    <SunIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                  ) : (
                    <SunIcon className='mr-2 h-5 w-5' />
                  )}
                  <span className='flex-1'>Darkmode</span>
                  <div className='bg-teal-400  rounded-full h-4 w-4 flex items-center justify-center'>
                    {renderTheme()}
                  </div>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => (session ? signOut() : signIn())}
                  className={`${
                    active ? "bg-slate-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <LogoutIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                  ) : (
                    <LogoutIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                  )}
                  {session ? "Logout" : "Sign In"}
                </button>
              )}
            </Menu.Item>
          </div>
          <div className='px-1 py-1'></div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdownbar;
