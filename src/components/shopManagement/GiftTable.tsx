import { PaginationComponent } from "@/components/reusesable/PaginationComponent";
import { ModalComponent } from "@/components/reusesable/ModalComponent";
import { useGetAllActiveProductsQuery } from "@/redux/features/product/productApi";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Icon,
  Input,
  Label,
  Popover,
  Table,
} from "keep-react";
import { totalmem } from "os";
import {
  ArrowsDownUp,
  Cake,
  Crown,
  Cube,
  CurrencyDollar,
  DotsThreeOutline,
  Envelope,
  Equals,
  Gift,
  Lock,
  Pencil,
  Trash,
  CaretCircleRight,
  ChartPieSlice,
  Copy,
  Pen,
  Phone,
  SignOut,
  UserCircle,
  Users,
  Eye,
  MagnifyingGlass,
} from "phosphor-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { EventHandler, FormEvent, ReactElement, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { TProduct } from "@/types";
import ViewAndUpdateGift from "./ViewAndUpdateGift";

export default function GiftTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterBy, setFilterBy] = useState("name");
  const [filter, setFilter] = useState({});
  const { data, isError, error, isLoading, isFetching } =
    useGetAllActiveProductsQuery({
      limit: limit,
      page: page,
      filter: filter,
      sortby: "createdAt",
    });
  console.log("isFetching=>", isFetching);
  const products: TProduct[] = data?.data?.products || [];
  console.log({ products });
  const navigateToPage = (page: number) => {
    setPage(page);
  };

  const productActionDropDownList = (element: ReactElement) => (
    <Dropdown actionClassName="border-none" action={element}>
      <Dropdown.List>
        <Dropdown.Item>
          <Eye size={18} />
          View
        </Dropdown.Item>
        <Dropdown.Item>
          <Pen size={18} />
          Edit
        </Dropdown.Item>
        <Dropdown.Item>
          <Trash size={18} />
          Delete
        </Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  );

  const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleSearchFilter", e.target.value);
    const filterObj = { [filterBy]: e.target.value };
    console.log("filterObj", filterObj);
    if (e.target.value) {
      setFilter(filterObj);
      setPage(1);
    } else {
      setFilter({});
    }
  };

  return (
    <div>
      {isFetching && <h3>Loading...</h3>}
      <Table showCheckbox={true} className="mt-1">
        <Table.Caption>
          <div className="my-5 flex items-center justify-between px-6">
            <div className="flex items-center gap-5">
              <p className="text-body-1 font-semibold text-metal-600">
                Active Gift Items
              </p>
              <div>
                <Select onValueChange={(e) => setFilterBy(e)} value={filterBy}>
                  <SelectTrigger className="w-[180px] border-slate-200 p-5">
                    <SelectValue placeholder="Filter By" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-100">
                    <SelectGroup>
                      <SelectLabel>Filter By</SelectLabel>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="quantity">Quantity</SelectItem>
                      <SelectItem value="occasion">Occasion</SelectItem>
                      <SelectItem value="recipient">Recipient</SelectItem>
                      <SelectItem value="category">Category</SelectItem>
                      <SelectItem value="theme">Theme</SelectItem>
                      <SelectItem value="brand">Brand</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <fieldset className="relative max-w-md ">
                  <Input
                    type={
                      filterBy == "price" || filterBy == "quantity"
                        ? "number"
                        : "text"
                    }
                    placeholder="Enter here"
                    className="ps-11"
                    onChange={handleSearchFilter}
                  />
                  <Icon>
                    <MagnifyingGlass size={19} color="#AFBACA" />
                  </Icon>
                </fieldset>
              </div>
            </div>
            <div className="flex items-center gap-5">
              {/* <Button variant="outline" size="sm" className="rounded-[8px]">
                <span className="pr-2">
                  <Gift size={24} />
                </span>
                Add
              </Button> */}
              {/* <Button variant="outline" size="sm" className="rounded-[8px]">
                <span className="pr-2">
                  <Cube size={24} />
                </span>
                Search
              </Button> */}
            </div>
          </div>
        </Table.Caption>
        <Table.Head>
          <Table.HeadCell className="min-w-[290px]">
            <p className="text-body-5 font-medium text-metal-400">Name</p>
          </Table.HeadCell>
          <Table.HeadCell
            className="min-w-[183px] "
            // icon={<ArrowsDownUp size={14} color="#8897AE" />}
          >
            <div className="flex flex-col">
              <p className="text-body-5 font-medium text-metal-500">Price</p>
              {/* <p className="text-body-6 font-normal text-metal-500">Quantity</p> */}
            </div>
          </Table.HeadCell>
          <Table.HeadCell
            className="min-w-[160px]"
            // icon={<ArrowsDownUp size={14} color="#8897AE" />}
          >
            Quantity
          </Table.HeadCell>
          <Table.HeadCell
            className="min-w-[150px]"
            // icon={<ArrowsDownUp size={14} color="#8897AE" />}
          >
            Occasion
          </Table.HeadCell>
          <Table.HeadCell
            className="min-w-[183px]"
            // icon={<ArrowsDownUp size={14} color="#8897AE" />}
          >
            Recipient
          </Table.HeadCell>
          <Table.HeadCell
            className="min-w-[183px]"
            // icon={<ArrowsDownUp size={14} color="#8897AE" />}
          >
            Category
          </Table.HeadCell>
          <Table.HeadCell
            className="min-w-[183px]"
            // icon={<ArrowsDownUp size={14} color="#8897AE" />}
          >
            Theme
          </Table.HeadCell>
          <Table.HeadCell
            className="min-w-[183px]"
            // icon={<ArrowsDownUp size={14} color="#8897AE" />}
          >
            Brand
          </Table.HeadCell>
          <Table.HeadCell
            className="min-w-[183px]"
            // icon={<ArrowsDownUp size={14} color="#8897AE" />}
          >
            Created At
          </Table.HeadCell>
          {/* <Table.HeadCell className="min-w-[100px]" /> */}
        </Table.Head>

        <Table.Body className="divide-gray-25 divide-y">
          {products.map((item) => (
            <Table.Row className="bg-white" key={item._id}>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {/* <Avatar img="/images/company/paypal.png" /> */}
                      <div>
                        {/* {productActionDropDownList(
                          <p className="-mb-0.5 text-body-4 font-medium text-blue-600 hover:underline cursor-pointer">
                            {item.name}
                          </p>
                        )} */}
                        <ViewAndUpdateGift
                          productData={item}
                          textContent={item.name}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <p className="text-body-5 font-medium text-metal-500">
                  {item.price}
                </p>
              </Table.Cell>
              <Table.Cell>
                <p className="text-body-5 font-normal text-metal-500">
                  {item.quantity}
                </p>
              </Table.Cell>
              <Table.Cell>
                <p className="text-body-5 font-medium text-metal-500">
                  {item.occasion}
                </p>
              </Table.Cell>
              <Table.Cell>
                <div className="inline-block">
                  <Badge color="success">{item.recipient}</Badge>
                </div>
              </Table.Cell>
              <Table.Cell>
                <p className="text-body-5 font-medium text-metal-500">
                  {item.category}
                </p>
              </Table.Cell>
              <Table.Cell>
                <p className="text-body-5 font-medium text-metal-500">
                  {item.theme}
                </p>
              </Table.Cell>
              <Table.Cell>
                <p className="text-body-5 font-medium text-metal-500">
                  {item.brand}
                </p>
              </Table.Cell>
              <Table.Cell>
                <p className="text-body-5 font-medium text-metal-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </Table.Cell>
              {/* <Table.Cell>
                <Button variant="outline" size="sm" shape="circle">
                  <DotsThreeOutline size={15} />
                </Button>
              </Table.Cell> */}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="flex justify-end">
        <PaginationComponent
          totalPage={data?.data?.countPage}
          activePage={data?.data?.page}
          navigateToPage={navigateToPage}
        />
      </div>
    </div>
  );
}
