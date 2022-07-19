import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
// assets
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

const TabbarContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;

  height: 6.6rem;
  width: 100%;
`;

interface InnerWrapStyle {
  width: number;
}

const TabbarInnerWrap = styled.div<InnerWrapStyle>`
  position: fixed;
  padding: 1rem 2rem;
  width: ${({ width }) => width && `${width}px`};
  border-top: 1px solid var(--gray-2);
  z-index: 99999;
  background-color: white;
`;

const TabbarWrap = styled.div`
  /* position: relative; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 1rem 0 1.2rem;
  margin-left: 1rem;
`;

const TabbarItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  strong {
    padding-top: 0.8rem;
    font-size: 1.2rem;
  }
`;

const Tabbar = () => {
  const router = useRouter();
  // HACK: 웹에서 모바일 처럼 보이기 위한 처리.
  const ref = useRef<HTMLHeadingElement>(null);
  const [parent_width, set_parent_width] = useState<any>(0);

  const throttle = (callback: { (): void; call?: any; }, limit: number | undefined) => {
    let wait = false;
    return function () {
      if (!wait) {
        callback.call();
        wait = true;
        setTimeout(function () {
          wait = false;
        }, limit);
      }
    };
  };

  const checkParentOffset = () => {
    set_parent_width((prev: any) => {
      if (prev !== ref.current?.offsetWidth) {
        console.log('new');
        return ref.current?.offsetWidth;
      }
      console.log('not new');
      return prev;
    });
  };

  useEffect(() => {
    if (!ref.current) return;

    window.addEventListener('resize', throttle(checkParentOffset, 100));

    set_parent_width(ref.current.offsetWidth);
  }, []);

  const ICON_TABLE = [
    {
      id: 1,
      icon: <HomeIcon style={{ fontSize: '2.6rem', fill: 'black' }} />,
      text: '홈',
      link: '/',
    },
    {
      id: 2,
      icon: <MapsHomeWorkIcon style={{ fontSize: '2.4rem', fill: 'black' }} />,
      text: '동네생활',
      link: '/community/list',
    },
    {
      id: 3,
      icon: <ChatIcon style={{ fontSize: '2.2rem', fill: 'black' }} />,
      text: '채팅',
      link: '/chats/list',
    },
    {
      id: 4,
      icon: <PersonIcon style={{ fontSize: '2.6rem', fill: 'black' }} />,
      text: '나의 캐럿',
      link: '/profile',
    },
  ];

  const moveRouter = (link: string) => {
    console.log('click');
    router.push(link);
  };

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
            );
          })}
        </TabbarWrap>
      </TabbarInnerWrap>
    </TabbarContainer>
  );
};

export default Tabbar;
