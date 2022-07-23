import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
// assets
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
// styles
import {
  TabbarContainer,
  TabbarWrap,
  TabbarInnerWrap,
  TabbarItemBox,
} from './styles';
import { throttle } from '@libs/format';

const Tabbar = () => {
  const router = useRouter();
  // XXX: 웹에서 모바일 처럼 보이기 위한 처리.
  const ref = useRef<HTMLHeadingElement>(null);
  const [parent_width, set_parent_width] = useState<number>(0);

  const checkParentOffset = () => {
    set_parent_width((prev: any) => {
      if (prev !== ref.current?.offsetWidth) {
        return ref.current?.offsetWidth;
      }
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
