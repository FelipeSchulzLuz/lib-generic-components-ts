import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { AppBar as MaterialAppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRecoilState } from 'recoil';
import { atom } from 'recoil';

const titleHeader = atom({
	key: 'titleHeaderState',
	default: 'News',
});

export default function AppBar() {
	const [title, setTitle] = useRecoilState<string>(titleHeader);
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef<HTMLButtonElement>(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) { return; }
		setOpen(false);
	};

	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) anchorRef.current!.focus();
		prevOpen.current = open;
	}, [open]);

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') setOpen(false);
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<MaterialAppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						// onClick={handleToggle}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{title}
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</MaterialAppBar>
		</Box>
	);
}