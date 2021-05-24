import React from 'react';

import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Typograhy,
    CardActions,
} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';  

import * as Styles from "./index.module.css";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "0px 0px",
        gridTemplateAreas:`
            "Media Header"
            "Media Content"
        `
    },
    header: {
        gridArea: "Header"
    },
    media: {
        gridArea: "Media"
    },
    content: {
        gridArea: "Content"
        
    }
}));

const Post = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader className={classes.header} title="This is my first post"/>
            <CardMedia className={classes.media} image="https://picsum.photos/200"/>
            <CardContent className={classes.content}>
                This is the content<br/>
                This is the content<br/>
                This is the content<br/>
                This is the content<br/>
                This is the content<br/>
            </CardContent>
        </Card>
    )
}

export default Post
