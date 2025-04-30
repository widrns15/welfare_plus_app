import styled from "styled-components";

const FullScreenContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: ${({ theme }) => theme.colors.background};
`;

const Wrapper = styled.div`
    max-width: 420px;
    height: 70vh;
    margin: 0 auto;
    border-radius: 20px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
`;

const PageContent = styled.main`
    flex: 1;
    overflow-y: auto;
    padding: 1.2rem;
`;

function AppLayout({ children }) {
    return (
        <FullScreenContainer>
            <Wrapper>
                <PageContent>{children}</PageContent>
            </Wrapper>
        </FullScreenContainer>
    );
}

export default AppLayout;
