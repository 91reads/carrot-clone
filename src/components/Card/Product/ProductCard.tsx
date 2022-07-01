import { ProductStructure } from '@libs/type/product_type';
import Image from 'next/image';
// assets
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/Chat';
// styles
import { ProductContainer, ProductBox, ProductImage, ProductContent, ProductInfo, ProductInfoContent } from './styles';

const ProductCard = ({ title, price, comments, hearts, image }: ProductStructure) => {
  const ICON_TABLE = [
    {
      id: 1,
      icon: comments && <ChatIcon style={{ fontSize: '1.6rem', fill: 'black' }} />,
      content: comments && comments,
    },
    {
      id: 2,
      icon: <FavoriteBorderIcon style={{ fontSize: '1.6rem', fill: 'black' }} />,
      content: hearts ? hearts : 0,
    },
  ];

  return (
    <ProductContainer>
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
          <h3>{title}</h3>
          <span>{price}원</span>
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
