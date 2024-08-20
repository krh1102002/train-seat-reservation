const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const seatSchema = new mongoose.Schema({
  seatNumber: Number,
  isBooked: Boolean,
  rowNumber: Number,
  columnNumber: Number,
});

const Seat = mongoose.model("Seat", seatSchema);

async function initializeSeats() {
  const count = await Seat.countDocuments();
  if (count === 0) {
    const seats = [];
    for (let row = 1; row <= 12; row++) {
      const seatsInRow = row === 12 ? 3 : 7;
      for (let col = 1; col <= seatsInRow; col++) {
        seats.push({
          seatNumber: (row - 1) * 7 + col,
          isBooked: false,
          rowNumber: row,
          columnNumber: col,
        });
      }
    }
    await Seat.insertMany(seats);
    console.log("Seats initialized");
  }
}

initializeSeats();

app.get("/api/seats", async (req, res) => {
  try {
    const seats = await Seat.find().sort({ seatNumber: 1 });
    res.json(seats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching seats", error: error.message });
  }
});

app.post("/api/book", async (req, res) => {
  try {
    const { numSeats } = req.body;

    if (numSeats < 1 || numSeats > 7) {
      return res.status(400).json({
        message: "Invalid number of seats. Please book 1 to 7 seats.",
      });
    }

    const availableSeats = await Seat.find({ isBooked: false }).sort({
      rowNumber: 1,
      columnNumber: 1,
    });

    if (availableSeats.length < numSeats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    let seatsToBook = [];
    let currentRow = availableSeats[0].rowNumber;
    let seatsInCurrentRow = availableSeats.filter(
      (seat) => seat.rowNumber === currentRow
    );

    if (seatsInCurrentRow.length >= numSeats) {
      seatsToBook = seatsInCurrentRow.slice(0, numSeats);
    } else {
      seatsToBook = availableSeats.slice(0, numSeats);
    }

    await Seat.updateMany(
      { _id: { $in: seatsToBook.map((seat) => seat._id) } },
      { $set: { isBooked: true } }
    );

    res.json({ bookedSeats: seatsToBook.map((seat) => seat.seatNumber) });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error booking seats", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
