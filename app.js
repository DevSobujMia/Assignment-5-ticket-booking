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
            this.classList.add("selected");
        } else {
            // Display a message if the maximum limit is reached
            alert("You can not select more than 4 seats.");
        }
    }
    // Update selected seats display and total price
    updateSelectedSeats();
    updateRemainingSeats();
    updateSelectedSeatsCount();
    enableApplyButton();
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

// Function to update remaining seats display
function updateRemainingSeats() {
    let selectedSeats = document.querySelectorAll(".seat.selected");
    let remainingSeats = 40 - selectedSeats.length;
    document.getElementById("remaining-seats-btn").textContent = remainingSeats;
}

// Function to update selected seats count display
function updateSelectedSeatsCount() {
    let selectedSeatsCount = document.querySelectorAll(".seat.selected").length;
    document.getElementById("selected-seats-btn").textContent = selectedSeatsCount;
}

// Function to enable apply button when 4 or more seats are selected
function enableApplyButton() {
    let selectedSeats = document.querySelectorAll(".seat.selected");
    let applyButton = document.getElementById("apply-coupon-button");
    applyButton.disabled = selectedSeats.length < 4;
}

// Function to apply coupon discount
function applyCoupon() {
    let couponCode = document.getElementById("coupon-code").value;
    let totalPrice = parseInt(document.getElementById("total-price").textContent);
    let finalPrice = totalPrice;

    if ((couponCode === "NEW15" || couponCode === "Couple20") && totalPrice > 0) {
        let discountPercentage = couponCode === "NEW15" ? 0.15 : 0.20;
        if (document.querySelectorAll(".seat.selected").length >= 4) {
            let discount = totalPrice * discountPercentage;
            finalPrice -= discount;
            document.getElementById("total-discount").textContent = discount;
            document.getElementById("final-price").textContent = finalPrice;
            document.getElementById("coupon-label").classList.add("hidden");
            document.getElementById("discount-info").classList.remove("hidden");
            document.getElementById("apply-coupon-button").disabled = true;
        } else {
            alert("Coupon is valid only for 4 or more selected seats.");
        }
    } else {
        alert("Invalid coupon code.");
    }
}

// Event listener for applying coupon
document.getElementById("apply-coupon-button").addEventListener("click", applyCoupon);

// Event listener for form validation
const passengerNameInput = document.getElementById('passenger-name');
const phoneNumberInput = document.getElementById('phone-number');
const nextButton = document.getElementById('next-button');

passengerNameInput.addEventListener('input', validateForm);
phoneNumberInput.addEventListener('input', validateForm);
document.querySelectorAll(".seat").forEach(function(seat) {
    seat.addEventListener("click", validateForm); // Listen to seat clicks for form validation
});

function validateForm() {
    let selectedSeats = document.querySelectorAll(".seat.selected");
    if (passengerNameInput.validity.valid && phoneNumberInput.validity.valid && selectedSeats.length > 0) {
        nextButton.removeAttribute('disabled');
    } else {
        nextButton.setAttribute('disabled', true);
    }
}


// Event listener for form submission
document.getElementById('passenger-form').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('main-content-div').classList.add('hidden');
    document.getElementById('success-message').classList.remove('hidden');
});

// Event listener for continue button
document.getElementById('continue-button').addEventListener('click', function() {
    document.getElementById('success-message').classList.add('hidden');
    document.getElementById('main-content-div').classList.remove('hidden');
    resetSeatSelection();
});

// Function to reset seat selection and clear form inputs
function resetSeatSelection() {
    let selectedSeats = document.querySelectorAll(".seat.selected");
    selectedSeats.forEach(function(seat) {
        seat.classList.remove("selected");
    });
    updateSelectedSeats();
    updateRemainingSeats();
    updateSelectedSeatsCount();
    enableApplyButton();

    // clear coupon section
    document.getElementById('coupon-code').value = '';
    document.getElementById('total-discount').textContent = '0';
    document.getElementById('final-price').textContent = '0';
    document.getElementById('coupon-label').classList.remove('hidden');
    document.getElementById('discount-info').classList.add('hidden');
    document.getElementById('apply-coupon-button').disabled = false;

    // Clear form inputs
    document.getElementById('passenger-name').value = '';
    document.getElementById('phone-number').value = '';
    document.getElementById('email').value = '';
    document.getElementById('next-button').setAttribute('disabled', true);
}


// Event listener for seat selection
document.querySelectorAll(".seat").forEach(function(seat) {
    seat.addEventListener("click", function() {
        toggleSeatSelection();
        enableApplyButton();
    });
});

// Event listener for "Buy Ticket" button to seats selection section scroll
document.getElementById("buy-ticket-button").addEventListener("click", function() {
    document.getElementById("ticket-selection-section").scrollIntoView({
        behavior: 'smooth'
    });
});


// Update initial remaining seats display
updateRemainingSeats();

// Call the function to generate the bus layout
window.addEventListener('load', function() {
    generateBusLayout(10, 4);
});
