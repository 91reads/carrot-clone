import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/router';

const TabbarContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;

  height: 6rem;
  width: 100%;
  
  
  background-color: white;
  
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

const TabbarInnerWrap = styled.div<InnerWrapStyle>`
  background-color: red;
  position: fixed;
  padding: 1rem 2rem;
  width: ${({ width }) => width && `${width}px`};
  border-top: 1px solid var(--gray-2);
  /* background-color: white; */
`;

const TabbarWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding:0 2rem;
`;

const TabbarItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 4rem;

  strong {
    padding-top: 1rem;
    font-size: 1.4rem;
  }
`;

const Tabbar = () => {
  const router = useRouter();
  // HACK: 웹에서 모바일 처럼 보이기 위한 처리.
  const ref = useRef<HTMLHeadingElement>(null);
  const [parent_width, set_parent_width] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    set_parent_width(ref.current.offsetWidth)
  }, [])

  const ICON_TABLE = [
    {
      id: 1,
      icon: <HomeIcon style={{ fontSize: '2.8rem', fill: 'black' }} />,
      text: "홈",
      link: '/'
    },
    {
      id: 2,
      icon: <MapsHomeWorkIcon style={{ fontSize: '2.6rem', fill: 'black' }} />,
      text: "동네생활",
      link: '/community'
    },
    {
      id: 3,
      icon: <ChatIcon style={{ fontSize: '2.4rem', fill: 'black' }} />,
      text: "채팅",
      link: '/chats'
    },
    {
      id: 4,
      icon: <PersonIcon style={{ fontSize: '2.8rem', fill: 'black' }} />,
      text: "나의 캐럿",
      link: '/profile'
    },
  ];

  const moveRouter = (link: string) => {
    router.push(link);
  }

  return (
    <TabbarContainer ref={ref}>
      <TabbarInnerWrap width={parent_width}>
        <TabbarWrap>
          {ICON_TABLE.map((item) => {
            return (
              <TabbarItemBox key={item.id} onClick={() => moveRouter(item.link)}>
                {item.icon}
                <strong>{item.text}</strong>
              </TabbarItemBox>
            )
          })}
        </TabbarWrap>
      </TabbarInnerWrap>
    </TabbarContainer>
  )
};

export default Tabbar;