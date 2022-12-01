import styled from "styled-components";
import { withIronSessionSsr } from "iron-session/next";
import { useEffect, useState } from "react";

import { ironConfig } from "../lib/middlewares/ironSession";

import Navbar from "../src/components/layout/Navbar";
import Container from "../src/components/layout/Container";
import CreatePost from "../src/components/cards/CreatePost";
import H3 from "../src/components/typography/H3";
import Post from "../src/components/cards/Post";
import axios from "axios";

const Content = styled.div`
  margin: 50px 0;
`;

const LastPostText = styled(H3)`
  padding: 40px 0;
`;

const RefreshPosts = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.primary};
  cursor: pointer;
`;

const RefreshPostsContainer = styled.div`
  text-align: center;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

function HomePage({ user }) {
  const [data, setData] = useState([]);
  
  const handlePosts = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/post`
    );
    setData(response.data);
  };

  useEffect(() => {
    handlePosts();
  }, []);

  return (
    <>
      <Navbar />
      <Content>
        <Container>
          <CreatePost username={user.user} />
          <LastPostText>Últimas postagens:</LastPostText>
          <RefreshPostsContainer>
            <RefreshPosts>Carregar novas postagens</RefreshPosts>
          </RefreshPostsContainer>
          <PostContainer>
            {
            data.map((post) => 
            <Post
            key={post._id}
            text={post.text}
            user={post.createdBy.user}
            date={post.createdDate}/>
            )
            }
          </PostContainer>
        </Container>
      </Content>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    console.log(user);

    return {
      props: {
        user,
      },
    };
  },
  ironConfig
);

export default HomePage;
