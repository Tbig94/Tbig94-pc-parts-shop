import { Order } from "./../models/order";

const createOrder = async (req, res) => {
  try {
    const order = Order.build({
      customerName: req.body.customerName,
      customerEmailAddress: req.body.customerEmailAddress,
      customerPhoneNumber: req.body.customerPhoneNumber,
      customerCountry: req.body.customerCountry,
      customerAddress: req.body.customerAddress,
      productIds: req.body.productIds,
      totalPrice: req.body.totalPrice,
    });

    await order.save();
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    throw new Error(`${err.stack}`);
  }
};

const OrderController = {
  createOrder,
};

export default OrderController;
