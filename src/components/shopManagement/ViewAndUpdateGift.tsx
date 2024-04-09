import { ModalComponent } from "@/components/reusesable/ModalComponent";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
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
  Eye,
  Gift,
  Lock,
  Pen,
  Pencil,
  Trash,
  TrashSimple,
  X,
} from "phosphor-react";
import { ReactElement, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ViewAndUpdateGift({
  textContent,
  productData,
}: // element,
{
  textContent: string;
  productData: TProduct;
  // element: ReactElement;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { ...productData },
  });
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const updateGift: SubmitHandler<Partial<TProduct>> = async (data) => {
    console.log("addGift raw data=>", data);

    const payload: Partial<TProduct> = {};
    data.name ? (payload.name = data.name) : null;
    data.quantity ? (payload.quantity = Number(data.quantity)) : null;
    data.price ? (payload.price = Number(data.price)) : null;
    data.category ? (payload.category = data.category) : null;
    data.brand ? (payload.brand = data.brand) : null;
    data.occasion ? (payload.occasion = data.occasion) : null;
    data.recipient ? (payload.recipient = data.recipient) : null;
    data.theme ? (payload.theme = data.theme) : null;
    const response = await updateProduct({ id: data._id, payload }).unwrap();
    // const newProduct = await response.json();
    console.log("response=>", response);
    if (response.statusCode >= 200 && response.statusCode <= 299) {
      setIsModalOpen(false);
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }
  };
  const deleteGift = async (id: string) => {
    console.log("delete gift=>", id);
    const response = await deleteProduct(id).unwrap();
    console.log("response=>", response);
    if (response.statusCode >= 200 && response.statusCode <= 299) {
      setIsModalOpen(false);
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      <ModalComponent
        // buttonText="Update Gift"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        visibleElement={
          <p
            onClick={() => setIsModalOpen(true)}
            className="-mb-0.5 text-body-4 font-medium text-blue-600 hover:underline cursor-pointer"
          >
            {textContent}
          </p>
        }
      >
        <div className="flex gap-2 m-2 flex-row-reverse">
          <Button
            color="secondary"
            shape="circle"
            onClick={() => {
              setIsModalOpen(false);
              setIsUpdateModal(false);
            }}
          >
            <X size={20} />
            {/* Close button */}
          </Button>
          <Button
            color="secondary"
            shape="circle"
            onClick={() => deleteGift(productData._id)}
          >
            <TrashSimple size={20} />
          </Button>
          <Button
            color="secondary"
            shape="circle"
            onClick={() => setIsUpdateModal(true)}
          >
            <Pen size={20} />
          </Button>
        </div>
        <form
          className="mx-auto max-w-lg space-y-2 rounded-xl  p-3  border bottom-1"
          onSubmit={handleSubmit(updateGift)}
        >
          <div className="grid grid-cols-2 gap-4">
            <fieldset className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <Input
                  placeholder="Enter gift name"
                  className="ps-11"
                  {...register("name", { required: true })}
                  disabled={isUpdateModal ? false : true}
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
                  disabled={isUpdateModal ? false : true}
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
                  disabled={isUpdateModal ? false : true}
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
                  disabled={isUpdateModal ? false : true}
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
                  disabled={isUpdateModal ? false : true}
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
                  disabled={isUpdateModal ? false : true}
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
                  disabled={isUpdateModal ? false : true}
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
                  disabled={isUpdateModal ? false : true}
                />
                <Icon>
                  <Cake size={15} color="#AFBACA" />
                </Icon>
              </div>
            </fieldset>
          </div>
          {isUpdateModal && (
            <Button size="sm" color="secondary" type="submit">
              Update
            </Button>
          )}
        </form>
      </ModalComponent>
    </div>
  );
}
