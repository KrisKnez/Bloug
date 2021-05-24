import React, {useState} from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    InputBase
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from '@material-ui/icons/Close';

import * as Styles from "./index.module.css";

const CustomAppBar = () => {
    const [search, setState] = useState(false);

    const toggleSearch = () => {
        console.log("switching state");
        if (search === true)
            setState(false);
        else
            setState(true);
    }

    return (
        <AppBar position="static" color={search ? "default" : "primary"}>
            <Container maxWidth="md">
                <Toolbar disableGutters>
                    <div className={Styles.toolbarLeft}>
                        {search ? (
                            <InputBase placeholder="Search for something" fullWidth autoFocus/>
                        ) : (
                            <>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6">Blog Title</Typography>
                            </>
                        )}
                    </div>
                    <IconButton color="inherit" onClick={toggleSearch}>
                        {
                            search ?
                                <CloseIcon/>
                                :
                                <SearchIcon/>
                        }
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default CustomAppBar;
