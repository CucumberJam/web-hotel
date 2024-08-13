import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';

function Header() {
  return (
    <header className='border-b border-primary-900
    px-4 py-2 sm:px-5 sm:py-4 md:px-8 md:py-5'>
      <div className='flex justify-between items-center max-w-7xl mx-auto
      gap-4'>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
