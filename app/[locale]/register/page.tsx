'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function RegisterSection() {
  const t = useTranslations('register');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const data = { fullName, email, phone, city, interests };

    try {
      // Llamamos a la API Route que configuraste en app/api/register/route.ts
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Error al enviar datos');
      }

      const result = await response.json();
      setMessage(result.message || 'Formulario enviado exitosamente.');
      // Limpiar el formulario (opcional)
      setFullName('');
      setEmail('');
      setPhone('');
      setCity('');
      setInterests('');
      router.push('/')
    } catch (error) {
      console.error('Error al enviar datos:', error);
      setMessage('Ocurrió un error al enviar los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="register"
      className="relative overflow-hidden py-28 px-6 sm:px-12 lg:px-20 bg-[#F5F5DC] text-black"
    >
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0">
        {/* Gradiente de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-orange-300" />
        {/* Elementos animados */}
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 rounded-full bg-orange-200 opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-amber-200 opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-orange-300 opacity-20"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      {/* Contenido del formulario con fondo animado */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Título principal */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center">
          {t('registerTitle')}
        </h2>

        {/* Subtítulo o descripción corta */}
        <p className="text-center mb-12 text-base sm:text-lg lg:text-xl">
          {t('registerSubtitle')}
        </p>

        {/* Formulario de registro */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre completo */}
          <div>
            <label htmlFor="fullName" className="block mb-1 font-semibold">
              {t('fullNameLabel')}
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t('fullNamePlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          {/* Correo electrónico */}
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              {t('emailLabel')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          {/* Número de teléfono */}
          <div>
            <label htmlFor="phone" className="block mb-1 font-semibold">
              {t('phoneLabel')}
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('phonePlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Ciudad de residencia */}
          <div>
            <label htmlFor="city" className="block mb-1 font-semibold">
              {t('cityLabel')}
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t('cityPlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Intereses específicos en bienestar */}
          <div>
            <label htmlFor="interests" className="block mb-1 font-semibold">
              {t('interestsLabel')}
            </label>
            <textarea
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder={t('interestsPlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              rows={3}
            />
          </div>

          {/* Botón de envío */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-400 hover:bg-blue-200 hover:text-black border shadow-md shadow-gray-500 border-black text-white px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition"
            >
              {loading ? 'Enviando...' : t('registerCta')}
            </button>
          </div>
          {message && (
            <div className="text-center mt-4">
              <p>{message}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
