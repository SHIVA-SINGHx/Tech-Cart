import React, { useState } from 'react'
import { Drone, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from '@/redux/userSlice'


const Navbar = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const accessToken = localStorage.getItem('accessToken')
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8082/api/v1/user/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                dispatch(logout()) // This will clear both localStorage and Redux state
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
            toast.error('Logout failed')
        }
    }

    return (
        <header className='bg-gradient-to-r from-pink-50 to-purple-50 fixed w-full z-20 border-b border-pink-200 backdrop-blur-sm'>
            <div className='max-w-7xl mx-auto flex justify-between items-center py-4 px-4'>
                {/* Logo Section */}
                <Link to="/">
                    <motion.div 
                        className='flex items-center gap-2'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Drone className='w-8 h-8 md:w-10 md:h-10 text-pink-600' />
                        <div className='flex flex-col'>
                            <span className='text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text'>
                                Tech-Cart
                            </span>
                            <span className='hidden md:block text-xs text-gray-500'>Future of Tech Shopping</span>
                        </div>
                    </motion.div>
                </Link>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="md:hidden">
                    {isOpen ? (
                        <X className="h-6 w-6 text-gray-700" />
                    ) : (
                        <Menu className="h-6 w-6 text-gray-700" />
                    )}
                </button>
                
                {/* Desktop Navigation */}
                <nav className='hidden md:flex gap-10 justify-between items-center'>
                    <ul className='flex gap-8 items-center text-lg font-medium'>
                        <motion.li
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to='/' className='text-gray-700 hover:text-pink-600 transition-colors'>
                                Home
                            </Link>
                        </motion.li>
                        
                        <motion.li
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className='relative group'
                        >
                            <Link to='/products' className='flex items-center gap-1 text-gray-700 hover:text-pink-600 transition-colors'>
                                Products
                                <ChevronDown className='w-4 h-4 group-hover:rotate-180 transition-transform duration-200' />
                            </Link>
                        </motion.li>
                        
                        {user && (
                            <motion.li
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to={`/profile/${user._id}`} className='text-gray-700 hover:text-pink-600 transition-colors'>
                                    Hello, {user.firstName}
                                </Link>
                            </motion.li>
                        )}
                    </ul>

                    {/* Cart Icon */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className='relative'
                    >
                        <Link to='/cart'>
                            <ShoppingCart className='w-6 h-6 text-gray-700 hover:text-pink-600 transition-colors' />
                            <motion.span 
                                className='bg-pink-600 rounded-full absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center text-white text-xs'
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.2 }}
                            >
                                0
                            </motion.span>
                        </Link>
                    </motion.div>

                    {/* Auth Button */}
                    {user ? (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button onClick={logoutHandler} className='bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:opacity-90 transition-opacity'>
                                Logout
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to='/login'>
                                <Button className='bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:opacity-90 transition-opacity'>
                                    Login
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </nav>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 md:hidden"
                        >
                            <ul className='flex flex-col gap-4'>
                                <motion.li
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link to='/' className='text-gray-700 hover:text-pink-600 transition-colors block'>
                                        Home
                                    </Link>
                                </motion.li>
                                <motion.li
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link to='/products' className='text-gray-700 hover:text-pink-600 transition-colors block'>
                                        Products
                                    </Link>
                                </motion.li>
                                {user && (
                                    <motion.li
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link to={`/profile/${user._id}`}className='text-gray-700 hover:text-pink-600 transition-colors block'>
                                            Profile
                                        </Link>
                                    </motion.li>
                                )}
                                <motion.li
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link to='/cart' className='text-gray-700 hover:text-pink-600 transition-colors flex items-center gap-2'>
                                        Cart
                                        <span className='bg-pink-600 text-white px-2 py-0.5 rounded-full text-xs'>
                                            0
                                        </span>
                                    </Link>
                                </motion.li>
                                <motion.li
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {user ? (
                                        <Link to={'/login'}>
                                        <Button onClick={logoutHandler} className='w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white'>
                                            Logout
                                        </Button>
                                        
                                        </Link>
                                    ) : (
                                        <Link to='/login'>
                                            <Button className='w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white'>
                                                Login
                                            </Button>
                                        </Link>
                                    )}
                                </motion.li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}

export default Navbar
