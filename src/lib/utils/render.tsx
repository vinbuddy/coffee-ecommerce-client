import { Chip } from "@nextui-org/react";
import { BiCheck, BiSolidBolt, BiTimeFive, BiXCircle } from "react-icons/bi";
import { MdDeliveryDining } from "react-icons/md";

export const renderChipOrderStatus = (status: string): React.ReactNode => {
    let color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
    let icon: React.ReactNode;

    switch (status) {
        case "Hoàn thành":
            color = "success";
            icon = <BiCheck />;
            break;
        case "Đang chờ":
            color = "default";
            icon = <BiTimeFive />;
            break;
        case "Đang xử lý":
            color = "secondary";
            icon = <BiSolidBolt />;
            break;
        case "Đang giao":
            color = "warning";
            icon = <MdDeliveryDining />;
            break;
        case "Đã hủy":
            color = "danger";
            icon = <BiXCircle />;
            break;

        default:
            break;
    }

    return (
        <Chip color={color} startContent={icon} variant="flat" className="px-2">
            {status}
        </Chip>
    );
};
