import React, { useState, useEffect, useRef } from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";

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
import CloseIcon from "@material-ui/icons/Close";

import * as Styles from "./index.module.css";

const toggleMachine = createMachine({
    initial: "inactive",
    states: {
        inactive: {
            // AppBar is in its default state and search input is not shown
            on: { TOGGLE: "active" }
        },
        active: {
            // AppBar shows the search input and asks user to enter keywords
            initial: "focused",
            on: {
                TOGGLE: "inactive"
            },
            states: {
                // Search Input is empty, no results are shown
                focused: {
                    on: { TYPING: "loading" }
                },
                // Search Input has been typed on, browser is fetching the API for results
                loading: {
                    on: { FETCHED: "finished" }
                },
                // Browser has finished fetching from API
                finished: {
                    on: { EMPTY: "focused", NOTEMPTY: "loading" }
                }
            }
        }
    }
});

const CustomAppBar = () => {
    const [current, send] = useMachine(toggleMachine);

    const [search, setSearch] = useState();
    const searchTimeout = useRef();

    const toggleSearch = () => send("TOGGLE");

    const handleSearch = element => {
        setSearch(element.target.value);
    };

    useEffect(() => {
        if (search) {
            if (searchTimeout.current)
                clearTimeout(searchTimeout.current);

            searchTimeout.current = setTimeout(() => {
                if (current.matches("active.focused")) {
                    if (search !== "")
                        send("TYPING")
                } else if (current.matches("active.finished")) {
                    if (search === "")
                        send("EMPTY")
                    else
                        send("NOTEMPTY")
                }
                
            }, 1000)
        }
    }, [search])

    useEffect(() => {
        console.log(current);
    }, [current])

    return (
        <AppBar
            position="static"
            color={current.matches("active") ? "default" : "primary"}
        >
            <Container maxWidth="md">
                <Toolbar disableGutters>
                    <div className={Styles.toolbarLeft}>
                        {current.matches("active") ? (
                            <InputBase
                                placeholder="Search for something"
                                fullWidth
                                autoFocus
                                onChange={handleSearch}
                            />
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
                        {current.matches("active") ? (
                            <CloseIcon />
                        ) : (
                            <SearchIcon />
                        )}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default CustomAppBar;
