import { Button, Image } from "@nextui-org/react";
import React from "react";

interface IProps {}

export default function VoucherItem({}: IProps): React.ReactNode {
    return (
        <div className="border flex bg-white shadow-md rounded-xl">
            <div className="p-4">
                <Image
                    className="w-[100px] h-[100px]"
                    src="https://minio.thecoffeehouse.com/image/admin/1704967095_copy-of-copy-of-coupon-mua1tang1.jpg"
                    alt="voucher image"
                />
            </div>
            <div className="relative border-l-4 border-dotted"></div>
            <div className="flex-1 border-dashed p-4">
                <h3 className="font-bold">Mua 1 tặng 1</h3>
                <p className="my-2 text-sm">Hết hạn trong 5 ngày</p>

                <div className="flex items-center">
                    <p className="text-[#0071e3] text-sm me-3"> Xem chi tiết</p>

                    <Button radius="full" size="sm" variant="flat" color="primary">
                        Sử dụng
                    </Button>
                </div>
            </div>
        </div>
    );
}
