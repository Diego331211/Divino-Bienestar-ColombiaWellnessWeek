'use client';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import logo from '@/public/images/Logo-16.svg';
import bienestarIcons from '@/data/bienestarIcons';

export default function Hero() {
    const t = useTranslations('common');
    const [email, setEmail] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [containerSize, setContainerSize] = useState(600);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { locale } = useParams();

    // Detectar si es mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Medir tamaño del contenedor
    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setContainerSize(Math.min(rect.width, rect.height));
        }
    }, [isMobile]);

    const handleSubmit = () => {
        if (!email) return;
        router.push(`/${locale}/register`);
    };

    // Semicírculo abierto hacia la derecha
    const generateRightSemiCirclePositions = (radius: number, count: number) => {
        const angleStep = Math.PI / (count - 1); // De 0 a PI
        return Array.from({ length: count }, (_, i) => {
            const angle = angleStep * i;
            return {
                x: radius * Math.sin(angle), // horizontal (abre a la derecha)
                y: radius * Math.cos(angle) - radius / 2, // vertical (centrado)
            };
        });
    };

    // Posiciones manuales (mobile)
    const circlePositions = [
        { x: 90, y: 180 },
        { x: -135, y: -10 },
        { x: 90, y: -90 },
        { x: 135, y: -10 },
        { x: -130, y: -90 },
        { x: 80, y: 120 },
        { x: -130, y: 170 },
        { x: -20, y: -140 },
    ];

    const posiciones = isMobile
        ? circlePositions
        : generateRightSemiCirclePositions(containerSize / 2.9, bienestarIcons.length);

    return (
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="flex flex-col md:flex-row items-center justify-start gap-16 w-full max-w-7xl">
                {/* Lado izquierdo: Logo + íconos */}
                <div
                    ref={containerRef}
                    className={`relative ${isMobile ? 'w-[420px] h-[300px]' : 'w-[605px] h-[600px]'}`}
                >
                    {/* Logo */}
                    <div className="absolute left-1/2 top-1/2 md:left-1/4 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] md:w-[250px] md:h-[250px]">
                        <Image src={logo} alt="Viva la Vida logo" fill className="object-contain" />
                    </div>

                    {/* Cápsulas de bienestar */}
                    {bienestarIcons.map(({ icon, label }, index) => {
                        const { x, y } = posiciones[index] || { x: 0, y: 0 };
                        return (
                            <div
                                key={index}
                                className="absolute float-animation fade-loop flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full text-white text-xs font-medium shadow-md break-words whitespace-normal max-w-[195px]"
                                style={{
                                    left: `calc(50% + ${x}px - 70px)`,
                                    top: `calc(50% + ${y}px - 20px)`,
                                    animationDelay: `${index * 0.2}s`,
                                }}
                            >
                                <span className="md:text-4xl">{icon}</span>
                                <span>{label}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Lado derecho: Registro */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 px-2">
                    <h1 className="text-4xl sm:text-5xl font-bold text-black">Colombia Wellness Week</h1>
                    <p className="text-md sm:text-lg text-black font-semibold">
                        12–17 de Noviembre | Bogotá, Colombia
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                        <button
                            onClick={handleSubmit}
                            className="bg-orange-400 hover:bg-orange-500 transition shadow-lg shadow-gray-500 text-white px-6 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base"
                        >
                            {t('Register')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Animaciones CSS en línea */}
            <style jsx>{`
                @keyframes float {
                    0% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                    100% {
                        transform: translateY(0px);
                    }
                }

                @keyframes pulseMessage {
                    0% {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    10% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    80% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                }

                .float-animation {
                    animation: float 2s ease-in-out infinite;
                }

                .fade-loop {
                    animation: pulseMessage 10s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
