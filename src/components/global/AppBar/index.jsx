import React, { useState, useEffect, useRef } from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";

import {
    AppBar,
    Toolbar,
    Typography,
    // Button,
    Container,
    InputBase,
    Grid,
    // Paper,
    Divider,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import * as Styles from "./index.module.css";

const toggleMachine = createMachine({
    initial: "inactive",
    states: {
        inactive: {
            // AppBar is in its default state and search input is not shown
            on: { TOGGLE: "active" },
        },
        active: {
            // AppBar shows the search input and asks user to enter keywords
            initial: "focused",
            on: {
                TOGGLE: "inactive",
            },
            states: {
                // Search Input is empty, no results are shown
                focused: {
                    on: { LOADING: "loading" },
                },
                // Search Input has been typed on, browser is fetching the API for results
                loading: {
                    on: { FINISHED: "finished" },
                },
                // Browser has finished fetching from API
                finished: {
                    on: { EMPTY: "focused", NOTEMPTY: "loading" },
                },
            },
        },
    },
});

const CustomAppBar = () => {
    // Search Input Value State
    const [search, setSearch] = useState();
    const searchTimeout = useRef();

    const handleSearch = (element) => {
        setSearch(element.target.value);
    };

    // Component State
    const [current, send] = useMachine(toggleMachine);
    useEffect(() => {
        if (current.matches("active.focused")) {
            if (search && search.length !== 0) send("LOADING");
        } else if (current.matches("active.finished")) {
            if (search && search.length !== 0) send("NOTEMPTY");
            else send("EMPTY");
        }
    }, [search]);

    const toggleSearch = () => {
        send("TOGGLE");
        setSearch();
    };

    // Fetched Data State
    const [data, setData] = useState();

    const AppBarInactive = () => {
        return (
            <AppBar position="static" color="primary">
                <Container maxWidth="md">
                    <Toolbar disableGutters>
                        <div className={Styles.toolbarLeft}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6">Blog Title</Typography>
                        </div>
                        <IconButton color="inherit" onClick={toggleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    };

    const AppBarActiveFocused = () => {
        return (
            <>
                <AppBar position="fixed" color="default">
                    <Container maxWidth="md">
                        <Toolbar disableGutters>
                            <div className={Styles.toolbarLeft}>
                                <InputBase
                                    placeholder="Search for something"
                                    autoFocus
                                    fullWidth
                                    onChange={handleSearch}
                                    value={search}
                                />
                            </div>
                            <IconButton color="inherit" onClick={toggleSearch}>
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Toolbar />
            </>
        );
    };

    const AppBarActiveLoading = () => {
        if (searchTimeout.current) clearInterval(searchTimeout.current);

        searchTimeout.current = setTimeout(() => {
            setData(new Array(20).fill("a"));
            send("FINISHED");
        }, 1200);

        return (
            <>
                <AppBar position="fixed" color="default">
                    <Grid container>
                        <Grid item xs={12}>
                            <Container maxWidth="md">
                                <Toolbar disableGutters>
                                    <div className={Styles.toolbarLeft}>
                                        <InputBase
                                            placeholder="Search for something"
                                            autoFocus
                                            fullWidth
                                            onChange={handleSearch}
                                            value={search}
                                        />
                                    </div>
                                    <IconButton
                                        color="inherit"
                                        onClick={toggleSearch}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Toolbar>
                            </Container>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12} style={{overflow: "scroll"}}>
                            <Container maxWidth="md">Loading...</Container>
                        </Grid>
                    </Grid>
                </AppBar>
                <Toolbar />
            </>
        );
    };

    const AppBarActiveFinished = () => {
        return (
            <>
                <AppBar position="fixed" color="default" style={{height: "100%"}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Container maxWidth="md">
                                <Toolbar disableGutters>
                                    <div className={Styles.toolbarLeft}>
                                        <InputBase
                                            placeholder="Search for something"
                                            autoFocus
                                            fullWidth
                                            onChange={handleSearch}
                                            value={search}
                                        />
                                    </div>
                                    <IconButton
                                        color="inherit"
                                        onClick={toggleSearch}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Toolbar>
                            </Container>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12} >
                            <Container maxWidth="md">
                                {data.map((item, index) => {
                                    return <h1 key={index}>{item}</h1>;
                                })}
                            </Container>
                        </Grid>
                    </Grid>
                </AppBar>
                <Toolbar />
            </>
        );
    };

    if (current.matches("inactive")) return AppBarInactive();
    else {
        if (current.matches("active.focused")) return AppBarActiveFocused();
        if (current.matches("active.loading")) return AppBarActiveLoading();
        if (current.matches("active.finished")) return AppBarActiveFinished();
    }
};

export default CustomAppBar;
