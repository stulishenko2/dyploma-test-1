import React from 'react';
import {Outlet} from 'react-router-dom';
import {Sidebar} from '../Sidebar/Sidebar';
import {Box} from '@mui/material';

export const MainLayout = () => <Box sx={{display: 'flex'}}>
	<Sidebar/>
	<Outlet/>
</Box>;
