import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  return (
    <div className='flex flex-col items-center bg-black min-h-screen justify-center w-full'>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className='bg-[#18d860] p-5 rounded-full text-white'
            onClick={signIn(provider.id)}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
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
