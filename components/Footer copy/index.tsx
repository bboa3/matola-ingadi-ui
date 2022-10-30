import ProfileMenu from '@components/Nav/Header/Profile'
import { popularPages } from '@elements/NotFound/popular'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LogoImg from 'assets/img/logo'
import Link from 'next/link'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className='w-full px-4 sm:px-6 py-8 mt-12 bg-slate-900 text-slate-100 overflow-hidden relative z-10'>
      <div className='w-full max-w-7xl h-full min-h-[18rem] flex flex-col justify-between mx-auto divide-y'>
        <div className='w-full h-full pb-3 grid lg:grid-cols-4 gap-4 text-center lg:text-left'>
          <div className='w-full flex flex-col items-center lg:items-start'>
            <div className='w-3/4 mb-2 lg:mb-4'><LogoImg /></div>
            <p className='pl-3 mb-3'>
              <span className='block italic font-sans font-medium mt-4'>O futuro é atitude!</span>
            </p>
            <div className='w-[4rem] mb-3 pl-3 flex justify-between items-center'>
              <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/78981378">
                <LinkedInIcon className='hover:text-blue-700' />
              </a>
              <a target="_blank" rel="noreferrer" href="https://www.instagram.com/moz.economia/">
                <InstagramIcon className='hover:text-indigo-700' />
              </a>
            </div>
            <ProfileMenu />
          </div>
          <div className='w-full'>
            <legend className='font-bold mb-3 text-white uppercase px-2'>páginas Populares</legend>
            {
              popularPages.map(({ title, href }) => (
                <div className='mb-2 text-slate-100' key={title}><a className='block px-2 rounded-lg hover:bg-slate-800 hover:text-white' href={href}>{title}</a></div>
              ))
            }
          </div>
          <div>
            <legend className='font-bold mb-3 text-white uppercase px-2'>Soluções</legend>
            <div className='mb-2 text-slate-100'>
              <Link href='/precos' className='block px-2 rounded-lg hover:bg-slate-800 hover:text-white'>
                Preços
              </Link></div>
            <div className='mb-2 text-slate-100'>
              <Link target="_blank" rel="noreferrer" href='https://mozeconomia.docs.apiary.io/'>
                Acesso à API
              </Link>
            </div>
            <div className='mb-2 text-slate-100'>
              <Link href='/parceiros' className='block px-2 rounded-lg hover:bg-slate-800 hover:text-white'>Documentação</Link></div>
            {/* <div className='mb-2 text-slate-100'><a href='/' className='block px-2 rounded-lg hover:bg-slate-800 hover:text-white'>Conta de desenvolvedor</a></div> */}
          </div>
          <div>
            <legend className='font-bold mb-3 text-white uppercase px-2'>Empresa</legend>
            {/* <div className='mb-2 text-slate-100'><a href='/' className='block px-2 rounded-lg hover:bg-slate-800 hover:text-white'>Blog</a></div> */}
            <div className='mb-2 text-slate-100'>
              <Link href='/sobre-nos' className='block px-2 rounded-lg hover:bg-slate-800 hover:text-white'>
                Sobre nós
              </Link>
            </div>
            <div className='mb-2 text-slate-100'>
              <Link href='/parceiros' className='block px-2 rounded-lg hover:bg-slate-800 hover:text-white'>
                Parceiros
              </Link>
            </div>
            <div className='mb-2 text-slate-100'>
              <Link
                target="_blank"
                rel="noreferrer"
                href='https://calendly.com/mozeconomia/30min?month=2022-07'
                className='block px-2 rounded-lg hover:bg-slate-800 hover:text-white'
              >
                Fale connosco
              </Link>
            </div>
            <div className='mb-2 text-slate-100'>
              <span className='block px-2 text-slate-400 font-normal'>Av. 25 de Setembro, nº 1695, 1º andar, Maputo, Moçambique</span></div>
          </div>
        </div>

        <div className='w-full pt-2 text-center'>
          <span>
            &copy; {new Date().getFullYear()} MozEconomia - todos direitos reservados.
          </span>
          <span className='text-sky-600 hover:text-sky-500 ml-2'><Link href='https://www.termsfeed.com/live/986d6c41-ae64-4cef-a3af-ffe508d621bb'>Termos e Condições</Link></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
