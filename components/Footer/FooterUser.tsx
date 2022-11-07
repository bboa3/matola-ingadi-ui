import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import Link from 'next/link'

export default function FooterUser () {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-gray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-gray-500 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{' '}
                <span
                  className="text-gray-500 text-sm font-semibold py-1"
                >
                  Matola Ingadi, LDA
                </span>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <span className='text-gray-600 hover:text-gray-800 text-sm font-semibold block py-1 px-3'>
                    <Link href='/terms-and-conditions'>Termos e Condições</Link>
                  </span>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="text-gray-600 hover:text-gray-800 text-sm font-semibold block py-1 px-3"
                  >
                    sobre-nos
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.instagram.com/matolaingadi/"
                    className="text-gray-600 hover:text-gray-800 text-sm font-semibold block py-1 px-3"
                  >
                    <InstagramIcon aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href="https://web.facebook.com/matola.ingadi.1"
                    className="text-gray-600 hover:text-gray-800 text-sm font-semibold block py-1 px-3"
                  >
                    <FacebookIcon aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
