/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginationComponent } from "@/components/reusesable/PaginationComponent";
import { ModalComponent } from "@/components/reusesable/ModalComponent";
import {
  useDeleteBulkProductMutation,
  useGetAllActiveProductsQuery,
} from "@/redux/features/product/productApi";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Dropdown,
  Icon,
  Input,
  Label,
  Popover,
  Skeleton,
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
  CheckCircle,
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
import { toast } from "sonner";

export default function GiftTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterBy, setFilterBy] = useState("name");
  const [filter, setFilter] = useState({});
  const [selectedIds, setSelectedIds] = useState([] as string[]);
  const { data, isError, error, isLoading, isFetching } =
    useGetAllActiveProductsQuery({
      limit: limit,
      page: page,
      filter: filter,
      sortby: "createdAt",
    });
  const [bulkDeleteApi] = useDeleteBulkProductMutation(undefined);
  console.log("isFetching=>", isFetching);
  const products: TProduct[] = data?.data?.products || [];
  console.log({ products });
  const navigateToPage = (newPage: number) => {
    if (page != newPage) {
      setSelectedIds([]);
      setPage(newPage);
    }
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
    setSelectedIds([]);
  };

  const handleCheckBoxToBulkDelete = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      const filterIds = selectedIds.filter((item) => item !== id);
      setSelectedIds(filterIds);
    }
    console.log("handleCheckBox=>", id, isChecked);
  };
  const handleBulkDelete = async () => {
    const isConfirm = confirm(
      `Are your sure to delete  ${selectedIds.length} nos items ?`
    );
    console.log("isConfirm", isConfirm);
    if (selectedIds.length && isConfirm) {
      try {
        const response = await bulkDeleteApi(selectedIds).unwrap();
        console.log("bulk delete response=>", response);
        if (response?.statusCode >= 200 && response?.statusCode <= 299) {
          toast.success(response?.message);
          setSelectedIds([]);
        } else {
          toast.error(response?.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="w-100">
      {/* {isFetching && <h3>Loading...</h3>} */}
      <Table
        // showCheckbox={true}
        className="mt-1"
      >
        <Table.Caption>
          <div className="my-5 flex items-center justify-between px-6">
            <div className="flex items-center gap-5">
              <p className="text-body-1 font-semibold text-metal-600">
                Active Gift Items
              </p>
              <Badge size="sm" color="secondary">
                {data?.data?.count} Product
              </Badge>
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
              <div className="text-left">
                {selectedIds.length > 0 && (
                  <Button
                    color="error"
                    // variant="link"
                    disabled={selectedIds.length <= 0 ? true : false}
                    onClick={handleBulkDelete}
                    className="p-2 rounded-xl"
                  >
                    <span className="pr-2">
                      <Trash size={20} />
                    </span>
                    Delete {selectedIds.length} Items
                  </Button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-5">
              {/*               
              <Button variant="outline" size="sm" className="rounded-[8px]">
                <span className="pr-2">
                  <Cube size={24} />
                </span>
                Search
              </Button> */}
            </div>
          </div>

          {isFetching && (
            <Skeleton className="w-full space-y-2.5">
              <Skeleton.Line className="h-12 w-full" />
              <Skeleton.Line className="h-12 w-full" />
              <Skeleton.Line className="h-12 w-full" />
              <Skeleton.Line className="h-12 w-full" />
              <Skeleton.Line className="h-12 w-full" />
              <Skeleton.Line className="h-12 w-full" />
            </Skeleton>
          )}
        </Table.Caption>
        {!isFetching && (
          <>
            <Table.Head>
              <Table.HeadCell
                icon={<CheckCircle size={14} color="#8897AE" />}
              ></Table.HeadCell>
              <Table.HeadCell className="min-w-[150px]">
                <p className="text-body-5 font-medium text-metal-400">Name</p>
              </Table.HeadCell>
              <Table.HeadCell
                className="min-w-[70px] "
                // icon={<ArrowsDownUp size={14} color="#8897AE" />}
              >
                <div className="flex flex-col">
                  <p className="text-body-5 font-medium text-metal-500">
                    Price
                  </p>
                  {/* <p className="text-body-6 font-normal text-metal-500">Quantity</p> */}
                </div>
              </Table.HeadCell>
              <Table.HeadCell
                className="min-w-[70px]"
                // icon={<ArrowsDownUp size={14} color="#8897AE" />}
              >
                Quantity
              </Table.HeadCell>
              <Table.HeadCell
                className="min-w-[70px]"
                // icon={<ArrowsDownUp size={14} color="#8897AE" />}
              >
                Occasion
              </Table.HeadCell>
              <Table.HeadCell
                className="min-w-[100px]"
                // icon={<ArrowsDownUp size={14} color="#8897AE" />}
              >
                Recipient
              </Table.HeadCell>
              <Table.HeadCell
                className="min-w-[100px]"
                // icon={<ArrowsDownUp size={14} color="#8897AE" />}
              >
                Category
              </Table.HeadCell>
              <Table.HeadCell
                className="min-w-[100px"
                // icon={<ArrowsDownUp size={14} color="#8897AE" />}
              >
                Theme
              </Table.HeadCell>
              <Table.HeadCell
                className="min-w-[100px]"
                // icon={<ArrowsDownUp size={14} color="#8897AE" />}
              >
                Brand
              </Table.HeadCell>
              <Table.HeadCell
                className="min-w-[100px]"
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
                    <Checkbox
                      // checked =  {true}
                      id="checked"
                      variant="checked"
                      onChange={(e) => {
                        handleCheckBoxToBulkDelete(item._id, e.target.checked);
                        // setSelectedIds(item._id)
                        // console.log("e", e.target.checked);
                      }}
                      // onSelect={(e) => {
                      //   console.log("heelo");
                      // }}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {/* <Avatar img="/images/company/paypal.png" /> */}
                          <div onClick={() => setSelectedIds([])}>
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
          </>
        )}
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
