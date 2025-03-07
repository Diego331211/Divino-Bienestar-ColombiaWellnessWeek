'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SponsorsForm() {
  const t = useTranslations('sponsors');
  const [companyName, setCompanyName] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [representativeRole, setRepresentativeRole] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [sponsorshipType, setSponsorshipType] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const data = {
      companyName,
      representativeName,
      representativeRole,
      contactEmail,
      contactPhone,
      sponsorshipType,
    };

    try {
      const response = await fetch('/api/sponsors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al enviar datos');
      }
      const result = await response.json();
      setMessage(result.message || 'Formulario enviado exitosamente.');
      // Limpiar el formulario
      setCompanyName('');
      setRepresentativeName('');
      setRepresentativeRole('');
      setContactEmail('');
      setContactPhone('');
      setSponsorshipType('');
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
      id="sponsors"
      className="relative overflow-hidden py-28 px-6 sm:px-12 lg:px-20 bg-gray-50 text-black"
    >
      {/* Aquí puedes incluir un fondo animado similar al de otros formularios si lo deseas */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center">
          {t('sponsorsTitle')}
        </h2>
        <p className="text-center mb-12 text-base sm:text-lg lg:text-xl">
          {t('sponsorsSubtitle')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre de la empresa */}
          <div>
            <label htmlFor="companyName" className="block mb-1 font-semibold">
              {t('companyNameLabel')}
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder={t('companyNamePlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          {/* Nombre del representante */}
          <div>
            <label htmlFor="representativeName" className="block mb-1 font-semibold">
              {t('representativeNameLabel')}
            </label>
            <input
              id="representativeName"
              type="text"
              value={representativeName}
              onChange={(e) => setRepresentativeName(e.target.value)}
              placeholder={t('representativeNamePlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          {/* Cargo en la empresa */}
          <div>
            <label htmlFor="representativeRole" className="block mb-1 font-semibold">
              {t('representativeRoleLabel')}
            </label>
            <input
              id="representativeRole"
              type="text"
              value={representativeRole}
              onChange={(e) => setRepresentativeRole(e.target.value)}
              placeholder={t('representativeRolePlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          {/* Correo electrónico de contacto */}
          <div>
            <label htmlFor="contactEmail" className="block mb-1 font-semibold">
              {t('contactEmailLabel')}
            </label>
            <input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder={t('contactEmailPlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          {/* Teléfono de contacto */}
          <div>
            <label htmlFor="contactPhone" className="block mb-1 font-semibold">
              {t('contactPhoneLabel')}
            </label>
            <input
              id="contactPhone"
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder={t('contactPhonePlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Tipo de patrocinio de interés */}
          <div>
            <label htmlFor="sponsorshipType" className="block mb-1 font-semibold">
              {t('sponsorshipTypeLabel')}
            </label>
            <input
              id="sponsorshipType"
              type="text"
              value={sponsorshipType}
              onChange={(e) => setSponsorshipType(e.target.value)}
              placeholder={t('sponsorshipTypePlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          {/* Botón de envío */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-400 hover:bg-blue-600 text-white border shadow-md shadow-gray-500 border-blue-700 px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition"
            >
              {loading ? 'Enviando...' : t('sponsorsCta')}
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
