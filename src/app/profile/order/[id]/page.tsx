"use client";
import CartItem from "@/components/Cart/CartItem";
import OrderDetailStatusProgress from "@/components/Order/OrderDetailStatusProgress";
import { formatDateTime, formatVNCurrency, getOrderStatusColor } from "@/lib/utils";
import { IOrderInfo } from "@/types/order";
import { Card, CardBody, Chip, User } from "@nextui-org/react";
import { useMemo } from "react";
import useSWR from "swr";

export default function UserOrderDetailPage({ params }: { params: { id: string } }) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/${params?.id}`;
    const { data: orderData, isLoading, error, mutate } = useSWR(url);
    const order: IOrderInfo = orderData?.data;

    const totalItemPrice = useMemo(() => {
        return order?.order_items.reduce((acc, curr) => acc + Number(curr.order_item_price), 0);
    }, [order]);

    return (
        <>
            <div>
                {!isLoading && order && (
                    <div className="grid grid-cols-12 gap-7">
                        <section className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
                            <Card className="p-5 rounded-xl">
                                <CardBody>
                                    <div className="flex flex-wrap items-center justify-between mb-5 pb-5 border-b border-dashed">
                                        <h5 className="font-medium text-lg">#{order.id}</h5>

                                        <div className="w-full mt-3 sm:mt-0 sm:w-auto">
                                            <Chip color={getOrderStatusColor(order.order_status)} variant="flat">
                                                {order.order_status}
                                            </Chip>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="mb-3">
                                            Ngày đặt hàng:{" "}
                                            <span className="text-black/55 font-medium">
                                                {formatDateTime(order.order_date)}{" "}
                                            </span>
                                        </p>
                                        <p className="mb-3">
                                            Loại đơn hàng:{" "}
                                            <span className="text-black/55 font-medium capitalize">
                                                {order.order_type}
                                            </span>
                                        </p>
                                        <p>
                                            Phương thức thanh toán:{" "}
                                            <span className="text-black/55 font-medium">
                                                {order.payment_method === "cash"
                                                    ? "Tiền mặt"
                                                    : order.payment_method.toUpperCase()}
                                            </span>
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </section>
                        <section className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
                            <div className="grid grid-cols-12 gap-7 h-full">
                                <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 h-full">
                                    <Card className="p-5 rounded-xl h-full">
                                        <CardBody>
                                            <h4 className="text-xl font-bold mb-6">Thông tin giao hàng</h4>
                                            <div className="mb-5">
                                                <User
                                                    name={order.user_name}
                                                    description={order.email}
                                                    avatarProps={{
                                                        src: order.avatar || "",
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <p className="mb-3">
                                                    Địa chỉ:{" "}
                                                    <span className="text-black/55 font-medium">{order.address}</span>
                                                </p>
                                                <p className="mb-3">
                                                    Người nhận:{" "}
                                                    <span className="text-black/55 font-medium">
                                                        {order.receiver_name}
                                                    </span>
                                                </p>
                                                <p className="mb-3">
                                                    Số điện thoại:{" "}
                                                    <span className="text-black/55 font-medium">
                                                        {order.phone_number}
                                                    </span>
                                                </p>
                                                <p>
                                                    Ghi chú:
                                                    <span className="text-black/55 font-medium">
                                                        {order?.order_note}
                                                    </span>
                                                </p>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </section>
                                <section className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 h-full">
                                    <Card className="p-5 rounded-xl mb-7 h-full">
                                        <CardBody>
                                            <h4 className="text-xl font-bold mb-6">Trạng thái đơn hàng</h4>
                                            <div>
                                                <OrderDetailStatusProgress orderId={order.id} />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </section>
                            </div>
                        </section>
                        <section className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
                            <Card className="p-5 rounded-xl">
                                <CardBody>
                                    <h4 className="text-xl font-bold mb-6">Thông tin thanh toán</h4>
                                    <ul>
                                        {order.order_items.map((item) => (
                                            <CartItem
                                                isSelected={false}
                                                isDeleted={false}
                                                isEdited={false}
                                                cartItem={item}
                                                key={item.id}
                                            />
                                        ))}
                                    </ul>
                                    <ul className="mt-3">
                                        <li className="flex items-center justify-between py-4 border-b">
                                            <span className="text-sm">Thành tiền</span>
                                            <span>{formatVNCurrency(totalItemPrice)}</span>
                                        </li>
                                        <li className="flex items-center justify-between py-4 border-b">
                                            <span className="text-sm">Phí giao hàng</span>
                                            <span>{formatVNCurrency(order.shipping_cost)}</span>
                                        </li>
                                        <li className="flex items-center justify-between py-4 border-b">
                                            <span className="text-sm">Khuyến mãi</span>
                                            {order.voucher_id && (
                                                <Chip color="primary" variant="flat">
                                                    {order?.voucher_name}
                                                </Chip>
                                            )}
                                        </li>
                                        <li className="flex items-center justify-between pt-4">
                                            <span className="text-sm">Tổng thanh toán</span>
                                            <span className="text-primary">
                                                {formatVNCurrency(order.total_payment)}
                                            </span>
                                        </li>
                                    </ul>
                                </CardBody>
                            </Card>
                        </section>
                    </div>
                )}
            </div>
        </>
    );
}
