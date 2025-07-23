'use client';

import { truncate } from "fs";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Clear message and show form again after timeout
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage('');
        setIsSuccess(false);
      }, isSuccess ? 5000 : 3000); // 5 seconds for success, 3 seconds for error

      return () => clearTimeout(timeout);
    }
  }, [message, isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address');
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('🎉 Successfully joined the waitlist! Check your email for confirmation.');
        setIsSuccess(true);
        setEmail('');
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('Network error. Please check your connection and try again.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const socials = [
    { name: 'Github', url: 'https://x.com/serendaleai', icon: '/icons/github.svg' },
    { name: 'Discord', url: 'https://discord.gg/serendaleai', icon: '/icons/discord.svg' },
    { name: 'Reddit', url: 'https://t.me/serendaleai', icon: '/icons/reddit.svg' },
    { name: 'Twitter', url: 'https://t.me/serendaleai', icon: '/icons/twitter.svg' },
  ];

  return (
    <div className="w-full flex flex-col gap-y-30 xl:gap-y-0 overflow-hidden xl:overflow-visible h-screen xl:h-auto max-h-screen">
      <main className="flex flex-col mx-auto gap-[48px]  pt-8 3xl:pt-10 w-full items-center">
        <nav className="flex gap-[24px] font-clash w-full justify-between max-w-screen-xl px-4 xl:px-0">
          <Link href="/">
            <Image src="/icons/logo.svg" alt="Serendale AI" width={117} height={34} />
          </Link>
          <div className="hidden xl:flex  gap-[24px]">
            <Link href="/">Smart-contracts</Link>
            <Link href="/">Services</Link>
            <Link href="/">Solutions</Link>
            <Link href="/">Roadmap</Link>
            <Link href="/">Whitepaper</Link>
          </div>
          <div className="flex gap-[16px]">
            {
              socials.map((social) => (
                <Link target="_blank" href={social.url} key={social.name}>
                  <Image src={social.icon} alt={social.name} width={20} height={20} />
                </Link>
              ))
            }
          </div>
        </nav>
        <div className="flex xl:mt-20 mt-0 flex-col items-center text-center gap-[24px]">
          <h1 className="xl:text-[80px] text-[40px] leading-[1.1] font-clash w-[15ch] font-medium">
            <span
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #FF3BFF 0%, #ECBFBF 38%, #5C24FF 76%, #D94FD5 100%)",
              }}
            >
              A Fast Blockchain.
            </span>{" "}
            Scalable AI.
          </h1>
          <p className="xl:text-[20px] text-[16px] font-light font-cabinet max-w-[38ch] xl:max-w-[50ch] mx-auto leading-relaxed">
          Our technology performing fast blockchain (120K TPS) and it has guaranteed AI-based data security. Proof of Stake, its consensus algorithm enables unlimited speeds.
          </p>
          <div className="flex flex-col gap-3 ">
            {!isSuccess && (
              <form onSubmit={handleSubmit} className="flex max-w-full w-full xl:w-auto gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="text-white bg-transparent border-2 border-white rounded-full px-5 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50" 
                />
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="relative rounded-full font-normal font-space px-5 py-4 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="z-[1] absolute p-0 top-0 right-0 bottom-0 left-0 rounded-full gradient-border"></span>
                  <span className="z-[2] absolute p-0 top-0.5 right-0.5 left-0.5 bottom-0.5 rounded-full bg-black"></span>
                  <span className="relative z-10 p-0 text-white flex items-center justify-center">
                    {isLoading ? 'Joining...' : 'Join Waitlist'}
                  </span>
                </button>
              </form>
            )}
            
            {true && (
              <div className={`text-center max-w-full w-full ${
                isSuccess 
                  ? ' text-green-400 ' 
                  : ' text-red-400'
              }`}>
                {message}
                {isSuccess && (
                  <div className="mt-2 text-sm opacity-75">
                    Form will reappear in a few seconds...
                  </div>
                )}
              </div>
            )}
            {/* <button className="text-white border-2 border-white cursor-pointer px-5 py-4 rounded-full">
              <span className="font-space font-normal">
                Ecosystems
              </span>
            </button> */}
          </div>
        </div>
      </main>
        
        {/* Animated Background Blur Circles */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-400/25 to-cyan-400/25 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute w-72 h-72 bg-gradient-to-r from-indigo-400/35 to-purple-400/35 rounded-full blur-3xl animate-float-fast"></div>
        </div>

        <Image src="/hero.png" alt="Serendale AI" className="w-full scale-200 xl:scale-100 h-auto relative z-10" width={1000} height={1000} />
      
    </div>
  );
}
