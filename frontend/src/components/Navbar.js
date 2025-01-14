import React, { useState } from 'react'
import {
  Link,
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll'
import {
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaPen,
  FaRegLightbulb,
  FaFileAlt, // Import the new icon
  FaTachometerAlt, // Dashboard icon
  FaUsers, // All users icon
  FaClipboardList, // All posts icon
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/userApiSlice'

const Navbar = () => {
  const location = useLocation()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const handleItemClick = () => {
    setMenuOpen(false)
  }

  const scrollToTop = () => {
    scroll.scrollToTop()
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <nav className='navbar'>
      <div className='nav-header'>
        <RouterLink
          to='/'
          onClick={() => {
            scrollToTop()
            handleItemClick()
          }}
        >
          <div className='logo'>
            <h3>
              INSPIRE-DEV
              <span className='logo-icon'>
                <FaRegLightbulb />
              </span>
            </h3>
          </div>
        </RouterLink>
        <div className='navbar-center-message'>
          <div className='scrolling-text'>
            Welcome to Inspire Dev - Breaking into tech is the best choice!
          </div>
        </div>
        <div className='menu-icon' onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li className='nav-item'>
            <RouterLink
              to='/'
              onClick={() => {
                scrollToTop()
                handleItemClick()
              }}
              className={location.pathname === '/' ? 'active-link' : ''}
            >
              Home
            </RouterLink>
          </li>
          <li className='nav-item'>
            <RouterLink
              to='/all-posts'
              onClick={() => {
                scrollToTop()
                handleItemClick()
              }}
              className={
                location.pathname === '/all-posts' ? 'active-link' : ''
              }
            >
              All Blogs
            </RouterLink>
          </li>
          <li className='nav-item'>
            <RouterLink
              to='/about'
              onClick={() => {
                scrollToTop()
                handleItemClick()
              }}
              className={location.pathname === '/about' ? 'active-link' : ''}
            >
              About
            </RouterLink>
          </li>
          <li className='nav-item'>
            <RouterLink
              to='/services'
              onClick={() => {
                scrollToTop()
                handleItemClick()
              }}
              className={location.pathname === '/services' ? 'active-link' : ''}
            >
              Services
            </RouterLink>
          </li>
          <li className='nav-item'>
            <RouterLink
              to='/contact'
              onClick={() => {
                scrollToTop()
                handleItemClick()
              }}
              className={location.pathname === '/contact' ? 'active-link' : ''}
            >
              Contact
            </RouterLink>
          </li>
          {!userInfo && (
            <li className='nav-item'>
              <RouterLink
                to='/login'
                onClick={() => {
                  scrollToTop()
                  handleItemClick()
                }}
                className={location.pathname === '/login' ? 'active-link' : ''}
              >
                Login
              </RouterLink>
            </li>
          )}
          {location.pathname.startsWith('/services/') && (
            <li className='nav-item'>
              <RouterLink to='/' onClick={handleItemClick}>
                Back to Menu
              </RouterLink>
            </li>
          )}
        </ul>

        {userInfo && (
          <div className='nav-dropdown'>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='nav-user'
            >
              <div className='avatar'>
                {userInfo.image ? (
                  <img
                    src={userInfo.image}
                    alt='User Avatar'
                    className='avatar-img'
                  />
                ) : (
                  <FaUser />
                )}
              </div>
              <span className='username'>{userInfo.username}</span>
            </button>
            {dropdownOpen && (
              <div className='dropdown-user'>
                <Link to='/profile' className='dropdown-item'>
                  <FaUser /> Profile
                </Link>
                <Link to='/user/create-blog' className='dropdown-item'>
                  <FaPen /> Write a Post
                </Link>
                <Link to='/user/my-blog' className='dropdown-item'>
                  <FaFileAlt /> My Post {/* Updated icon */}
                </Link>
                {/* Admin Links */}
                {userInfo.role === 'admin' && (
                  <>
                    <Link to='/admin/dashboard' className='dropdown-item'>
                      <FaTachometerAlt /> Dashboard
                    </Link>
                    <Link to='/admin/all-posts' className='dropdown-item'>
                      <FaClipboardList /> All Posts
                    </Link>
                    <Link to='/admin/all-users' className='dropdown-item'>
                      <FaUsers /> All Users
                    </Link>
                  </>
                )}
                <button onClick={logoutHandler} className='dropdown-item'>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
