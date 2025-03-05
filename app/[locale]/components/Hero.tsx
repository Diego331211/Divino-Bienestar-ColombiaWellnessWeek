'use client';

import { useTranslations } from 'next-intl';
import Typewriter from './Typewriter';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function Hero() {
    const t = useTranslations('common');
    const [email, setEmail] = useState('');
    const router = useRouter();
    const { locale } = useParams();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = () => {
        console.log('User email:', email);
        // Redirige a la página /register usando el locale actual
        router.push(`/${locale}/register`);
    };

    return (
        <section id="hero" className="py-20 px-6 sm:px-12 lg:px-20 dark:text-black">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-start h-full text-center md:text-left space-y-6 md:space-y-0">
                {/* Logo */}
                <img src="/images/Logo-16.svg" alt="logo" className="h-48 sm:h-64 md:h-80 lg:h-96 w-auto" />

                {/* Contenido */}
                <div className="px-4 max-w-[370px] sm:max-w-[200px] lg:max-w-[800px]">
                    {/* Contenedor del texto con altura fija */}
                    <h1 className="text-xl sm:text-3xl lg:text-5xl font-extrabold mb-4 flex flex-col items-center md:items-start min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] text-center md:text-left">
                        <span className="inline-block max-w-full">
                            <Typewriter
                                phrases={[
                                    t('eventName'),
                                    t('eventTagline'),
                                ]}
                                typingSpeed={100}
                                deletingSpeed={20}
                                pauseBetween={5000}
                            />
                        </span>
                    </h1>

                    <p className="text-sm md:text-lg lg:text-xl mb-6">
                        {t('eventDates')}
                    </p>

                    {/* Campo de texto y botón CTA */}
                    <div className="hidden md:flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder={t('EnterEmail')}
                            value={email}
                            onChange={handleInputChange}
                            className="border border-black px-8 py-4 rounded-full text-base"
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-orange-400 hover:bg-blue-200 transition hover:scale-105 hover:text-black border shadow-md shadow-gray-500 border-black text-white px-8 py-3 rounded-full text-base sm:text-lg font-semibold sm:w-auto whitespace-nowrap"
                        >
                            {t('Register')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Campo de texto y botón CTA para pantallas pequeñas */}
            <div className="flex flex-col sm:flex-row gap-4 md:hidden">
                <input
                    type="email"
                    placeholder={t('EnterEmail')}
                    value={email}
                    onChange={handleInputChange}
                    className="border border-black px-4 py-3 rounded-full text-base text-center sm:text-lg w-full sm:w-auto"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-orange-400 animate-bounce hover:bg-blue-200 hover:text-black border shadow-lg shadow-gray-500 border-black text-white px-8 py-3 rounded-full text-base sm:text-lg font-semibold w-full sm:w-auto whitespace-nowrap"
                >
                    {t('Register')}
                </button>
            </div>
        </section>
    );
}
