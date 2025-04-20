
import Footer from './Footer';
import Header from '@/app/components/header'
import { getsettings } from '@/sanity/sanity.utils';

export default async function Layout({ children }) {
  const settings = await getsettings()
  return (
    <>
    
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
