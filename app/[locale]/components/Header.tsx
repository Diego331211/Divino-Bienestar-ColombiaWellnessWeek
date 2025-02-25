// app/[locale]/components/Header.tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Header() {
  const t = useTranslations('common');

  return (
    <header className="bg-transparent text-black py-4 ">
      <div className="container mx-auto flex items-center gap-8 px-12">

        <FontAwesomeIcon icon={faInstagram} className='h-12' />
        <FontAwesomeIcon icon={faTiktok} className='h-12' />
        <FontAwesomeIcon icon={faTwitter} className='h-12' />


        {/* Selector de idioma */}
        <LanguageSwitcher />

      </div>
    </header>
  );
}
