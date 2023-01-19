import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useReducer } from 'react'

const links = Array.from({ length: 8 }, (_, i) => ({
  href: `link${i}`,
  text: `Link ${i}`,
  isActive: i === 3 ? true : false,
}))

function NavMenu() {
  const router = useRouter()
  const [menuOpen, toggleMenuOpen] = useReducer((o) => !o, false)

  const toggleGui = (checked: boolean) => {
    router.push(
      {
        pathname: router.pathname,
        query: checked ? { gui: 'true' } : {},
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <div
      className={classNames(
        'absolute z-10 p-1 border shadow-lg shadow-zinc-900 rounded-2xl bg-zinc-800 border-zinc-700 left-4 top-4',
        menuOpen ? 'w-[200px]' : 'w-[48px] h-[48px]',
      )}>
      <button
        onClick={toggleMenuOpen}
        className={classNames(
          'rounded-2xl hover:bg-zinc-700/50 transition-all',
          menuOpen ? 'p-1' : 'absolute inset-0 text-center',
        )}>
        {/* do something nice with the svg animation stuff */}
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
      {menuOpen && (
        <div>
          <div className='p-3'>
            <label className='flex items-center justify-between mt-2 text-sm font-semibold cursor-pointer text-zinc-300'>
              <span>Toggle GUI</span>
              <input
                checked={Boolean(router.query.gui)}
                onChange={(e) => toggleGui(e.target.checked)}
                type='checkbox'
                className='text-indigo-700 border-0 rounded cursor-pointer focus:ring-0 focus:ring-offset-1 outline:0 shadow-input bg-zinc-900'
              />
            </label>
          </div>
          <nav>
            <ul className='flex flex-col'>
              {links.map((link, index) => (
                <Link key={index} href={link.href}>
                  <li
                    className={classNames(
                      'relative px-3 py-3 overflow-hidden rounded-lg cursor-pointer transition-colors duration-250 hover:bg-zinc-700',
                    )}>
                    {link.isActive && (
                      <span className='absolute inset-0 border-l-4 bg-indigo-600/10 border-l-indigo-900 z-[-1]' />
                    )}
                    {link.text}
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}

function MenuIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='m-auto feather feather-menu'>
      <line x1='3' y1='12' x2='21' y2='12'></line>
      <line x1='3' y1='6' x2='21' y2='6'></line>
      <line x1='3' y1='18' x2='21' y2='18'></line>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='m-auto feather feather-x'>
      <line x1='18' y1='6' x2='6' y2='18'></line>
      <line x1='6' y1='6' x2='18' y2='18'></line>
    </svg>
  )
}

export default NavMenu
