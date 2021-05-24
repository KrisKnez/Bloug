import React from "react";

import { Container, Box } from "@material-ui/core";

import AppBar from "../components/global/AppBar";

import "./Standard.css";

const StandardTemplate = (props) => {
    return (
        <>
            <AppBar />
            <Box my={3}>
                <Container maxWidth="md">{props.children}</Container>
            </Box>
        </>
    );
};

export default StandardTemplate;
