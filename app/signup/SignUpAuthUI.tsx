'use client';

import { useState } from 'react';
import { useSupabase } from '../supabase-provider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Turnstile } from '@marsidev/react-turnstile';
import { signIn } from 'next-auth/react';
import Input from '@/components/Input';

export default function AuthUI() {
  {
    const { supabase } = useSupabase();
    const [captchaToken, setCaptchaToken] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
      setIsLoading(true);
      const router = useRouter();

      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Logged in');
          router.refresh();
        }
      } catch (error) {
        toast.error('An error occurred during login.');
      } finally {
        setIsLoading(false);
      }
    };
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    return (
      <section className="bg-black">
        <div className="max-w-6xl text-white mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pb-20">
            {/* Page header */}
            <div className="max-w-xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="text-white font-semibold text-2xl">
                Welcome Sign up to begin creating.
              </h1>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-white text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Name
                    </label>

                    <input
                      placeholder="Enter your email"
                      className="w-full text-white px-4 py-2 focus:outline-none bg-zinc-800 border-[1px] border-zinc-600 text-md rounded-md "
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-white text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>

                    <input
                      placeholder="Enter your email"
                      className="w-full text-white px-4 py-2 focus:outline-none bg-zinc-800 border-[1px] border-zinc-600 text-md rounded-md "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <div className="flex justify-between">
                      <label
                        className="block text-white text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Password
                      </label>
                    </div>

                    <input
                      placeholder="Enter your password"
                      className="w-full text-white py-2 px-4 focus:outline-none bg-zinc-800 border-[1px] border-zinc-600 text-md rounded-md "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button
                      onClick={() => onSubmit({ email, password })}
                      className="btn px-0 py-2 text-center rounded-lg text-white bg-blue-600 hover:bg-blue-700 w-full relative flex items-center"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex items-center my-6">
                <div
                  className="border-t border-gray-300 grow mr-3"
                  aria-hidden="true"
                ></div>
                <div className="text-zinc-300 italic">Or</div>
                <div
                  className="border-t border-gray-300 grow ml-3"
                  aria-hidden="true"
                ></div>
              </div>
              <form>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full px-3">
                    <button
                      onClick={() => signIn('google')}
                      className="btn px-0 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
                    >
                      <svg
                        className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                      </svg>
                      <span className="flex-auto pl-16 pr-8 -ml-16">
                        Continue with Google
                      </span>
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-zinc-400 text-center mt-6 pb-6">
                Already using Fitpal?{' '}
                <Link
                  href="/signin"
                  className="text-blue-600 pb-2hover:underline transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
