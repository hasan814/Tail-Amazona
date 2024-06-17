import { model, models, Schema } from "mongoose";

const shippingSchema = new Schema(
  {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

const Shipping = models.Shipping || model("Shipping", shippingSchema);

export default Shipping;
