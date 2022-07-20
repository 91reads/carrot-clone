import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';

interface FloatingButtonType {
  href: string;
}

const FloattingContainer = styled.div`
  position: absolute;
  bottom: 8rem;
  left: 84%;
  /* right: -8rem; */
  height: 5rem;
  
  width: 100%;
  `;
interface InnerWrapStyle {
  width: number;
}

const FloattingInner = styled.div<InnerWrapStyle>`
  position: fixed;
  width: ${({ width }) => width && `${width}px`};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--primary);
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  svg {
    font-size: 2.8rem;
    color: white;
  }
`;

export default function FloatingButton({ href }: FloatingButtonType) {
  // XXX: 웹에서 모바일 처럼 보이기 위한 처리.
  const ref = useRef<HTMLHeadingElement>(null);
  const [parent_width, set_parent_width] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    set_parent_width(ref.current.offsetWidth);
  }, []);

  return (
    <FloattingContainer ref={ref}>
      <FloattingInner width={parent_width}>
        <Link href={href}>
          <a>
            <AddIcon />
          </a>
        </Link>
      </FloattingInner>
    </FloattingContainer>
  );
}
