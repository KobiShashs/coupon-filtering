import "./AllCoupons.css";
import { useEffect, useState } from "react";

import "./AllCoupons.css";
import { CouponModel } from "../../Models/beans";
import axios from "axios";
import CouponCard from "../CouponCard/CouponCard";

function AllCoupons(): JSX.Element {


    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
    const [selectedPrice, setSelectedPrice] = useState<number>(1000);
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [filterCoupons, setFilterCoupons] = useState<CouponModel[]>([]);

    // Define All filter a head
    const filteredNone = coupons;
    const filteredByPrice = coupons.filter(coupon => coupon.price <= selectedPrice);
    const filteredByCategory = coupons.filter(coupon => { return coupon.category === selectedCategory; });
    const filteredBoth = coupons
        .filter(coupon => coupon.price <= selectedPrice)
        .filter(coupon => coupon.category === selectedCategory);

    const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setSelectedCategory(selected);

    };

    const onChangePrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        let price = 1000;
        if (selected !== "ALL") {
            price = +selected;
        }
        setSelectedPrice(price);
    };

    // Mounting
    useEffect(() => {
        axios.get<CouponModel[]>("https://raw.githubusercontent.com/KobiShashs/stam3/main/rotem")
            .then((res) => {
                setFilterCoupons(res.data)
                setCoupons(res.data)
            })
            .catch((err) => console.log(err));
    }, []);

    // UnMounting
    useEffect(() => {

        if (selectedCategory === "ALL" && selectedPrice === 1000) {
            setFilterCoupons(filteredNone);
            return;
        }
        if (selectedCategory === "ALL" && selectedPrice < 1000) {
            setFilterCoupons(filteredByPrice);
            return;
        }
        if (selectedCategory !== "ALL" && selectedPrice === 1000) {
            setFilterCoupons(filteredByCategory);
            return;
        }
        if (selectedCategory !== "ALL" && selectedPrice < 1000) {
            setFilterCoupons(filteredBoth);
            return;
        }

    }, [selectedCategory, selectedPrice]);

    return (
        <div className="AllCoupons">
            <h3>All coupons</h3>
            <div>
                <button className="addButton" onClick={() => { }}>
                    Add new coupon
                </button>
            </div><br />
            <div>
                <select className="row" onChange={onChangeCategory} value={selectedCategory}>
                    <option disabled value={""}>Filter by category...</option>
                    <option value={"ALL"}>All</option>
                    <option value={"FOOD"}>Food</option>
                    <option value={"ELECTRICITY"}>Electricity</option>
                    <option value={"RESTAURANT"}>Restaurant</option>
                    <option value={"VACATION"}>Vacation</option>
                </select>
            </div>
            <div>
                <select className="row" onChange={onChangePrice} value={selectedPrice}>
                    <option value={"ALL"}>Filter by max price...</option>
                    <option value={"ALL"}>All</option>
                    <option value={"100"}>100</option>
                    <option value={"200"}>200</option>
                    <option value={"300"}>300</option>
                    <option value={"400"}>400</option>
                    <option value={"500"}>500</option>
                    <option value={"600"}>600</option>
                    <option value={"700"}>700</option>
                    <option value={"800"}>800</option>
                </select>
            </div>
            <div className="row">
                {filterCoupons.length > 0 ? (
                    <>
                        {filterCoupons.map((coupon) => (
                            <CouponCard key={coupon.id} coupon={coupon} />
                        ))}
                    </>
                ) : (
                    <p>NO COUPON YET..</p>
                )}
            </div>
        </div>
    );
}

export default AllCoupons;
