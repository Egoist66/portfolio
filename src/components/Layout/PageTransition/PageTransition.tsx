import {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { css, keyframes } from "styled-components";

type Stage = "entering" | "exiting" | "idle";

const pageEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
`;

const pageExit = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
    filter: blur(3px);
  }
`;

const Wrapper = styled.div<{ $stage: Stage; $reduceMotion: boolean }>`
  width: 100%;
  will-change: opacity, transform;

  ${({ $reduceMotion, $stage }) =>
    !$reduceMotion &&
    $stage === "entering" &&
    css`
      animation: ${pageEnter} 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    `}

  ${({ $reduceMotion, $stage }) =>
    !$reduceMotion &&
    $stage === "exiting" &&
    css`
      animation: ${pageExit} 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    `}
`;

type PageTransitionProps = {
  transitionKey: string;
  children: ReactNode;
  scrollToTop?: boolean;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function PageTransition({
  transitionKey,
  children,
  scrollToTop = false,
}: PageTransitionProps) {
  const reduceMotion = useRef(prefersReducedMotion());
  const [displayKey, setDisplayKey] = useState(transitionKey);
  const [displayNode, setDisplayNode] = useState(children);
  const [stage, setStage] = useState<Stage>(
    reduceMotion.current ? "idle" : "entering"
  );

  useEffect(() => {
    if (transitionKey === displayKey) {
      if (stage === "idle") {
        setDisplayNode(children);
      }
      return;
    }

    if (reduceMotion.current) {
      setDisplayNode(children);
      setDisplayKey(transitionKey);
      setStage("idle");
      if (scrollToTop) {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
      return;
    }

    setStage("exiting");
  }, [transitionKey, displayKey, children, stage, scrollToTop]);

  const handleAnimationEnd = useCallback(() => {
    if (stage === "exiting") {
      setDisplayNode(children);
      setDisplayKey(transitionKey);
      setStage("entering");
      if (scrollToTop) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (stage === "entering") {
      setStage("idle");
    }
  }, [stage, children, transitionKey, scrollToTop]);

  return (
    <Wrapper
      $stage={stage}
      $reduceMotion={reduceMotion.current}
      onAnimationEnd={handleAnimationEnd}
    >
      {displayNode}
    </Wrapper>
  );
}

export default PageTransition;
