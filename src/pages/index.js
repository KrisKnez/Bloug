import * as React from "react";

import StandardTemplate from "../templates/Standard";

import Post from "../components/global/Post";

const IndexPage = () => {
    return (
        <StandardTemplate>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
        </StandardTemplate>
    );
};

export default IndexPage;
