import { getProviders, signIn } from "next-auth/react";
import Header from "../../Components/Header";

function Login({ providers }) {
  const handleSignin = (e) => {
    e.preventDefault();
    signIn(providers.google.id, { callbackUrl: "/" });
  };
  return (
    <>
      <Header />
      <div className='flex flex-col items-center bg-gray-100 min-h-screen w-full dark:bg-black dark:text-white pt-20'>
        <div className='flex flex-col items-center mb-20'>
          <div className='text-5xl lg:text-8xl font-semibold font-lobster'>
            FAKEBOOK
          </div>
          <p className='font-sm italic'>
            This is not a real application.Built for educational purposes only
          </p>
        </div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className='bg-blue-500 text-white p-5 rounded-md'
              onClick={handleSignin}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
      \
    </>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
