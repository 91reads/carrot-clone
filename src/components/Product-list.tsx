import { getUserHistory } from "src/api/user";
import { ProductWithCount } from "src/pages";
import useSWR from "swr"
import Item from "./Item";

interface ProductListProps {
  kind: "favs" | "sales" | "purchase"
}

interface Record {
  id: number;
  product: ProductWithCount;
}

export default function ProductList({ kind }: ProductListProps) {
  const history_data = useSWR(kind && `/api/users/me/${kind}`, kind ? () => getUserHistory(kind) : null)

  if (history_data.error) return <div>...에러</div>;
  if (!history_data.data) return <div>...로딩중</div>;

  return (
    <>{history_data.data?.map((record: any) => (
      <Item
        id={record.product.id}
        key={record.id}
        title={record.product.name}
        price={record.product.price}
        comments={1}
        hearts={record.product._count.favs}
      />
    ))}</>
  )
};