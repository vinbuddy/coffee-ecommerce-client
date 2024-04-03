"use client";
import { OrderWidgetIcon, SaleWidgetIcon, UserWigetIcon } from "@/assets/icons";
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    BarElement,
    registerables,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// ChartJS.register(...registerables);
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function DashboardPage(): React.ReactNode {
    // const revenueData = {
    //     labels: ["January", "February", "March", "April", "May", "June"],
    //     datasets: [
    //         {
    //             data: [1200, 1500, 1800, 1700, 2000, 2200], // Dữ liệu doanh thu cho mỗi tháng
    //             borderColor: "#333", // Màu viền của biểu đồ
    //             backgroundColor: (context: any) => {
    //                 const ctx = context.chart.ctx;
    //                 const gradient = ctx.createLinearGradient(0, 0, 0, 200);

    //                 gradient.addColorStop(0, "#a1c4fd"); // Màu gradient bắt đầu từ đỉnh
    //                 gradient.addColorStop(0.5, "#a1c4fd"); // Điểm chạm giữa gradient
    //                 gradient.addColorStop(1, "#c2e9fb"); // Màu gradient kết thúc ở đáy
    //                 return gradient;
    //             },
    //             tension: 0.3, // Độ căng của đường cong trong biểu đồ
    //             fill: "start", // Điểm bắt đầu vẽ gradient fill
    //             label: "Doanh thu", // Nhãn cho dataset này
    //         },
    //     ],
    // };
    // const revenueOptions = {
    //     plugins: {
    //         // legend: false
    //     },
    //     scales: {
    //         x: {
    //             grid: {
    //                 display: false,
    //             },
    //         },
    //         y: {
    //             grid: {
    //                 display: false,
    //             },
    //             beginAtZero: true,
    //         },
    //     },
    // };

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Online",
                backgroundColor: "#00E096", // Thay đổi màu của dataset 1 thành #00E096
                borderColor: "transparent",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(0,224,150,0.4)",
                hoverBorderColor: "transparent",
                data: [65, 59, 80, 81, 56, 55],
                borderRadius: 8,
            },
            {
                label: "Offline",
                backgroundColor: "#0095FF", // Thay đổi màu của dataset 2 thành #0095FF
                borderColor: "transparent",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
                hoverBorderColor: "transparent",
                data: [45, 67, 90, 72, 85, 60],
                borderRadius: 8,
            },
        ],
    };

    return (
        <div>
            <div className="grid grid-cols-12 gap-5">
                <section className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
                    {/* Widgets */}
                    <div className="rounded-xl">
                        <div className="grid grid-cols-12 gap-5">
                            <section className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
                                <div className="p-4 rounded-xl bg-[#F3E8FF]">
                                    <div className="inline-block p-2 bg-[#BF83FF] rounded-full">
                                        <SaleWidgetIcon />
                                    </div>
                                    <p className="font-semibold text-lg mt-3">
                                        2.000.000 VNĐ
                                    </p>

                                    <p className="text-[#425166] mt-2">
                                        Doanh thu hôm nay
                                    </p>
                                    <p className="text-[#4079ED] mt-2">
                                        +8% từ hôm qua
                                    </p>
                                </div>
                            </section>
                            <section className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
                                <div className="p-4 rounded-xl bg-[#FFF4DE]">
                                    <div className="inline-block p-2 bg-[#FF947A] rounded-full">
                                        <OrderWidgetIcon />
                                    </div>
                                    <p className="font-semibold text-lg mt-3">
                                        300
                                    </p>

                                    <p className="text-[#425166] mt-2">
                                        Đơn hàng hôm nay
                                    </p>
                                    <p className="text-[#4079ED] mt-2">
                                        +4% từ hôm qua
                                    </p>
                                </div>
                            </section>
                            <section className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
                                <div className="p-4 rounded-xl bg-[#DCFCE7]">
                                    <div className="inline-block p-2 bg-[#3CD856] rounded-full">
                                        <UserWigetIcon />
                                    </div>
                                    <p className="font-semibold text-lg mt-3">
                                        3
                                    </p>

                                    <p className="text-[#425166] mt-2">
                                        Khách hàng mới
                                    </p>
                                    <p className="text-[#4079ED] mt-2">
                                        +0.5% từ hôm qua
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>

                <section className="col-span-12 sm:col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-8 2xl:col-span-8">
                    <div className="rounded-xl border p-5">
                        <h4 className="font-medium text-xl">
                            Tổng các doanh thu
                        </h4>
                        <Bar
                            data={data}
                            options={{
                                scales: {
                                    x: {
                                        grid: {
                                            display: false,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
