/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useGetMangersQuery,
  useUpdateUserProfileMutation,
} from "../../../redux/features/admin/adminApi";
// import { Space, Table, TableProps, Tag } from "antd";
import {
  Badge,
  Button,
  Checkbox,
  Divider,
  Dropdown,
  Skeleton,
  Table,
  Toggle,
} from "keep-react";
import {
  CheckCircle,
  Checks,
  ClockClockwise,
  DotsThreeOutline,
  Pen,
  SignOut,
  Trash,
  UserCircle,
  Users,
  XCircle,
} from "phosphor-react";
import { PaginationComponent } from "@/components/reusesable/PaginationComponent";
import { DropdownComponent } from "@/components/reusesable/DropdownComponent";
import { TUserDetails } from "@/types";
import { toast } from "sonner";

export default function Managers() {
  const { data, isError, isFetching } = useGetMangersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateUser] = useUpdateUserProfileMutation();
  const [page, setPage] = useState(1);
  console.log({ isError });
  const managers: TUserDetails[] = data?.data?.users || [];
  console.log({ managers });
  const navigateToPage = (newPage: number) => {
    if (page != newPage) {
      // setSelectedIds([]);
      setPage(newPage);
    }
  };

  const handelUpdateManager = async (
    id: string,
    payload: Partial<TUserDetails>
  ) => {
    console.log("handelUpdateManager=>", id);

    const isConfirm = confirm(`Are you sure?`);
    if (isConfirm) {
      const toastId = toast.promise(new Promise(() => {}), {
        loading: "Loading...",
      });
      try {
        const response = await updateUser({ id, payload }).unwrap();
        console.log("response=>", response);
        if (response.statusCode >= 200 && response.statusCode <= 299) {
          toast.success(response.message, { id: toastId });
        } else {
          toast.error(response.message, { id: toastId });
        }
      } catch (error: any) {
        // console.log("error=>", error);
        toast.error(
          (error?.data?.message as string) || "Something went wrong!",
          { id: toastId }
        );
      }
    }
    return;
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
                {data?.data?.count} Users
              </Badge>
              <div>
                {/* <Select onValueChange={(e) => setFilterBy(e)} value={filterBy}>
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
            </Select> */}
              </div>
              <div>
                {/* <fieldset className="relative max-w-md ">
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
            </fieldset> */}
              </div>
              {/* <div className="text-left">
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
              </div> */}
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
                <p className="text-body-5 font-medium text-metal-400">Email</p>
              </Table.HeadCell>
              <Table.HeadCell
                className="min-w-[70px] "
                // icon={<ArrowsDownUp size={14} color="#8897AE" />}
              >
                <div className="flex flex-col">
                  <p className="text-body-5 font-medium text-metal-500">
                    Phone
                  </p>
                  {/* <p className="text-body-6 font-normal text-metal-500">Quantity</p> */}
                </div>
              </Table.HeadCell>
              <Table.HeadCell
                className="min-w-[70px]"
                // icon={<ArrowsDownUp size={14} color="#8897AE" />}
              >
                Name
              </Table.HeadCell>
              <Table.HeadCell
                className="min-w-[70px]"
                // icon={<ArrowsDownUp size={14} color="#8897AE" />}
              >
                Last Login
              </Table.HeadCell>
              <Table.HeadCell
                className="min-w-[70px]"
                // icon={<ArrowsDownUp size={14} color="#8897AE" />}
              >
                Enable
              </Table.HeadCell>
              <Table.HeadCell
                className="min-w-[70px]"
                // icon={<ArrowsDownUp size={14} color="#8897AE" />}
              >
                Verified
              </Table.HeadCell>
              <Table.HeadCell
                className="min-w-[100px]"
                // icon={<ArrowsDownUp size={14} color="#8897AE" />}
              >
                Created At
              </Table.HeadCell>
              <Table.HeadCell className="min-w-[75px]">Status</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-gray-25 divide-y">
              {managers?.map((item) => (
                <Table.Row
                  className={`${item.isDeleted ? "bg-slate-200" : "bg-white"}`}
                  key={item._id}
                >
                  <Table.Cell>
                    <Checkbox
                      // checked =  {true}
                      id="checked"
                      variant="checked"
                      onChange={() => {
                        // handleCheckBoxToBulkDelete(item._id, e.target.checked);
                        // setSelectedIds(item._id)
                        // console.log("e", e.target.checked);
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <p className="text-body-5 font-medium text-blue-500 hover:underline cursor-pointer">
                      {item.email}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="text-body-5 font-medium text-blue-500 hover:underline cursor-pointer">
                      {item.phone}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="text-body-5 font-medium text-blue-500 hover:underline cursor-pointer">
                      {item.name}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="text-body-5 font-medium text-metal-500">
                      {new Date(item.lastLogin).toLocaleString()}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      variant="outline"
                      size="sm"
                      shape="circle"
                      className="border-none"
                      color={`${item.isEnabled ? "primary" : "error"}`}
                      onClick={() =>
                        handelUpdateManager(item._id, {
                          isEnabled: !item.isEnabled,
                        })
                      }
                    >
                      {item.isEnabled ? (
                        <CheckCircle size={32} />
                      ) : (
                        <XCircle size={32} />
                      )}
                    </Button>

                    {/* <p className="text-body-5 font-medium text-metal-500">
                      {item.isEnabled ?'Yes'  :
                        "No"
                      }
                    </p> */}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      variant="outline"
                      size="sm"
                      shape="circle"
                      className="border-none"
                      color={`${item.isVerified ? "primary" : "warning"}`}
                      onClick={() =>
                        handelUpdateManager(item._id, {
                          isVerified: !item.isVerified,
                        })
                      }
                    >
                      {item.isVerified ? (
                        <CheckCircle size={32} />
                      ) : (
                        <XCircle size={32} />
                      )}
                    </Button>
                    {/* <p className="text-body-5 font-medium text-metal-500">
                      {item.isVerified ? "Yes" : "No"}
                    </p> */}
                  </Table.Cell>
                  <Table.Cell>
                    <p className="text-body-5 font-medium text-metal-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    {item.isDeleted ? (
                      <Button
                        size="xs"
                        color="success"
                        variant="link"
                        onClick={() =>
                          handelUpdateManager(item._id, { isDeleted: false })
                        }
                      >
                        <ClockClockwise size={22} />
                        Restore
                      </Button>
                    ) : (
                      <Button
                        size="xs"
                        color="error"
                        variant="link"
                        onClick={() =>
                          handelUpdateManager(item._id, { isDeleted: true })
                        }
                      >
                        <Trash size={22} />
                        Delete
                      </Button>
                    )}
                  </Table.Cell>
                  {/* <Table.Cell>
                    <Button variant="outline" size="sm" shape="circle">
                      <DotsThreeOutline
                        size={15}
                        onClick={() => <DropdownComponent />}
                      />
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
