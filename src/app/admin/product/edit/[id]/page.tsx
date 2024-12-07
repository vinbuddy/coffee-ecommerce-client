"use client";
import React, { useEffect, useState } from "react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Input, Select, SelectItem, Textarea, Image, Button, Chip, Spinner } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { LuUpload } from "react-icons/lu";

import Breadcrumbs, { IBreadcumbItem } from "@/components/UI/Breadcumbs";
import productPlaceholder from "@/assets/images/product-placeholder.png";
import { storage } from "@/config/firebase";
import { formatVNCurrency } from "@/lib/utils";
import { ICategory, ITopping, ISize, IAddProduct, IProductSize, IProductTopping } from "@/types";
import { useLoading } from "@/hooks";

const breadcumbItems: IBreadcumbItem[] = [
    {
        content: "Trang chủ",
        href: "/admin",
    },
    {
        content: "Sản phẩm",
        href: "/admin/product",
    },
    {
        content: "Chỉnh sửa sản phẩm",
        href: "/admin/product/edit/#",
    },
];

interface IEditProductForm {
    name: string;
    price: string | number;
    description: string;
    image: string;
    status: string | number;
    category_id: number;
    product_toppings: number[];
    product_sizes: any[];
}

export default function AdminEditProductPage({ params }: { params: { id: string } }): React.ReactNode {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IEditProductForm>();

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [toppings, setToppings] = useState<ITopping[]>([]);
    const [sizes, setSizes] = useState<ISize[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string>("");
    const [sizePrice, setSizePrice] = useState<string | number>("");
    const [sizeId, setSizeId] = useState<string | number>("");

    const [product, setProduct] = useState<IAddProduct>({
        name: "",
        price: "",
        status: 1,
        description: "",
        category_id: 0,
        image: "",
        product_toppings: [],
        product_sizes: [],
    });

    const [productSizes, setProductSizes] = useState<IProductSize[]>([]);
    const [productToppings, setProductToppings] = useState<IProductTopping[]>([]);

    const { loading, startLoading, stopLoading } = useLoading();
    const {
        loading: productLoading,
        startLoading: startProductLoading,
        stopLoading: stopProductLoading,
    } = useLoading();

    useEffect(() => {
        (async () => {
            try {
                startProductLoading();
                let [productData, categoryData, toppingData, sizeData, productToppingData, productSizeData] =
                    await Promise.all([
                        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${params.id}`, {
                            method: "GET",
                        }).then((res) => res.json()),
                        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`, {
                            method: "GET",
                        }).then((res) => res.json()),
                        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topping`, {
                            method: "GET",
                        }).then((res) => res.json()),
                        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/size`, {
                            method: "GET",
                        }).then((res) => res.json()),
                        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/product-toppings/${params.id}`, {
                            method: "GET",
                        }).then((res) => res.json()),
                        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/product-sizes/${params.id}`, {
                            method: "GET",
                        }).then((res) => res.json()),
                    ]);

                setCategories(categoryData.data);
                setToppings(toppingData.data);
                setSizes(sizeData.data);
                setProduct((prev) => ({
                    ...prev,
                    ...productData.data,
                }));
                setProductToppings(productToppingData.data);
                setProductSizes(productSizeData.data);

                console.table(toppingData.data);
                console.table(sizeData.data);

                // init product size, toppings
                if (!productSizeData?.data || !productToppingData?.data) return;

                let _productToppings: any = [];
                for (let topping of productToppingData.data) {
                    _productToppings.push(Number(topping.id));
                }

                setProduct((prev) => {
                    return {
                        ...prev,
                        product_toppings: _productToppings,
                    };
                });

                let _productSizes: any = [];
                for (let size of productSizeData.data) {
                    _productSizes.push({
                        size_id: Number(size.size_id),
                        size_price: Number(size.size_price),
                    });
                }

                setProduct((prev) => {
                    return {
                        ...prev,
                        product_sizes: _productSizes,
                    };
                });
            } catch (error) {
                console.log("error: ", error);
                toast.error("Có lỗi xảy ra, vui lòng thử lại sau", { position: "bottom-center" });
            } finally {
                stopProductLoading();
            }
        })();
    }, []);

    useEffect(() => {
        // Khi product thay đổi, cập nhật giá trị của input
        setValue("name", product.name);
        setValue("price", Number(product.price).toString());
        setValue("description", product.description);
        setValue("category_id", product.category_id);
        setValue("status", product.status.toString());
        setValue("image", product.image);
    }, [
        product.category_id,
        product.description,
        product.image,
        product.name,
        product.price,
        product.status,
        setValue,
    ]);

    useEffect(() => {
        return () => {
            previewImage && URL.revokeObjectURL(previewImage);
        };
    }, [imageFile]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSelectTopping = (toppingId: number | string): void => {
        setProduct((prev) => {
            const index = prev.product_toppings.indexOf(Number(toppingId));

            // If toppingId exists, remove it from the array
            if (index !== -1) {
                return {
                    ...prev,
                    product_toppings: prev.product_toppings.filter((id) => id !== Number(toppingId)),
                };
            }

            // If toppingId doesn't exist, add it to the array
            return {
                ...prev,
                product_toppings: [...prev.product_toppings, Number(toppingId)],
            };
        });

        setSizePrice("");
        setSizeId("");
    };

    const handleRemoveSize = (sizeId: number | string): void => {
        setProduct((prev) => {
            const exists = prev.product_sizes.some((item) => item.size_id === Number(sizeId));

            // If sizeId exists, remove it from the array
            if (exists) {
                return {
                    ...prev,
                    product_sizes: prev.product_sizes.filter((productSize) => productSize.size_id !== Number(sizeId)),
                };
            }

            return prev;
        });
    };

    const handleSelectSize = (): void => {
        setProduct((prev) => {
            return {
                ...prev,
                product_sizes: [...prev.product_sizes, { size_id: Number(sizeId), size_price: Number(sizePrice) }],
            };
        });

        setSizePrice("");
    };

    const editProduct = async (data: IAddProduct, e?: React.BaseSyntheticEvent): Promise<void> => {
        e?.preventDefault();
        if (!product) return;

        try {
            startLoading();

            let productImageURL: null | string = null;

            if (imageFile) {
                // Remove image from firebase storage
                await deleteObject(ref(storage, product.image));

                const productImageRef = ref(storage, `images/product/${Date.now()}${imageFile.name}`);
                await uploadBytes(productImageRef, imageFile);
                productImageURL = await getDownloadURL(productImageRef);
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    ...product,
                    image: productImageURL ?? product.image,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const resData = await response.json();

            if (resData.status === 200) {
                toast.success("Chỉnh sửa sản phẩm thành công", {
                    position: "bottom-center",
                });
                startTransition(() => router.push("/admin/product"));
                startTransition(() => router.refresh());
            } else {
                throw new Error(resData.message);
            }
        } catch (error: any) {
            // alert(error.message);
            toast.error(error.message, { position: "bottom-center" });
        } finally {
            stopLoading();
        }
    };

    return (
        <div>
            <div className="mb-7">
                <Breadcrumbs breadcumbItems={breadcumbItems} />
            </div>

            {productLoading && (
                <div className="flex justify-center">
                    <Spinner color="default" size="lg" />
                </div>
            )}

            {!productLoading && (
                <form onSubmit={handleSubmit(editProduct)}>
                    <div className="grid grid-cols-12 gap-5 h-full">
                        <section className="col-span-12 sm:col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-8 2xl:col-span-8">
                            <div className="rounded-xl p-5">
                                <h4 className="text-xl font-bold mb-6">Thông tin tổng quan</h4>
                                <div className="grid grid-cols-12 gap-5">
                                    <section className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
                                        <Input
                                            type="text"
                                            label="Tên sản phẩm"
                                            {...register("name", {
                                                required: true,
                                                maxLength: 50,
                                            })}
                                            value={product?.name.toString()}
                                            onValueChange={(value) =>
                                                setProduct((prev) => ({
                                                    ...prev,
                                                    name: value,
                                                }))
                                            }
                                        />

                                        {errors?.name?.type === "required" && (
                                            <p className="text-red-500 mt-3">Hãy nhập tên cho sản phẩm</p>
                                        )}
                                        {errors?.name?.type === "maxLength" && (
                                            <p className="text-red-500 mt-3">Tên sản phẩm tối đa 50 ký tự</p>
                                        )}
                                    </section>
                                    <section className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                                        <Input
                                            type="number"
                                            label="Giá sản phẩm"
                                            min={0}
                                            {...register("price", {
                                                required: true,
                                            })}
                                            value={Number(product?.price).toString() || ""}
                                            onValueChange={(value) =>
                                                setProduct((prev) => ({
                                                    ...prev,
                                                    price: value,
                                                }))
                                            }
                                        />

                                        {errors?.price?.type === "required" && (
                                            <p className="text-red-500 mt-3">Hãy nhập giá cho sản phẩm</p>
                                        )}
                                    </section>
                                    <section className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                                        <Select
                                            aria-label="Chọn trạng thái"
                                            label="Chọn trạng thái"
                                            selectedKeys={[product?.status?.toString() || "1"]}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                setProduct((prev) => ({
                                                    ...prev,
                                                    status: Number(e.target.value),
                                                }));
                                            }}
                                        >
                                            <SelectItem variant="flat" key="1" value="1">
                                                Còn
                                            </SelectItem>
                                            <SelectItem variant="flat" key="0" value="0">
                                                Hết
                                            </SelectItem>
                                        </Select>
                                    </section>
                                    <section className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
                                        <Textarea
                                            type="text"
                                            label="Nhập mô tả cho sản phẩm"
                                            {...register("description", {
                                                required: true,
                                            })}
                                            value={product?.description}
                                            onValueChange={(value) => {
                                                setProduct((prev) => ({
                                                    ...prev,
                                                    description: value,
                                                }));
                                            }}
                                        />
                                        {errors?.description?.type === "required" && (
                                            <p className="text-red-500 mt-3">Hãy nhập mô tả cho sản phẩm</p>
                                        )}
                                    </section>
                                </div>
                            </div>
                            <div className="rounded-xl p-5 mt-5">
                                <h4 className={`text-xl font-bold ${product.product_toppings.length > 0 && "mb-6"}`}>
                                    Chọn topping
                                </h4>
                                <div className=" flex gap-3">
                                    {product.product_toppings &&
                                        product.product_toppings.map((topping, index) => {
                                            const matchedTopping = toppings.find((_topping) => _topping.id == topping);

                                            if (matchedTopping) {
                                                return (
                                                    <Chip
                                                        key={index}
                                                        onClose={() => handleSelectTopping(topping)}
                                                        variant="bordered"
                                                    >
                                                        <>
                                                            {matchedTopping?.topping_name} (+
                                                            {formatVNCurrency(matchedTopping?.topping_price || 0)} )
                                                        </>
                                                    </Chip>
                                                );
                                            }
                                        })}
                                </div>

                                <div className="mt-4">
                                    <Select
                                        placeholder="Chọn topping"
                                        size="lg"
                                        className="max-w-xs"
                                        selectedKeys={[]}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                            handleSelectTopping(e.target.value)
                                        }
                                    >
                                        {toppings.map((topping) => (
                                            <SelectItem key={topping?.id?.toString() || ""} value={topping?.id}>
                                                {topping.topping_name} (+
                                                {formatVNCurrency(topping.topping_price || 0)} )
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="rounded-xl p-5 mt-5">
                                <h4 className={`text-xl font-bold ${product.product_sizes.length > 0 && "mb-6"}`}>
                                    Chọn size
                                </h4>
                                <div className="mb-4 flex gap-3">
                                    {product.product_sizes.map((size, index) => {
                                        const matchedSize = sizes.find((_size) => _size.id === size.size_id);
                                        return (
                                            <Chip
                                                key={index}
                                                onClose={() => handleRemoveSize(size.size_id)}
                                                variant="bordered"
                                            >
                                                {matchedSize?.size_name} (+
                                                {formatVNCurrency(size?.size_price || 0)} )
                                            </Chip>
                                        );
                                    })}
                                </div>

                                <div className="flex gap-5">
                                    <Select
                                        aria-label="Chọn size"
                                        placeholder="Chọn size"
                                        size="lg"
                                        className="max-w-xs"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                            setSizeId(e.target.value)
                                        }
                                    >
                                        {sizes.map((size) => (
                                            <SelectItem key={size?.id} value={size.id}>
                                                {size.size_name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Input
                                        value={sizePrice.toString()}
                                        type="number"
                                        size="lg"
                                        placeholder="Giá của size"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setSizePrice(e.target.value)
                                        }
                                    />
                                    <Button size="lg" variant="bordered" radius="md" onClick={handleSelectSize}>
                                        Thêm
                                    </Button>
                                </div>
                            </div>
                        </section>

                        {/* Image, Category */}
                        <section className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
                            <div className="rounded-xl p-5">
                                <h4 className="text-xl font-bold mb-6">Danh mục</h4>

                                <div>
                                    <Select
                                        label="Chọn Danh mục"
                                        aria-label="Chọn danh mục"
                                        selectedKeys={[product?.category_id?.toString() || categories[0].id.toString()]}
                                        {...register("category_id", {
                                            required: true,
                                            onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                                                setProduct((prev) => ({
                                                    ...prev,
                                                    category_id: Number(e.target.value),
                                                })),
                                        })}
                                    >
                                        {categories.map((category, index) => (
                                            <SelectItem variant="flat" key={category?.id} value={category?.id}>
                                                {category?.category_name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    {errors?.category_id?.type === "required" && (
                                        <p className="text-red-500 mt-3">Chọn danh mục cho sản phẩm</p>
                                    )}
                                </div>
                            </div>
                            <div className="rounded-xl p-5 mt-5">
                                <h4 className="text-xl font-bold mb-6">Hình ảnh sản phẩm</h4>
                                <Image src={previewImage || product?.image || productPlaceholder.src} alt="" />

                                <input
                                    hidden
                                    type="file"
                                    id="product-image"
                                    accept="image/png, image/jpeg"
                                    // {...register("image", {
                                    //     required: true,
                                    //     onChange: handleImageUpload,
                                    // })}
                                />

                                <Button
                                    as="label"
                                    htmlFor="product-image"
                                    endContent={<LuUpload />}
                                    fullWidth
                                    className="bg-transparent border-2 border-dashed mt-4"
                                >
                                    Tải hình ảnh lên
                                </Button>
                                {errors?.image?.type === "required" && (
                                    <p className="text-red-500 mt-3">Chọn hình ảnh cho sản phẩm</p>
                                )}
                            </div>
                        </section>
                    </div>

                    <div className="rounded-xl p-5">
                        <Button isLoading={loading} type="submit" fullWidth size="lg" className="bg-black text-white">
                            Chỉnh sửa sản phẩm
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
