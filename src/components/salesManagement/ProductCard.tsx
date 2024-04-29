/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TProduct } from "@/types";
import { Button, Card, Icon, Input, Label, Tooltip } from "keep-react";
import {
  ArrowCircleRight,
  Calendar,
  CurrencyCircleDollar,
  Equals,
  Gift,
} from "phosphor-react";
import { ModalComponent } from "@/components/reusesable/ModalComponent";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMarkAsSaleMutation } from "@/redux/features/sale/saleApi";
import { toast } from "sonner";
import moment from "moment";

type TSalePayload = {
  quantity: number;
  buyerName: string;
  dateOfSale: string;
};

export const ProductCard = ({ product }: { product: TProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit, register, reset } = useForm<TSalePayload>({
    defaultValues: {
      dateOfSale: moment().format("YYYY-MM-DD"),
    },
  });
  const [markAsSaleSubmit] = useMarkAsSaleMutation();
  const saleHandler: SubmitHandler<TSalePayload> = async (data) => {
    console.log("saleHandler=>", data);
    data.quantity = Number(data.quantity);
    // data.dateOfSale = new Date(data.dateOfSale).toISOString();
    console.log("dateOfSale=>", data.dateOfSale);
    if (data.quantity > product.quantity || data.quantity <= 0) {
      toast.error("Invalid Quantity");
    }
    try {
      const response = await markAsSaleSubmit({
        productId: product._id,
        payload: data,
      }).unwrap();
      // const newProduct = await response.json();
      console.log("response=>", response);
      if (response.statusCode >= 200 && response.statusCode <= 299) {
        setIsModalOpen(false);
        toast.success(response.message);
        reset();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      // console.log("error=>", error);
      toast.error((error?.data?.message as string) || "Something went wrong!");
    }
  };
  return (
    <Card className="shadow-sm hover:shadow-2xl">
      <Card.Header>
        {/* <img
          src="https://via.placeholder.com/100x100"
          alt="image"
          width={200}
          height={200}
        /> */}
      </Card.Header>
      <Card.Content className="space-y-3 p-4">
        <Tooltip
          content={product.name}
          trigger="hover"
          placement="right"
          animation="duration-300"
          style="dark"
        >
          <Card.Title className="text-lg">
            {product.name.slice(0, 20)}
          </Card.Title>
        </Tooltip>

        <Card.Description className="px-4">
          <p className="flex content-center items-center">
            <CurrencyCircleDollar size={18} className="mr-1" />
            {product.price}
          </p>
          <p className="flex content-center items-center">
            <Gift size={18} className="mr-1" />
            {product.quantity}
          </p>
          <p>Occasion: {product.occasion}</p>
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          <p>Recipient: {product.recipient}</p>
          <p>Theme: {product.theme}</p>
        </Card.Description>
        <ModalComponent
          // buttonText="Add Gift"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          visibleElement={
            <Button
              variant="outline"
              size="sm"
              color="primary"
              className="p-2 rounded-xl"
              onClick={() => setIsModalOpen(true)}
            >
              Sell
              <ArrowCircleRight size={22} className="pl-2" />
            </Button>
          }
        >
          <form
            className="mx-auto max-w-lg space-y-2 rounded-lg  p-3"
            onSubmit={handleSubmit(saleHandler)}
          >
            <div className="bg-slate-400 text-white text-center rounded-xl">
              <h6>{product.name}</h6>
              <h5>Stock:{product.quantity}</h5>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <fieldset className="space-y-1">
                <Label htmlFor="quantity">Quantity</Label>
                <div className="relative">
                  <Input
                    id="quantity"
                    placeholder="Enter quantity of Gift"
                    type="number"
                    className="ps-11"
                    max={product.quantity}
                    min={1}
                    {...register("quantity", { required: true, min: 1 })}
                  />
                  <Icon>
                    <Equals size={15} color="#AFBACA" />
                  </Icon>
                </div>
              </fieldset>
              <fieldset className="space-y-1">
                <Label htmlFor="buyerName">Buyer Name</Label>
                <div className="relative">
                  <Input
                    placeholder="Enter buyer name"
                    className="ps-11"
                    {...register("buyerName", { required: true })}
                  />
                  <Icon>
                    <Gift size={15} color="#AFBACA" />
                  </Icon>
                </div>
              </fieldset>
              <fieldset className="space-y-1">
                <Label htmlFor="dateOfSale">Date of sale</Label>
                <div className="relative">
                  <Input
                    type="date"
                    max={moment().format("YYYY-MM-DD")}
                    placeholder="Chose date of sale"
                    className="ps-11"
                    {...register("dateOfSale", { required: true })}
                    // defaultValue={ moment().format("YYYY-MM-DD")}
                  />
                  <Icon>
                    <Calendar size={15} color="#AFBACA" />
                  </Icon>
                </div>
              </fieldset>
            </div>
            <div className="flex justify-around">
              <Button
                size="sm"
                color="secondary"
                type="submit"
                className="text-center"
              >
                Submit
              </Button>
            </div>
          </form>
        </ModalComponent>
      </Card.Content>
    </Card>
  );
};
