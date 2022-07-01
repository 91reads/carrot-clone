import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';

interface FloatingButtonType {
  href: string;
}

const FloattingContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5rem;

  width: 100%;
`;
const FloattingInner = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 8rem;
  /* right: 8rem; */
  /* right: 0; */
  /* right: 2rem; */
  /* bottom: 8rem; */

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
  return (
    <FloattingContainer>
      <FloattingInner>
        <Link href={href}>
          <a className="fixed hover:bg-orange-500 border-0 aspect-square border-transparent transition-colors cursor-pointer  bottom-24 right-5 shadow-xl bg-orange-400 rounded-full w-14 flex items-center justify-center text-white">
            <AddIcon />
          </a>
        </Link>
      </FloattingInner>
    </FloattingContainer>
  );
}
