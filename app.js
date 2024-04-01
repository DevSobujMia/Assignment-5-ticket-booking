// Function to generate bus layout
function generateBusLayout(rows, seatsPerRow) {
    let busLayout = document.getElementById("bus-layout");
    busLayout.innerHTML = ""; // Clear previous layout

    // Loop through each row
    for (let i = 0; i < rows; i++) {
        let rowLabel = String.fromCharCode(65 + i); // Convert character (A to J)
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        // Add row label
        let labelDiv = document.createElement("div");
        labelDiv.textContent = rowLabel;
        labelDiv.classList.add("row-label");
        rowDiv.appendChild(labelDiv);

        // Add seats
        for (let j = 1; j <= seatsPerRow; j++) {
            let seatDiv = document.createElement("div");
            seatDiv.textContent = rowLabel + j;
            seatDiv.classList.add("seat");
            // Add gap after the second seat
            if (j === Math.ceil(seatsPerRow / 2)) {
                seatDiv.classList.add("gap");
            }
            seatDiv.dataset.seat = rowLabel + j;
            seatDiv.addEventListener("click", toggleSeatSelection);
            rowDiv.appendChild(seatDiv);
        }

        busLayout.appendChild(rowDiv);
    }
}

// Function to toggle seat selection
function toggleSeatSelection() {
    // Check if the seat is already selected
    if (this.classList.contains("selected")) {
        // Deselect the seat
        this.classList.remove("selected");
    } else {
        // Check if the maximum limit of 4 seats is reached
        let selectedSeats = document.querySelectorAll(".seat.selected");
        if (selectedSeats.length < 4) {
            // Select the seat
            this.classList.add("selected");
        } else {
            // Display a message if the maximum limit is reached
            alert("You can not select more than 4 seats.");
        }
    }
    // Update selected seats display and total price
    updateSelectedSeats();
}

// Function to update selected seats display and calculate total price
function updateSelectedSeats() {
    let selectedSeatsContainer = document.getElementById("selected-seats");
    let selectedSeats = document.querySelectorAll(".seat.selected");
    let totalPrice = 0;

    let selectedSeatsInfo = "";

    selectedSeats.forEach(function(seat) {
        let seatNumber = seat.textContent;
        let seatClass = "Economy";
        let seatPrice = 550;
        totalPrice += seatPrice;
        selectedSeatsInfo += `<div class="selected-seat-info">
                                  <div>${seatNumber}</div>
                                  <div>${seatClass}</div>
                                  <div>${seatPrice}</div>
                              </div>`;
    });

    // Display selected seats information
    selectedSeatsContainer.innerHTML = selectedSeatsInfo;

    // Update total price display
    let totalPriceContainer = document.getElementById("total-price");
    totalPriceContainer.textContent = totalPrice;
}

document.getElementById("buy-ticket-button").addEventListener("click", function() {
    // Scroll smoothly to the ticket selection section
    document.getElementById("ticket-selection-section").scrollIntoView({
        behavior: 'smooth'
    });
});


// Call the function to generate the bus layout
generateBusLayout(10, 4); // 10 rows, 4 seats per row
