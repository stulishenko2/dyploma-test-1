import React from 'react';
import {Link} from 'react-router-dom';
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
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

	return <Drawer
		variant='permanent'
		classes={{
			paper: classes.drawer,
		}}
		anchor='left'
	>
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
	</Drawer>;
};
