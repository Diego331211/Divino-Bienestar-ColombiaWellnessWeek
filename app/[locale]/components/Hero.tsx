// app/[locale]/components/Hero.tsx
import { useTranslations } from 'next-intl';
import Typewriter from './Typewriter';

export default function Hero() {
    const t = useTranslations('common');

    return (
        <section id="hero" className="py-20 px-6 sm:px-12 lg:px-20">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-start h-full text-center md:text-left space-y-6 md:space-y-0">
                
                {/* Logo */}
                <img src="/images/Logo-16.svg" alt="logo" className="h-48 sm:h-64 md:h-80 lg:h-96 w-auto" />

                {/* Contenido */}
                <div className="px-4 max-w-[370px] sm:max-w-[200px] lg:max-w-[800px]">
                    {/* Contenedor del texto con altura fija */}
                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold mb-4 flex flex-col items-center md:items-start min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] text-center md:text-left">
                        
                        <span className="inline-block max-w-full">
                            <Typewriter
                                phrases={[
                                    t('eventName'),
                                    t('eventTagline'),
                                ]}
                                typingSpeed={70}
                                deletingSpeed={20}
                                pauseBetween={2000}
                            />
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg lg:text-xl mb-6">
                        {t('eventDates')}
                    </p>

                    {/* Botones (Siempre en la misma posición y tamaño) */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-orange-400 hover:bg-blue-200 hover:text-black border shadow-lg shadow-gray-500 border-black text-white px-8 py-3 rounded-full text-base sm:text-lg font-semibold w-full sm:w-auto whitespace-nowrap">
                            {t('Register')}
                        </button>
                        <button className="bg-blue-400 border border-black hover:bg-orange-600 hover:text-white text-black px-8 py-3 rounded-full text-base sm:text-lg font-semibold w-full sm:w-auto whitespace-nowrap">
                            {t('BecomeSponsor')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
