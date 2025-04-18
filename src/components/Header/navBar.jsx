import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import styles from "/src/styles/Navbar.module.css";
import SearchAppBar from './searchBar';
import logoFinal from "../../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";


const pages = [
    { name: 'Donate', path: '/donate' },
    { name: 'Give Blood', path: '/give-blood' },
    { name: 'Training & Certification', path: '/training' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'About Us', path: '/about' },
    { name: 'Get Help', path: '/help' },
    { name: 'Post', path: '/post'}
];


function ResponsiveAppBar() {
    const navigate = useNavigate();  // Khai báo useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const settings = [
        { name: 'Profile', path: '/profile' },
        { name: 'Account', path: '/account' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Logout', action: () => handleLogout() }  // Gọi handleLogout đúng cách
    ];

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Lấy thông tin user từ localStorage
        }
      }, []);


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      };    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLoginClick = () => {
        navigate('/signin'); // Chuyển trang sang /signin
      };
      const handleMenuClick = (setting) => {
        if (setting.action) {
            setting.action();  // Gọi hàm logout nếu có
        } else {
            navigate(setting.path);  // Điều hướng bình thường
        }
    };
    return (
        <AppBar position="block">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <div
                        onClick={() => navigate("/")}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <img
                            src={logoFinal}
                            alt="Logo"
                            style={{ width: '80px', height: 'auto', borderRadius: '100%' }}
                        />
                    </div>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        AidBridge
                    </Typography>

                    <Box
                        className={styles.menuItemNavbar}
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                alignItems: 'center',
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={() => navigate(page.path)}  >
                                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => navigate(page.path)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <SearchAppBar />
                    <Box sx={{ flexGrow: 0 }}>
                        {user ? (
                            <>
                            <Tooltip title="Open settings" open={open} arrow>
                            <IconButton sx={{ p: 0, marginLeft: 2,marginRight: 2 }} onClick={handleOpenUserMenu}>
                                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                            </>
                        ) : (
                            <Button variant="contained" onClick={handleLoginClick}>
                                Đăng nhập
                            </Button>
                        )}


                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
{settings.map((setting) => (
    <MenuItem 
        key={setting.name} 
        onClick={() => {
            handleCloseUserMenu();  // Đóng menu trước
            handleMenuClick(setting);  // Gọi action hoặc điều hướng
        }}
    >
        <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
    </MenuItem>
))}

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
