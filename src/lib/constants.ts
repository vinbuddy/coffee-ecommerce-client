export const MOMO_MESSAGE: any = {
    "0": "Thành công.",
    "10": "Hệ thống đang được bảo trì. Vui lòng quay lại sau khi bảo trì được hoàn tất.",
    "11": "Truy cập bị từ chối. Cấu hình tài khoản doanh nghiệp không cho phép truy cập. Vui lòng xem lại các thông tin đăng ký và cấu hình trên M4B, hoặc liên hệ trực tiếp với MoMo để được điều chỉnh.",
    "12": "Phiên bản API không được hỗ trợ cho yêu cầu này. Vui lòng nâng cấp lên phiên bản mới nhất của cổng thanh toán, vì phiên bản bạn đang truy cập hiện không còn được hỗ trợ.",
    "13": "Xác thực doanh nghiệp thất bại. Vui lòng kiểm tra thông tin kết nối, bao gồm cả chữ ký mà bạn đang sử dụng, và đối chiếu với các thông tin được cung cấp từ M4B.",
    "20": "Yêu cầu sai định dạng. Vui lòng kiểm tra định dạng của yêu cầu, các biến thể, hoặc tham số còn thiếu.",
    "21": "Yêu cầu bị từ chối vì số tiền giao dịch không hợp lệ. Vui lòng kiểm tra số tiền hợp lệ và thực hiện lại yêu cầu.",
    "22": "Số tiền giao dịch không hợp lệ. Vui lòng kiểm tra nếu số tiền thanh toán nằm trong giới hạn quy định của yêu cầu thanh toán này. Đối với yêu cầu dạng capture, hãy kiểm tra số tiền capture có bằng với số tiền đã được xác nhận trước đó hay không.",
    "40": "RequestId bị trùng. Vui lòng thử lại với một requestId khác.",
    "41": "OrderId bị trùng. Vui lòng truy vấn trạng thái của orderId này, hoặc thử lại với một orderId khác.",
    "42": "OrderId không hợp lệ hoặc không được tìm thấy. Vui lòng thử lại với một orderId khác.",
    "43": "Yêu cầu bị từ chối vì xung đột trong quá trình xử lý giao dịch. Trước khi thử lại, vui lòng kiểm tra nếu có một giao dịch khác đang được xử lý có thể hạn chế yêu cầu này được tiếp nhận, hoặc orderId được sử dụng không phù hợp với yêu cầu này.",
    "45": "Trùng ItemId. Vui lòng kiểm tra và thử lại yêu cầu với ItemId duy nhất.",
    "47": "Yêu cầu bị từ chối vì thông tin không hợp lệ trong danh sách dữ liệu khả dụng. Vui lòng kiểm tra và thử lại với yêu cầu khác.",
    "99": "Lỗi không xác định. Vui lòng liên hệ MoMo để biết thêm chi tiết.",
    "1000": "Giao dịch đã được khởi tạo, chờ người dùng xác nhận thanh toán. Giao vẫn đang chờ người dùng xác nhận thanh toán; trạng thái của giao dịch sẽ được tự động thay đổi ngay sau khi người dùng xác nhận hoặc hủy thanh toán.",
    "1001": "Giao dịch thanh toán thất bại do tài khoản người dùng không đủ tiền.",
    "1002": "Giao dịch bị từ chối do nhà phát hành tài khoản thanh toán. Sự từ chối xảy ra khi thẻ được dùng để thanh toán hiện không còn khả dụng, hoặc kết nối đến hệ thống của nhà phát hành thẻ bị gián đoạn. Vui lòng tạm thời sử dụng phương thức thanh toán khác.",
    "1003": "Giao dịch bị đã bị hủy. Giao dịch bị hủy bởi doanh nghiệp hoặc bởi trình xử lý timeout của MoMo. Vui lòng đánh dấu giao dịch này đã bị hủy (giao dịch thất bại).",
    "1004": "Giao dịch thất bại do số tiền thanh toán vượt quá hạn mức thanh toán của người dùng. Vui lòng đánh dấu giao dịch này thất bại, và thử lại vào một khoảng thời gian khác.",
    "1005": "Giao dịch thất bại do url hoặc QR code đã hết hạn. Vui lòng gửi lại một yêu cầu thanh toán khác.",
    "1006": "Giao dịch thất bại do người dùng đã từ chối xác nhận thanh toán.",
    "1007": "Giao dịch bị từ chối vì tài khoản không tồn tại hoặc đang ở trạng thái ngưng hoạt động. Vui lòng đảm bảo trạng thái tài khoản phải được kích hoạt/ đã xác thực trước khi thực hiện lại hoặc liên hệ MoMo để được hỗ trợ.",
    "1017": "Giao dịch bị hủy bởi đối tác.",
    "1026": "Giao dịch bị hạn chế theo thể lệ chương trình khuyến mãi. Vui lòng liên hệ MoMo để biết thêm chi tiết.",
    "1080": "Giao dịch hoàn tiền thất bại trong quá trình xử lý. Vui lòng thử lại trong khoảng thời gian ngắn, tốt hơn là sau một giờ. Vui lòng kiểm tra nếu orderId hoặc transId được dùng trong yêu cầu này là chính xác, sau đó thử lại yêu cầu hoàn tiền (khuyến khích thử lại sau một giờ đối với giao dịch thanh toán được thực hiện hơn một tháng trước).",
    "1081": "Giao dịch hoàn tiền bị từ chối. Giao dịch thanh toán ban đầu có thể đã được hoàn. Vui lòng kiểm tra nếu giao dịch thanh toán ban đầu đã được hoàn thành công, hoặc số tiền hoàn vượt quá số tiền cho phép hoàn của giao dịch thanh toán ban đầu.",
    "2019": "Yêu cầu bị từ chối vì orderGroupId không hợp lệ. Vui lòng liên hệ MoMo để biết thêm chi tiết.",
    "4001": "Giao dịch bị hạn chế do người dùng chưa hoàn tất xác thực tài khoản.",
    "4100": "Giao dịch thất bại do người dùng không đăng nhập thành công.",
    "7000": "Giao dịch đang được xử lý. Vui lòng chờ giao dịch được xử lý hoàn tất.",
    "7002": "Giao dịch đang được xử lý bởi nhà cung cấp loại hình thanh toán. Vui lòng chờ giao dịch được xử lý. Kết quả giao dịch sẽ được thông báo ngay khi được xử lý hoàn tất.",
    "9000": "Giao dịch đã được xác nhận thành công. Đối với thanh toán 1 bước (autoCapture=1), đây có thể xem như giao dịch thanh toán đã thành công. Đối với thanh toán 2 bước (autoCapture=0), vui lòng thực hiện tiếp yêu cầu capture hoặc cancel. Đối với liên kết, vui lòng tiến hành yêu cầu lấy recurring token.",
};

export const VNPAY_MESSAGE: any = {
    "00": "Giao dịch thành công",
    "07": "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).",
    "09": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
    "10": "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
    "11": "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.",
    "12": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.",
    "13": "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.",
    "24": "Giao dịch không thành công do: Khách hàng hủy giao dịch",
    "51": "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
    "65": "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
    "75": "Ngân hàng thanh toán đang bảo trì.",
    "79": "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch",
    "99": "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)",
};

export const SHIPPING_COST: number = 18000;