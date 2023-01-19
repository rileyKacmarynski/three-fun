import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useReducer } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import useElementSize from './useElementSize'

const links = Array.from({ length: 7 }, (_, i) => ({
  href: `link${i}`,
  text: `Link ${i}`,
  isActive: i === 3 ? true : false,
}))

const backgroundVariants = {
  open: (height = 600) => ({
    width: '200px',
    height,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      // restDelta: 2,
    },
  }),
  closed: {
    width: '48px',
    height: '48px',
    transition: {
      delay: 0.8,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
} satisfies Variants

const navVariants = {
  open: { opacity: 1, transition: { time: 0.25, delay: 0.25 } },
  closed: { opacity: 0, transition: { time: 0.25, delay: 0.25 } },
} satisfies Variants

const itemContainerVariants = {
  open: {
    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
} satisfies Variants

const itemVariants = {
  open: {
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    }
  }
} satisfies Variants

function NavMenu() {
  const router = useRouter()
  const [menuOpen, toggleMenuOpen] = useReducer((o) => !o, false)
  const [navRef, { height }] = useElementSize()

  const bgHeight = height + 48 + 16

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
    <motion.div
      animate={menuOpen ? 'open' : 'closed'}
    >
      <motion.div
        variants={backgroundVariants}
        custom={bgHeight}
        className={classNames(
          'absolute z-10 border shadow-lg shadow-zinc-900 rounded-2xl bg-zinc-800 border-zinc-700 left-4 top-4',
          menuOpen ? 'w-[200px]' : 'w-[48px] h-[48px]',
        )}></motion.div>
      <button onClick={toggleMenuOpen} className={'absolute z-20 top-4 left-4 p-[11px] w-[48px] h-[48px] rounded-2xl text-zinc-500 grid place-items-center'}>
        <AnimatePresence>
          {menuOpen ? (
            <motion.div className="absolute" key="close" layoutId="menu-button" initial={{ opacity: 0 }} animate={{ opacity: 1, }} exit={{ opacity: 0, transition: { delay: 1 } }}>
              <CloseIcon />
            </motion.div>
          ) : (
            <motion.div className="absolute" key="open" layoutId="menu-button" initial={{ opacity: 0, }} animate={{ opacity: 1, transition: { delay: 1 } }} exit={{ opacity: 0, }}>
              <MenuIcon />
            </motion.div>
          )
          }
        </AnimatePresence >
      </button >
      <div
        ref={navRef}
        className="absolute z-20 mt-16 left-4 w-[200px]"
      >
        <nav>
          <motion.ul variants={itemContainerVariants} className='flex flex-col'>
            <motion.li initial={false} key={-1} variants={itemVariants} className='px-4 pb-3'>
              <label className='flex items-center justify-between mt-2 text-sm font-semibold cursor-pointer text-zinc-300'>
                <span>Toggle GUI</span>
                <input
                  checked={Boolean(router.query.gui)}
                  onChange={(e) => toggleGui(e.target.checked)}
                  type='checkbox'
                  className='text-indigo-700 border-0 cursor-pointer focus:ring-0 focus:ring-offset-1 outline:0 shadow-input bg-zinc-900'
                />
              </label>
            </motion.li>
            {links.map((link, index) => (
              <motion.li initial={false} key={index} variants={itemVariants}>
                <Link href={link.href}>
                  <div
                    className={classNames(
                      'relative px-5 py-3 overflow-hidden cursor-pointer transition-colors duration-250 hover:bg-zinc-700',
                      link.isActive ? 'text-zinc-100' : 'text-zinc-400',
                    )}>
                    {link.isActive && (
                      <span className='absolute inset-0 border-l-4 border-l-indigo-900 z-[-1] bg-indigo-600/10' />
                    )}
                    {link.text}
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div >
    </motion.div>
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
