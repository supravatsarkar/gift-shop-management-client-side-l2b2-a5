import { ModalComponent } from "@/components/reusesable/ModalComponent";
import { useAddProductMutation } from "@/redux/features/product/productApi";
import { TProduct } from "@/types";
import {
  Avatar,
  Badge,
  Button,
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
} from "phosphor-react";
import { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddGift() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addProduct, { data, isError, isLoading }] = useAddProductMutation();
  console.log({ data, isError, isLoading });

  const addGift: SubmitHandler<Partial<TProduct>> = async (data) => {
    console.log("addGift raw data=>", data);
    data.quantity = Number(data.quantity);
    data.price = Number(data.price);
    const response = await addProduct(data).unwrap();
    // const newProduct = await response.json();
    console.log("response=>", response);
    if (response.statusCode >= 200 && response.statusCode <= 299) {
      setIsModalOpen(false);
      toast.success(response.message);
      reset();
    } else {
      toast.message(response.message);
    }
  };

  return (
    <div>
      <ModalComponent
        // buttonText="Add Gift"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        visibleElement={
          <Button
            onClick={() => setIsModalOpen(true)}
            className="rounded-[10px]"
          >
            <span className="pr-2">
              <Gift size={24} />
            </span>
            Add Gift
          </Button>
        }
      >
        <form
          className="mx-auto max-w-lg space-y-2 rounded-lg  p-3  "
          onSubmit={handleSubmit(addGift)}
        >
          <div className="grid grid-cols-2 gap-4">
            <fieldset className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <Input
                  placeholder="Enter gift name"
                  className="ps-11"
                  {...register("name", { required: true })}
                />
                <Icon>
                  <Gift size={15} color="#AFBACA" />
                </Icon>
              </div>
            </fieldset>
            <fieldset className="space-y-1">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <Input
                  id="price"
                  placeholder="Enter Price of Gift"
                  type="decimal"
                  className="ps-11"
                  {...register("price", { required: true, min: 1 })}
                />
                <Icon>
                  <CurrencyDollar size={15} color="#AFBACA" />
                </Icon>
              </div>
            </fieldset>
            <fieldset className="space-y-1">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="relative">
                <Input
                  id="quantity"
                  placeholder="Enter quantity of Gift"
                  type="number"
                  className="ps-11"
                  {...register("quantity", { required: true, min: 1 })}
                />
                <Icon>
                  <Equals size={15} color="#AFBACA" />
                </Icon>
              </div>
            </fieldset>
            <fieldset className="space-y-1">
              <Label htmlFor="occasion">Occasion</Label>
              <div className="relative">
                <Input
                  id="occasion"
                  placeholder="Enter occasion name of gift"
                  type="text"
                  className="ps-11"
                  {...register("occasion", { required: true })}
                />
                <Icon>
                  <Cake size={15} color="#AFBACA" />
                </Icon>
              </div>
            </fieldset>
            <fieldset className="space-y-1">
              <Label htmlFor="recipient">Recipient</Label>
              <div className="relative">
                <Input
                  id="recipient"
                  placeholder="Enter occasion name of gift"
                  type="text"
                  className="ps-11"
                  {...register("recipient", { required: true })}
                />
                <Icon>
                  <Cake size={15} color="#AFBACA" />
                </Icon>
              </div>
            </fieldset>
            <fieldset className="space-y-1">
              <Label htmlFor="category">Category</Label>
              <div className="relative">
                <Input
                  id="category"
                  placeholder="Enter category name of gift"
                  type="text"
                  className="ps-11"
                  {...register("category", { required: true })}
                />
                <Icon>
                  <Cake size={15} color="#AFBACA" />
                </Icon>
              </div>
            </fieldset>
            <fieldset className="space-y-1">
              <Label htmlFor="theme">Theme</Label>
              <div className="relative">
                <Input
                  id="theme"
                  placeholder="Enter theme name of gift"
                  type="text"
                  className="ps-11"
                  {...register("theme", { required: true })}
                />
                <Icon>
                  <Cake size={15} color="#AFBACA" />
                </Icon>
              </div>
            </fieldset>
            <fieldset className="space-y-1">
              <Label htmlFor="brand">Brand</Label>
              <div className="relative">
                <Input
                  id="brand"
                  placeholder="Enter brand name of gift"
                  type="text"
                  className="ps-11"
                  {...register("brand", { required: true })}
                />
                <Icon>
                  <Cake size={15} color="#AFBACA" />
                </Icon>
              </div>
            </fieldset>
          </div>
          <Button size="sm" color="secondary" type="submit">
            Submit
          </Button>
        </form>
      </ModalComponent>
    </div>
  );
}
