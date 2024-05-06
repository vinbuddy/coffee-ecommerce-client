import { FaRegHandPointer } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { PiCookingPotBold } from "react-icons/pi";

export default function OrderStatusProgress() {
    return (
        <div>
            <div>
                <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                        <div>
                            <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                <FaRegHandPointer />
                            </div>
                        </div>
                        <div className="w-px h-full  border border-dashed" />
                    </div>
                    <div className="pt-1 pb-8">
                        <p className="mb-2 font-medium">Xác nhận đơn hàng</p>
                        <p className="text-gray-700">12:40 pm</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                        <div>
                            <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                <PiCookingPotBold />
                            </div>
                        </div>
                        <div className="w-px h-full  border border-dashed" />
                    </div>
                    <div className="pt-1 pb-8">
                        <p className="mb-2 font-medium">Chuẩn bị món</p>
                        <p className="text-gray-700">12:41 pm</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                        <div>
                            <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                <MdOutlineDeliveryDining className="text-lg" />
                            </div>
                        </div>
                        <div className="w-px h-full  border border-dashed" />
                    </div>
                    <div className="pt-1 pb-8">
                        <p className="mb-2 font-medium">Giao hàng</p>
                        <p className="text-gray-700">13:00 pm</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                        <div>
                            <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                <svg className="w-6 text-gray-600" stroke="currentColor" viewBox="0 0 24 24">
                                    <polyline
                                        fill="none"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        points="6,12 10,16 18,8"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="pt-1">
                        <p className="mb-2 font-medium">Hoàn thành</p>
                        <p className="text-gray-700">13: 10 pm</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
