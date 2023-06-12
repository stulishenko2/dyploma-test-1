import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper} from '@mui/material';
import {Dashboard, Home} from '@mui/icons-material';
import {makeStyles} from '@mui/styles';

// Const style = {height: '100vh!important', position: 'relative!important'};
const useStyles = makeStyles(() => ({
	drawer: {
		width: 240,
		flexShrink: 0,
		position: 'relative!important' as any, // Set the position to relative
		height: '100vh!important',
	},

}));

export const Sidebar: React.FC = () => {
	const classes = useStyles() as any;
	const drawerStyle = {
		backgroundColor: 'lightGray', // Set your desired background color here
		height: '100%',
	};
	return <Drawer
		variant='permanent'
		classes={{
			paper: classes.drawer,
		}}
		anchor='left'
	>
		<Box height='100%'>
			<div style={drawerStyle}>
				<List>
					<ListItem button component={Link} to='/shelf'>
						<ListItemIcon><Home/></ListItemIcon>
						<ListItemText primary='Home'/>
					</ListItem>
					<ListItem button component={Link} to='/create-product'>
						<ListItemIcon><Dashboard/></ListItemIcon>
						<ListItemText primary='Create Product'/>
					</ListItem>
				</List>
			</div>
		</Box>
	</Drawer>;
};
