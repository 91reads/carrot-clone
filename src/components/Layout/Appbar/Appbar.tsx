import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
// components
import SearchForm from '@components/SearchForm';
// assets
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// styles
import {
  AppbarContainer,
  AppbarInnerWrap,
  AppbarTitle,
} from './styles';
import { throttle } from '@libs/format';

interface AppbarProps {
  title?: string;
  onClick?: () => void;
  onClickTitle?: string;
  backButtonDisable?: boolean;
  set_watch_search?: React.Dispatch<React.SetStateAction<string>>;
  set_search?: React.Dispatch<React.SetStateAction<boolean>>;
  search?: boolean;
}

const Appbar = ({
  backButtonDisable,
  title,
  onClick,
  onClickTitle,
  set_watch_search,
  search,
  set_search,
}: AppbarProps) => {
  // XXX: 웹에서 모바일 처럼 보이기 위한 처리.
  const router = useRouter();
  const ref = useRef<HTMLHeadingElement>(null);
  const [parent_width, set_parent_width] = useState(0);

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

  const _onClick = () => {
    if (!onClick) return;
    onClick();
  };

  const isFilterRouter = () => {
    if (router.pathname === '/') return false;
    else return true;
  };

  return (
    <AppbarContainer ref={ref}>
      <AppbarInnerWrap width={parent_width}>
        <AppbarTitle>
          {!backButtonDisable && isFilterRouter() ? (
            <div onClick={() => router.back()}>
              <ArrowBackIosIcon style={{ fontSize: '2rem', position: 'relative', top: '0.4rem' }} />
            </div>
          ) : (
            <div />
          )}
          {title && <h3>{title}</h3>}
        </AppbarTitle>
        {router.pathname === '/' ? (
          <SearchForm search={search} set_search={set_search} set_watch_search={set_watch_search} />
        ) : (
          <div onClick={_onClick}>{onClickTitle}</div>
        )}
      </AppbarInnerWrap>
    </AppbarContainer>
  );
};

export default Appbar;
