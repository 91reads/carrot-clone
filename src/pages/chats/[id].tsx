import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import useSWR from 'swr';
// components
import Message from 'src/components/Message';
import Appbar from '@components/Layout/Appbar';
import Loading from '@components/Loading/Loading';
// api
import { createMessage, getRoomMessage } from 'src/api/message';
import { updateProduct } from 'src/api/product';
// lib
import { currencify } from '@libs/format';
import useUser from '@libs/client/useUser';
import { ChatStructureType } from '@libs/type/chat_type';
import { MessageStructureType } from '@libs/type/message_type';
// assets
import SendIcon from '@mui/icons-material/Send';
// styles
import { RoomContainer, RoomProductInfo, RoomProductImage, RoomButtonBox } from 'assets/pages/chat/room_styles';

const ChatDetail = () => {
  const router = useRouter();
  const { register, handleSubmit, reset, watch } = useForm();
  const room_message_data = useSWR<Array<ChatStructureType>>(
    router.query.product_id && `/api/chats/${router.query.product_id}/message`,
    router.query.product_id ? () => getRoomMessage(router.query.product_id as string) : null,
  );
  const [product_status, set_product_status] = useState(router.query.status ? router.query.status : '');
  const [valid_button, set_valid_button] = useState(false);
  const user_id = useUser();

  const watch_message = watch('message');

  useEffect(() => {
    set_valid_button(false);
    if (!watch_message) return;

    set_valid_button(true);
  }, [watch_message]);

  // useEffect(() => {
  //   if(!room_message_data.data) return;

  //   console.log('asdf:', room_message_data.data.filter((v) => Number(v.userId) === Number(user_id))[0]);
  // }, [room_message_data])

  if (room_message_data.error) return <div>에러</div>;
  if (!room_message_data.data) return <Loading />;

  const filtered_data = room_message_data.data
    .filter((v) => Number(v.productId) === Number(router.query.product_id))
    .filter((v) => Number(v.userId) === Number(router.query.user_id))[0];

  const onChangeProductStatus = (e: any) => {
    set_product_status(e.target.value);

    const change_word = (word: string) => {
      if (word === 'live') return '판매중';
      else return '판매 완료';
    };

    if (!confirm(`상품을 ${change_word(e.target.value)} 처리 하시겠습니까?`)) return;

    updateProduct({
      product_id: router.query.product_id,
      buyer_id: router.query.user_id,
      status: e.target.value,
    })
      .then(() => {
        alert('update success');
      })
      .catch((e) => {
        console.error('statusUpdate:', e);
      });
  };

  const onCreateMessage = (data: any) => {
    if (!router.query.id || !router.query.product_id) return;

    createMessage(router.query.chat_id as string, router.query.product_id as string, data.message)
      .then(() => {
        reset();
      })
      .catch((e) => {
        console.error('CREATE_ERROR:', e);
        alert('Failure Sending Message');
      });
  };

  return (
    <>
      <Appbar title={filtered_data?.product.user.name} />
      <RoomContainer>
        <RoomProductInfo>
          <RoomProductImage>
            <Image
              src={`${process.env.NEXT_PUBLIC_CF_IMAGE}/${filtered_data?.product.image}/avatar`}
              alt=""
              width={280}
              height={280}
              layout="fill"
              style={{ borderRadius: '50%' }}
            />
          </RoomProductImage>
          <div>
            <strong>{filtered_data?.product.name}</strong>
            <p>{currencify(filtered_data?.product.price)}원</p>
          </div>
          <select onChange={onChangeProductStatus} value={product_status}>
            <option value="live">판매중</option>
            <option value="close">판매완료</option>
          </select>
        </RoomProductInfo>
        {filtered_data?.messages?.map((v: MessageStructureType, i: number) => {
          return <Message key={i} message={v.message} mymessage={v.user.id === user_id} />;
        })}
        <form onSubmit={handleSubmit(onCreateMessage)}>
          <RoomButtonBox valid_button={valid_button}>
            <input {...register('message', { required: true })} type="text" />
            <button type="submit">
              <SendIcon />
            </button>
          </RoomButtonBox>
        </form>
      </RoomContainer>
    </>
  );
};

export default ChatDetail;
