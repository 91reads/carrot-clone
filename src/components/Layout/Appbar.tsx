import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const AppbarContainer = styled.div`
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  height: 5rem;
  
  h3 {
    font-size: 2rem;
    line-height: 2.8rem;
    
    font-weight: 600;
    
    color: var(--gray-4);
  }
  `;

interface InnerWrapStyle {
  width: number;
}

const AppbarInnerWrap = styled.div<InnerWrapStyle>`
  position: fixed;
  padding: 1rem 2rem;
  width: ${({ width}) => width && `${width}px`};
  border-bottom: 1px solid var(--gray-2);
  background-color: white;
`;

const Appbar = ({ title }: any) => {
  // HACK: 웹에서 모바일 처럼 보이기 위한 처리.
  const ref = useRef<HTMLHeadingElement>(null);
  const [parent_width, set_parent_width] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    set_parent_width(ref.current.offsetWidth)
  }, [])

  return (
    <AppbarContainer ref={ref}>
      <AppbarInnerWrap width={parent_width}>
        {title && <h3>{title}</h3>}
      </AppbarInnerWrap>
    </AppbarContainer>
  )
};

export default Appbar;
