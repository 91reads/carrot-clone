import { ProductStructure } from '@libs/type/product_type';
import Image from 'next/image';
// assets
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/Chat';
// styles
import { ProductContainer, ProductBox, ProductImage, ProductContent, ProductInfo, ProductInfoContent } from './styles';
import { getPrevDate } from '@libs/format';

const ProductCard = ({ title, price, comments, hearts, image, onClick, updatedAt }: ProductStructure) => {
  const _onClick = () => {
    if (!onClick) return;
    onClick();
  };

  const ICON_TABLE = [
    {
      id: 1,
      icon: comments > 0 && <ChatIcon style={{ fontSize: '1.6rem', fill: 'black' }} />,
      content: comments > 0 && comments,
    },
    {
      id: 2,
      icon: <FavoriteBorderIcon style={{ fontSize: '1.6rem', fill: 'black' }} />,
      content: hearts ? hearts : 0,
    },
  ];

  return (
    <ProductContainer onClick={_onClick}>
      <ProductBox>
        <ProductImage>
          <Image
            src={`https://imagedelivery.net/PvvqDlv-2VYHUsYbyy-DlQ/${image}/avatar`}
            alt="상품 이미지"
            width={100}
            height={100}
          />
        </ProductImage>
        <ProductContent>
          <strong>{title}</strong>
          <b>{getPrevDate(updatedAt)}</b>
          <p>{price}원</p>
        </ProductContent>
      </ProductBox>
      <ProductInfo>
        {ICON_TABLE.map((item) => {
          return (
            <ProductInfoContent key={item.id}>
              <strong>{item.icon}</strong>
              <p>{item.content}</p>
            </ProductInfoContent>
          );
        })}
      </ProductInfo>
    </ProductContainer>
  );
};

export default ProductCard;
