import LinkedInIcon from '@assets/icons/Linkedin'
import LogoImg from '@assets/img/logo'
import ChatBotComponent from '@components/Bot'
import getLanguage from '@components/Footer/lang/footer'
import NewsletterForm from '@components/Footer/Newsletter'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Footer: React.FC = () => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  return (
    <footer className='w-full px-8 md:px-16 py-8 bg-green-50 text-gray-600 overflow-hidden relative'>
      <ChatBotComponent locale={locale!}/>
      <div className='w-full max-w-7xl h-full min-h-[18rem]'>
        <div className='w-[6rem] mb-9'><LogoImg isFooter /></div>

        <div className='w-full h-full flex flex-col lg:flex-row justify-between'>
          <div className='w-full h-full flex-1 pb-3 flex gap-x-8 gap-y-9 flex-wrap'>
            {
              lang.menu.map(({ name, pages }) => (
                <div key={name} className='w-full max-w-[9rem] text-sm'>
                  <legend className='mb-4 text-gray-700'>{name}</legend>
                  {
                    pages.map(({ title, href, local }) => (
                      <div className='mb-2 text-gray-500' key={title}>
                        {
                          local
                            ? (
                            <Link href={href} className='block hover:text-green-500'>
                              {title}
                            </Link>
                              )
                            : (
                            <Link target="_blank" rel="noreferrer" href={href} className='block hover:text-green-500'>
                              {title}
                            </Link>
                              )
                        }
                      </div>
                    ))
                  }
                </div>
              ))
            }
            <div className='w-full max-w-[9rem] text-sm flex flex-col space-y-6'>
              <a className='flex justify-center items-center w-8 h-8 border border-green-600 rounded-[100%] p-2' target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/78981378">
                <LinkedInIcon className='w-full h-full fill-green-600 hover:fill-green-500 transform' />
              </a>
              <a className='flex justify-center items-center w-8 h-8 border border-green-600 rounded-[100%] p-1.5' target="_blank" rel="noreferrer" href="https://www.instagram.com/moz.economia/">
                <InstagramIcon className='w-full h-full fill-green-600 hover:fill-green-500 transform' />
              </a>
              <a className='flex justify-center items-center w-8 h-8 border border-green-600 rounded-[100%] p-1.5' target="_blank" rel="noreferrer" href="https://www.youtube.com/@mozeconomia">
                <YouTubeIcon className='w-full h-full fill-green-600 hover:fill-green-500 transform' />
              </a>
              <a className='flex justify-center items-center w-8 h-8 border border-green-600 rounded-[100%] p-1.5' target="_blank" rel="noreferrer" href="https://twitter.com/mozeconomia">
                <TwitterIcon className='w-full h-full fill-green-600 hover:fill-green-500 transform' />
              </a>
            </div>
          </div>
          <div className='w-full max-w-md h-full'>
            <NewsletterForm />
          </div>
        </div>
        <div className='w-full pt-2 text-gray-600 border-t border-gray-300 mt-9'>
          <span>
            &copy; {new Date().getFullYear()} Matola Ingadi, LDA - {lang.terms.text}
          </span>
          <span className='text-green-600 hover:text-green-500 ml-2'>
            <Link href={lang.terms.page.href}>{lang.terms.page.title}</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
