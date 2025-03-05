// app/[locale]/components/Header.tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono de correo

export default function Header() {
  const t = useTranslations('common');

  return (
    <header className="bg-transparent text-black py-4 fixed top-0 left-0 w-full z-50 backdrop-blur-md">
      <div className="container mx-auto flex items-center gap-4 px-10">

        <FontAwesomeIcon icon={faInstagram} className='h-8' />
        <FontAwesomeIcon icon={faTiktok} className='h-8' />
        <FontAwesomeIcon icon={faXTwitter} className='h-8' />
        {/* Ícono de correo con enlace */}
        <a href="mailto:colombiawellnessweek2025@gmail.com" title="Enviar correo">
          <FontAwesomeIcon icon={faEnvelope} className="h-7" />
        </a>

        {/* Logo */}


        {/* Selector de idioma */}
        <LanguageSwitcher />

      </div>
    </header>
  );
}
