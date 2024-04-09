"use client";
import { Pagination } from "keep-react";
import { CaretLeft, CaretRight, DotsThree } from "phosphor-react";
export type TPaginationProps = {
  totalPage: number;
  activePage: number;
  navigateToPage: (page: number) => void;
};

export const PaginationComponent = ({
  totalPage,
  activePage,
  navigateToPage,
}: TPaginationProps) => {
  console.log("PaginationComponent props", {
    totalPage,
    activePage,
    navigateToPage,
  });
  const totalPageArray = [];

  for (let index = 0; index < totalPage; index++) {
    totalPageArray.push({
      page: index + 1,
      isActivePage: index + 1 == activePage ? true : false,
    });
  }
  console.log("totalPageArray=>", totalPageArray);
  return (
    <Pagination shape="circle">
      <Pagination.Navigator
        shape="circle"
        disabled={activePage == 1}
        onClick={() => navigateToPage(activePage - 1)}
      >
        <CaretLeft size={18} />
      </Pagination.Navigator>
      <Pagination.List>
        {totalPageArray.map((item, index) => (
          <Pagination.Item
            key={index}
            active={item?.isActivePage}
            onClick={() => navigateToPage(item?.page)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        {/* <Pagination.Item>1</Pagination.Item>
        <Pagination.Item active>2</Pagination.Item>
        <Pagination.Item>3</Pagination.Item>
        <Pagination.Item>4</Pagination.Item>
        <Pagination.Item>
          <DotsThree size={20} />
        </Pagination.Item>
        <Pagination.Item>10</Pagination.Item> */}
      </Pagination.List>
      <Pagination.Navigator
        disabled={activePage == totalPage}
        shape="circle"
        onClick={() => navigateToPage(activePage + 1)}
      >
        <CaretRight size={18} />
      </Pagination.Navigator>
    </Pagination>
  );
};
