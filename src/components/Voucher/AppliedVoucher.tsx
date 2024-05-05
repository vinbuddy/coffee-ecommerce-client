import useCheckoutStore from "@/hooks/useCheckoutStore";
import { formatVNCurrency } from "@/lib/utils";
import { Chip } from "@nextui-org/react";

export default function AppliedVoucher() {
    const { voucher, clearVoucher } = useCheckoutStore();
    return (
        <Chip color="primary" variant="flat" onClose={() => clearVoucher()}>
            Giảm {formatVNCurrency(voucher?.discount_price || 0)}
        </Chip>
    );
}
