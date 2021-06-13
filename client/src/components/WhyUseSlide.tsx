import React, { useState } from "react";
import styled from "styled-components";
import Note from "./Note";
import noise from "../assets/noise.png";
import Button from "./Button";

type SectionContent = {
  header: string;
  body: string;
  button: string;
};

const sections: SectionContent[] = [
  {
    header: "Why Use Crypto Capsule?",
    body:
      "Crypto Capsule is super versitile! Click through to see some example use cases <3",
    button: "Show Me!",
  },
  {
    header: "Escrow Employee Tokens",
    body:
      "Sometimes a protocol will want to distribute their native tokens to their employees or developers. To avoid the risk of employees selling all tokens on distribution, it is sometimes desirable to have these escrowed and gradually distributed over time.",
    button: "Tell me More...",
  },
  {
    header: "Trustless Trust Fund",
    body:
      "Crypto Capsule can be used as a trust fund to distribute assets to a beneficiary. This could be used to build a trust fund for your children that distributes to them when they turn 21 years of age.",
    button: "So cool!!!",
  },
  {
    header: "Lock LP Tokens",
    body:
      "Sometimes a Protocol will allocate a portion of minted tokens to providing liquidity. These are often locked for a period of time to give users confidence that there will be liquidity. Crypto Capsule can be used to lock these LP Tokens and share the capsule with users as proof.",
    button: "No Way :O",
  },
  {
    header: "Crypto Term Deposit",
    body:
      "Use Crypto Capsule as a term deposit, top up when you want to add to your savings, and set the capsule to open when you want to withdraw. Great for dollar cost averaging in and out for the next bull run.",
    button: "Epic <3",
  },
];

const StyledWhyUseSlide = styled.div`
  position: relative;
  width: 100%;
  height: calc(1050px - (100vw - 600px) / 2.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 600px) {
    height: 50rem;
  }
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--bg),
    var(--sub),
    var(--bg),
    var(--bg)
  );
  opacity: 0.5;
`;

const Noise = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${noise});
  background-size: 5px 5px;
  opacity: 1;
`;

type SectionProps = {
  position: number;
};

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform-origin: 50% 1000%;
  transform: translate(-50%, -45%)
    rotate(${(props: SectionProps) => props.position * 30}deg);
  transition: transform 1s;
`;

const ButtonContainer = styled.div`
  margin-top: 3rem;
  width: 60vw;
  height: 4rem;
  display: flex;
  justify-content: flex-end;
  padding-right: 3rem;
  transform: rotate(-1deg);
`;

const WhyUseSlide = (): JSX.Element => {
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <StyledWhyUseSlide>
      <Noise />
      <Gradient />
      {sections.map((section: SectionContent, index: number) => (
        <Section position={index - slideIndex}>
          <Note header={section.header} body={section.body} />
          <ButtonContainer>
            {index !== sections.length - 1 && (
              <Button
                text={section.button}
                click={() => setSlideIndex(index + 1)}
              />
            )}
          </ButtonContainer>
        </Section>
      ))}
    </StyledWhyUseSlide>
  );
};

export default WhyUseSlide;
