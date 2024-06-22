import styled from "styled-components";

const Txt = styled.p`
  font-size: 5rem;
  background: -webkit-linear-gradient(#3f32d4, #ae0fc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function HomePage() {
  return (
    <>
      <Box>
        <Txt>Home Page</Txt>
      </Box>
    </>
  );
}

export default HomePage;
