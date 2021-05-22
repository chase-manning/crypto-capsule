import React from "react";
import styled from "styled-components";
import Button from "../styles/Button";
import Block from "./Block";

const StyledPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(6px);
  z-index: 1;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: relative;
  width: 600px;
  padding: 4rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--plain-dark);

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h3`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: var(--main);
`;

const Body = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--plain-dark);
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;

  button {
    margin: 0 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    button {
      margin: 1rem 0;
    }
  }
`;

type Props = {
  show: boolean;
  close: () => void;
  header?: string;
  body?: string;
  content?: JSX.Element;
  buttonText?: string;
  buttonAction?: () => void;
  secondButtonText?: string;
  secondButtonAction?: () => void;
};

const Popup: React.FC<Props> = (props) => {
  if (!props.show) return null;

  return (
    <StyledPopup>
      <Background onClick={() => props.close()} />
      <Container>
        <Block />
        <Content>
          {props.header && <Header>{props.header}</Header>}
          {props.body && <Body>{props.body}</Body>}
          {props.content && props.content}
          {(props.buttonText || props.secondButtonText) && (
            <ButtonContainer>
              {props.buttonText && (
                <Button
                  primary
                  onClick={() => {
                    if (props.buttonAction) props.buttonAction();
                  }}
                >
                  {props.buttonText}
                </Button>
              )}
              {props.secondButtonText && (
                <Button
                  onClick={() => {
                    if (props.secondButtonAction) props.secondButtonAction();
                  }}
                >
                  {props.secondButtonText}
                </Button>
              )}
            </ButtonContainer>
          )}
        </Content>
      </Container>
    </StyledPopup>
  );
};

export default Popup;
