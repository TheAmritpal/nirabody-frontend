
import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth';
// import { ComplaintContext } from '../context/ComplaintContext';
import {
    ChevronDown,
    ChevronUp,
    ChevronRight,
    ChevronLeft,
    Home,
    LogOut,
    Layers,
    Users,
    Calendar,
    HeartHandshake,
    Church,
    Mail,
    Video,
    PersonStanding,
    SquareStack,
    NotebookIcon,
    User2,
    User2Icon,
    ListOrdered,
} from 'lucide-react';
// import { SjmFormContext } from "../context/SjmFormContext";
// import { SjmmFormContext } from "../context/SjmmFormContext";

const Sidebar = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const [sidebarOpen, setSidebarOpen] = useState(isDesktop);
    const { logout, user } = useContext(AdminAuthContext);
    // const { messageCount, markMessagesViewed, resetOnLogout } = useContext(ComplaintContext);
    // const { sjmFormCount, markSjmFormsViewed, SjmresetOnLogout } = useContext(SjmFormContext);
    // const { sjmmFormCount, markSjmmFormsViewed, SjmmresetOnLogout } = useContext(SjmmFormContext);


    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMember, setIsOpenMember] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            const desktop = window.innerWidth >= 1024;
            setIsDesktop(desktop);
            if (desktop) setSidebarOpen(true);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleDropdown = () => {
        if (!sidebarOpen) {
            setSidebarOpen(true);
            setTimeout(() => {
                setIsOpen(true);
                setIsOpenMember(false);
            }, 200);
        } else {
            setIsOpen(!isOpen);
            setIsOpenMember(false);
        }
    };

    const toggleDropdownMember = () => {
        if (!sidebarOpen) {
            setSidebarOpen(true);
            setTimeout(() => {
                setIsOpenMember(true);
                setIsOpen(false);
            }, 200);
        } else {
            setIsOpenMember(!isOpenMember);
            setIsOpen(false);
        }
    };

    const handleLogoutClick = () => setIsModalOpen(true);

    const handleConfirmLogout = () => {
        
        logout();
        setIsModalOpen(false);
    };



    const closeModal = () => setIsModalOpen(false);

    const toggleSidebar = () => {
        if (!isDesktop) {
            setSidebarOpen(!sidebarOpen);
        } else {
            setSidebarOpen(!sidebarOpen);
            if (sidebarOpen) {
                setIsOpen(false);
                setIsOpenMember(false);
            }
        }
    };

    const handleMessagesClick = () => {
        markMessagesViewed(user?.token);
    };

    const handleFormClick = () => {
        const token = user?.token || (localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')).token : null);
        if (!token) {
            toast.error('Please log in to mark forms as viewed');
            return;
        }
        markSjmFormsViewed(token);
    };

    const handleSjmmFormClick = () => {
        const token = user?.token || (localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')).token : null);
        if (!token) {
            toast.error('Please log in to mark forms as viewed');
            return;
        }
        markSjmmFormsViewed(token);
    };



    const sidebarVariants = {
        open: {
            width: "16rem",
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        closed: {
            width: "5rem",
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        mobileOpen: {
            x: 0,
            width: "16rem",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        mobileClosed: {
            x: "-100%",
            width: "16rem",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        }
    };

    const textVariants = {
        open: { opacity: 1, width: "auto" },
        closed: { opacity: 0, width: 0 }
    };

    const getSidebarState = () => {
        if (isDesktop) {
            return sidebarOpen ? "open" : "closed";
        } else {
            return sidebarOpen ? "mobileOpen" : "mobileClosed";
        }
    };

    const renderNavItem = (Icon, text, color) => (
        <>
            <div className="flex items-center justify-center flex-shrink-0 w-6 h-6">
                <Icon className={`text-${color}-400`} size={24} />
            </div>
            <motion.span
                className="overflow-hidden text-sm font-medium text-white whitespace-nowrap"
                animate={sidebarOpen || !isDesktop ? "open" : "closed"}
                variants={textVariants}
            >
                {text}
            </motion.span>
        </>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            {!isDesktop && (
                <motion.button
                    className="fixed z-40 p-2 m-2 text-white bg-gray-800 rounded-lg shadow-lg top-2 left-2"
                    onClick={toggleSidebar}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {sidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                </motion.button>
            )}

            {/* Sidebar */}
            <motion.div
                className="fixed z-30 w-full h-screen p-5 pt-8 bg-gray-900 shadow-xl lg:relative"
                initial={false}
                animate={getSidebarState()}
                variants={sidebarVariants}
            >
                {/* Desktop Toggle Button */}
                {isDesktop && (
                    <motion.div
                        className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 bg-gray-800 border-2 border-gray-700 rounded-full flex items-center justify-center`}
                        onClick={toggleSidebar}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {sidebarOpen ? (
                            <ChevronLeft className="w-4 h-4 text-white" />
                        ) : (
                            <ChevronRight className="w-4 h-4 text-white" />
                        )}
                    </motion.div>
                )}

                {/* Dashboard Title */}
                <motion.div className="flex items-center pt-6 gap-x-4 lg:pt-0">
                    <motion.h1
                        className="overflow-hidden text-xl font-bold text-transparent text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text "
                        animate={sidebarOpen || !isDesktop ? "open" : "closed"}
                        variants={{
                            open: { opacity: 1, width: "auto" },
                            closed: { opacity: 0, width: 0 }
                        }}
                    >
                        Dashboard
                    </motion.h1>
                </motion.div>

                {/* Navigation Items */}
                <ul className="pt-6 space-y-2">
                    {/* Dashboard */}
                    <NavLink to={'/backend/dashboard'}>
                        {({ isActive }) => (
                            <motion.li
                                className={`relative flex items-center p-2 rounded-lg cursor-pointer gap-x-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => isDesktop && !sidebarOpen && setHoveredItem('Dashboard')}
                                onHoverEnd={() => isDesktop && !sidebarOpen && setHoveredItem(null)}
                            >
                                {renderNavItem(Home, "Dashboard", "blue")}
                                <AnimatePresence>
                                    {(!sidebarOpen && isDesktop && hoveredItem === 'Dashboard') && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="absolute px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded-md shadow-lg left-full whitespace-nowrap"
                                        >
                                            Dashboard
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        )}
                    </NavLink>

                    {/* Slider */}
                    <NavLink to={'/backend/slider'}>
                        {({ isActive }) => (
                            <motion.li
                                className={`relative flex items-center p-2 rounded-lg cursor-pointer gap-x-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => isDesktop && !sidebarOpen && setHoveredItem('Slider')}
                                onHoverEnd={() => isDesktop && !sidebarOpen && setHoveredItem(null)}
                            >
                                {renderNavItem(SquareStack, "Slider", "gray")}
                                <AnimatePresence>
                                    {(!sidebarOpen && isDesktop && hoveredItem === 'Slider') && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="absolute px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded-md shadow-lg left-full whitespace-nowrap"
                                        >
                                            Slider
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        )}
                    </NavLink>

                    <NavLink to={'/backend/testimonial'}>
                        {({ isActive }) => (
                            <motion.li
                                className={`relative flex items-center p-2 rounded-lg cursor-pointer gap-x-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => isDesktop && !sidebarOpen && setHoveredItem('Testimonial')}
                                onHoverEnd={() => isDesktop && !sidebarOpen && setHoveredItem(null)}
                            >
                                {renderNavItem(User2, "Testimonial", "black")}
                                <AnimatePresence>
                                    {(!sidebarOpen && isDesktop && hoveredItem === 'Testimonial') && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="absolute px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded-md shadow-lg left-full whitespace-nowrap"
                                        >
                                            Testimonial
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        )}
                    </NavLink>

                    <NavLink to={'/backend/settings'}>
                        {({ isActive }) => (
                            <motion.li
                                className={`relative flex items-center p-2 rounded-lg cursor-pointer gap-x-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => isDesktop && !sidebarOpen && setHoveredItem('Setting')}
                                onHoverEnd={() => isDesktop && !sidebarOpen && setHoveredItem(null)}
                            >
                                {renderNavItem(PersonStanding, "Setting", "gray")}
                                <AnimatePresence>
                                    {(!sidebarOpen && isDesktop && hoveredItem === 'Setting') && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="absolute px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded-md shadow-lg left-full whitespace-nowrap"
                                        >
                                            Setting
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        )}
                    </NavLink>


                    <NavLink to={'/backend/categories'}>
                        {({ isActive }) => (
                            <motion.li
                                className={`relative flex items-center p-2 rounded-lg cursor-pointer gap-x-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => isDesktop && !sidebarOpen && setHoveredItem('Categories')}
                                onHoverEnd={() => isDesktop && !sidebarOpen && setHoveredItem(null)}
                            >
                                {renderNavItem(Users, "Categories", "blue")}
                                <AnimatePresence>
                                    {(!sidebarOpen && isDesktop && hoveredItem === 'Categories') && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="absolute px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded-md shadow-lg left-full whitespace-nowrap"
                                        >
                                            Categories
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        )}
                    </NavLink>

                    <NavLink to={'/backend/products'}>
                        {({ isActive }) => (
                            <motion.li
                                className={`relative flex items-center p-2 rounded-lg cursor-pointer gap-x-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => isDesktop && !sidebarOpen && setHoveredItem('Products')}
                                onHoverEnd={() => isDesktop && !sidebarOpen && setHoveredItem(null)}
                            >
                                {renderNavItem(PersonStanding, "Products", "gray")}
                                <AnimatePresence>
                                    {(!sidebarOpen && isDesktop && hoveredItem === 'Products') && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="absolute px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded-md shadow-lg left-full whitespace-nowrap"
                                        >
                                            Products
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        )}
                    </NavLink>



                    {/* Users */}
                    <NavLink to={'/backend/users'} >
                        {({ isActive }) => (
                            <motion.li
                                className={`relative flex items-center p-2 rounded-lg cursor-pointer gap-x-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => isDesktop && !sidebarOpen && setHoveredItem('Users')}
                                onHoverEnd={() => isDesktop && !sidebarOpen && setHoveredItem(null)}
                            >
                                {renderNavItem(User2Icon, "Users", "blue")}
                                
                                <AnimatePresence>
                                    {(!sidebarOpen && isDesktop && hoveredItem === 'Users') && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="absolute px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded-md shadow-lg left-full whitespace-nowrap"
                                        >
                                           Users
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        )}
                    </NavLink>

                    {/* Orders */}
                    <NavLink to={'/backend/orders'} >
                        {({ isActive }) => (
                            <motion.li
                                className={`relative flex items-center p-2 rounded-lg cursor-pointer gap-x-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => isDesktop && !sidebarOpen && setHoveredItem('Orders')}
                                onHoverEnd={() => isDesktop && !sidebarOpen && setHoveredItem(null)}
                            >
                                {renderNavItem(ListOrdered, "Orders", "gray")}
                                
                                <AnimatePresence>
                                    {(!sidebarOpen && isDesktop && hoveredItem === 'Orders') && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="absolute px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded-md shadow-lg left-full whitespace-nowrap"
                                        >
                                           Orders
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        )}
                    </NavLink>

                    {/* Messages */}
                    <NavLink to={'/backend/message'} >
                        {({ isActive }) => (
                            <motion.li
                                className={`relative flex items-center p-2 rounded-lg cursor-pointer gap-x-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => isDesktop && !sidebarOpen && setHoveredItem('Messages')}
                                onHoverEnd={() => isDesktop && !sidebarOpen && setHoveredItem(null)}
                            >
                                {renderNavItem(Mail, "Messages", "blue")}
                                
                                <AnimatePresence>
                                    {(!sidebarOpen && isDesktop && hoveredItem === 'Messages') && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="absolute px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded-md shadow-lg left-full whitespace-nowrap"
                                        >
                                            Messages
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        )}
                    </NavLink>


                      {/* blog Category */}
                    <NavLink to={'/backend/blog-categories'} >
                        {({ isActive }) => (
                            <motion.li
                                className={`relative flex items-center p-2 rounded-lg cursor-pointer gap-x-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => isDesktop && !sidebarOpen && setHoveredItem('Blog Category')}
                                onHoverEnd={() => isDesktop && !sidebarOpen && setHoveredItem(null)}
                            >
                                {renderNavItem(Mail, "Blog Category", "blue")}
                                
                                <AnimatePresence>
                                    {(!sidebarOpen && isDesktop && hoveredItem === 'Blog Category') && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="absolute px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded-md shadow-lg left-full whitespace-nowrap"
                                        >
                                            Blog Category
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        )}
                    </NavLink>



                      {/* blog */}
                    <NavLink to={'/backend/blog'} >
                        {({ isActive }) => (
                            <motion.li
                                className={`relative flex items-center p-2 rounded-lg cursor-pointer gap-x-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => isDesktop && !sidebarOpen && setHoveredItem('Blog')}
                                onHoverEnd={() => isDesktop && !sidebarOpen && setHoveredItem(null)}
                            >
                                {renderNavItem(Mail, "Blog", "blue")}
                                
                                <AnimatePresence>
                                    {(!sidebarOpen && isDesktop && hoveredItem === 'Blog') && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="absolute px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded-md shadow-lg left-full whitespace-nowrap"
                                        >
                                          Blog
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        )}
                    </NavLink>

                       {/* NewsLetter */}
                    <NavLink to={'/backend/newsletter'} >
                        {({ isActive }) => (
                            <motion.li
                                className={`relative flex items-center p-2 rounded-lg cursor-pointer gap-x-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => isDesktop && !sidebarOpen && setHoveredItem('NewsLetter')}
                                onHoverEnd={() => isDesktop && !sidebarOpen && setHoveredItem(null)}
                            >
                                {renderNavItem(Mail, "NewsLetter", "blue")}
                                
                                <AnimatePresence>
                                    {(!sidebarOpen && isDesktop && hoveredItem === 'NewsLetter') && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="absolute px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded-md shadow-lg left-full whitespace-nowrap"
                                        >
                                         NewsLetter
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        )}
                    </NavLink>

                   
                    


                    {/* Logout */}
                    <motion.li
                        className="relative flex items-center p-2 rounded-lg cursor-pointer gap-x-3 hover:bg-gray-800"
                        onClick={handleLogoutClick}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => isDesktop && !sidebarOpen && setHoveredItem('Logout')}
                        onHoverEnd={() => isDesktop && !sidebarOpen && setHoveredItem(null)}
                    >
                        {renderNavItem(LogOut, "Logout", "red")}
                        <AnimatePresence>
                            {(!sidebarOpen && isDesktop && hoveredItem === 'Logout') && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="absolute px-2 py-1 ml-2 text-xs text-white bg-gray-800 rounded-md shadow-lg left-full whitespace-nowrap"
                                >
                                    Logout
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.li>
                </ul>

                {/* Logout Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="relative w-full max-w-md p-8 bg-gray-800 shadow-2xl rounded-xl"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute text-gray-400 top-4 right-4 hover:text-white"
                                    onClick={closeModal}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </motion.button>

                                <div className="flex flex-col items-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="p-3 mb-4 bg-red-500 rounded-full bg-opacity-20"
                                    >
                                        <LogOut className="text-red-400" size={24} />
                                    </motion.div>
                                    <motion.h2 className="mb-2 text-xl font-bold text-white">Logout Confirmation</motion.h2>
                                    <motion.p className="mb-6 text-gray-300">Are you sure you want to logout?</motion.p>

                                    <div className="flex gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 text-white rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                                            onClick={handleConfirmLogout}
                                        >
                                            Logout
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
};

export default Sidebar;

