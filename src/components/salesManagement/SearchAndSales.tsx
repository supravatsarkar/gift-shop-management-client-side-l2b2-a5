import { useGetInventoryQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types";
import { Icon, Input, Skeleton } from "keep-react";
import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { PaginationComponent } from "../reusesable/PaginationComponent";

export function SearchAndSales() {
  // limit: number;
  //   page: number;
  //   sortby: string;
  //   search: string;
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [sortby, setStortBy] = useState("");
  const [search, setSearch] = useState("");
  const { data, isFetching, isError } = useGetInventoryQuery({
    limit,
    page,
    sortby,
    search,
  });
  const products: TProduct[] = data?.data?.products;
  console.log("SearchAndSales=>", products);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleSearchFilter", e.target.value);
    // if (e.target.value) {
    setSearch(e.target.value);
    setPage(1);
    // }
  };
  const navigateToPage = (page: number) => {
    setPage(page);
  };

  const skeletonArray = [];
  for (let i = 0; i < 8; i++) {
    skeletonArray.push(
      <Skeleton className="w-full space-y-2.5 xl:max-w-md">
        <Skeleton.Line className="h-52 w-full" />
        <Skeleton.Line className="h-4 w-full" />
        <Skeleton.Line className="h-4 w-3/5" />
        <Skeleton.Line className="h-4 w-4/5" />
        <Skeleton.Line className="h-10 w-2/5" />
      </Skeleton>
    );
  }
  return (
    <div>
      <div className="flex justify-center">
        <fieldset className="relative max-w-md focus:outline-none ">
          <Input
            placeholder="Search Product"
            className="ps-11 "
            onChange={handleSearch}
          />
          <Icon>
            <MagnifyingGlass size={19} color="#AFBACA" />
          </Icon>
        </fieldset>
      </div>

      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!isFetching &&
          products?.map((item) => {
            return <ProductCard key={item._id} product={item} />;
          })}
        {isFetching && skeletonArray.map((item) => <>{item}</>)}
      </div>
      <div>
        <PaginationComponent
          totalPage={data?.data?.countPage}
          activePage={data?.data?.page}
          navigateToPage={navigateToPage}
        />
      </div>
    </div>
  );
}
