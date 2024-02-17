import React from 'react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from './LanguageContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';

function Header() {
  const { translate } = useLanguage();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={4} style={{ background: '#fff', color: '#000', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            {translate("Track Your Shipment")}
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Change language">
              <Typography onClick={handleOpenUserMenu} variant="h6" component="div" sx={{ fontWeight: 500, cursor: 'pointer' }}>
                {translate("Language")}
              </Typography>
            </Tooltip>
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
              <LanguageSelector onClick={handleCloseUserMenu} />
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
