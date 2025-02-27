'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const changeLocale = (locale: string) => {
    router.push(`/${locale}`);
    setIsLanguageOpen(false);
  };

  return (
    <div
      className="relative z-50"
      onMouseEnter={() => setIsLanguageOpen(true)}
      onMouseLeave={() => setIsLanguageOpen(false)}
    >
      <button className="text-gray-700 hover:text-gray-900 border border-black py-2 px-4 rounded-full flex">
        Language
        <svg
          className="ml-2 w-3 h-6 fill-current text-black"
          viewBox="0 0 10 6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h10L5 6z" />
        </svg>
      </button>
      {isLanguageOpen && (
        <ul className="absolute -top-0 right-0 bg-white border shadow-md min-w-[150px] rounded-lg">
          <li
            className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => changeLocale('es')}
          >
            Spanish
          </li>
          <li
            className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => changeLocale('en')}
          >
            English
          </li>
          <li
            className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => changeLocale('pt')}
          >
            Portuguese
          </li>
        </ul>
      )}
    </div>
  );
}
