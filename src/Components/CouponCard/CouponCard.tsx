import "./CouponCard.css";

import { FaTrash, FaEdit } from "react-icons/fa";
import "./CouponCard.css";
import { CouponModel } from "../../Models/beans";

interface couponCardProps{
    coupon:CouponModel;
}

function CouponCard(props:couponCardProps): JSX.Element {


    const deleteCoupon = (id: number) => {
        // navigate('/allCoupons/delete/' + id);
    }

    const updateCoupon = (id: number) => {
        // navigate('/allCoupons/update/' + id);
    }

    return (
        <div className="CouponCard box2">
            <img src={props.coupon.image} alt="image"/>
			<p>title: {props.coupon.title}</p>
			<p>description: {props.coupon.description}</p>
			<p>category: {props.coupon.category}</p>
			<p>start date: {props.coupon.startDate.toString()}</p>
			<p>end date: {props.coupon.endDate.toString()}</p>
			<p>amount: {props.coupon.amount}</p>
			<p>price: {props.coupon.price}</p>
            <div className="row">
                <button onClick={() => deleteCoupon(props.coupon.id)}><FaTrash /></button>
                <button onClick={() => updateCoupon(props.coupon.id)}><FaEdit /></button>
            </div>
		</div>
    );
}

export default CouponCard;