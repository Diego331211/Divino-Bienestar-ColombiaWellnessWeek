import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-black text-white px-4">
      <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold mb-6">
        Página no encontrada
      </h2>
      <p className="text-lg md:text-xl text-gray-300 mb-8 text-center max-w-md">
        La página que buscas no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-medium transition-colors duration-300"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
