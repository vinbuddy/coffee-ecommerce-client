import { Chip } from "@nextui-org/react";

import { formatVNCurrency } from "@/lib/utils";
import { useCheckoutStore } from "@/hooks";

export default function AppliedVoucher() {
    const { voucher, clearVoucher } = useCheckoutStore();
    return (
        <Chip color="primary" variant="flat" onClose={() => clearVoucher()}>
            Giảm {formatVNCurrency(voucher?.discount_price || 0)}
        </Chip>
    );
}
