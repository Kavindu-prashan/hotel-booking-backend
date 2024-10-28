import Booking from "../models/booking.js";
import { isCustomerValid } from "./userControllers.js";

export function createBooking(req, res) {
  if (!isCustomerValid(req)) {
    return res.status(400).json({ message: "Invalid customer" });
  }

  const startingId = 1000;

  Booking.countDocuments({}).then((count) => {
    const newId = startingId + count;

    const newBooking = new Booking({
      bookingId: newId,
      roomId: req.body.roomId,
      email: req.body.email,
      start: req.body.start,
      end: req.body.end,
      status: "pending", 
      reason: req.body.reason || "", 
      notes: req.body.notes || "", 
    });

    newBooking.save()
      .then((result) => {
        res.status(201).json({
          message: "Booking saved successfully",
          result: result
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Booking creation failed",
          error: err
        });
      });
  }).catch((err) => {
    res.status(500).json({
      message: "Booking count failed",
      error: err
    });
  });
}



