// js/booking.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('booking-form');
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    const roomTypeSelect = document.getElementById('room-type');
    
    const summaryRoomType = document.getElementById('summary-room-type');
    const summaryCheckIn = document.getElementById('summary-check-in');
    const summaryCheckOut = document.getElementById('summary-check-out');
    const summaryNights = document.getElementById('summary-nights');
    const totalCostDisplay = document.getElementById('total-cost');
    
    const bookingPopup = document.getElementById('booking-popup');
    const popupClose = document.querySelector('.popup-close');
    
    // Set min date for check-in to today
    const today = new Date().toISOString().split('T')[0];
    checkInInput.setAttribute('min', today);

    // --- 1. Dynamic Cost Calculation ---
    function calculateCost() {
        const checkInDate = new Date(checkInInput.value);
        const checkOutDate = new Date(checkOutInput.value);
        const selectedOption = roomTypeSelect.options[roomTypeSelect.selectedIndex];

        // Reset summary
        summaryRoomType.textContent = 'N/A';
        summaryCheckIn.textContent = 'N/A';
        summaryCheckOut.textContent = 'N/A';
        summaryNights.textContent = '0';
        totalCostDisplay.textContent = '$0';
        
        if (!checkInDate.getTime() || !checkOutDate.getTime() || !selectedOption.value) return;

        // Calculate nights
        const diffTime = Math.abs(checkOutDate - checkInDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const nights = (diffDays > 0 && checkOutDate > checkInDate) ? diffDays : 0;
        
        // Get room price
        const roomPrice = parseInt(selectedOption.getAttribute('data-price')) || 0;
        
        // Calculate total
        const totalCost = nights * roomPrice;

        // Update Summary
        summaryRoomType.textContent = selectedOption.textContent.split('(')[0].trim();
        summaryCheckIn.textContent = checkInDate.toLocaleDateString();
        summaryCheckOut.textContent = checkOutDate.toLocaleDateString();
        summaryNights.textContent = nights.toString();
        totalCostDisplay.textContent = `$${totalCost.toLocaleString()}`;
    }

    // Event listeners for calculation
    checkInInput.addEventListener('input', calculateCost);
    checkOutInput.addEventListener('input', calculateCost);
    roomTypeSelect.addEventListener('input', calculateCost);

    // --- 2. Initial Room Type Pre-selection (from rooms.html link) ---
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedRoom = urlParams.get('room');
    if (preselectedRoom) {
        roomTypeSelect.value = preselectedRoom;
    }
    calculateCost(); // Initial calculation for pre-filled data

    // --- 3. Form Validation and Submission ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const data = {};

        // Simple Required Field Validation
        ['name', 'email', 'check-in', 'check-out', 'room-type', 'guests'].forEach(id => {
            const input = document.getElementById(id);
            const error = document.getElementById(`${id}-error`);
            
            if (input.value === '') {
                isValid = false;
                if (error) error.style.display = 'block';
                input.style.borderColor = 'red';
            } else {
                if (error) error.style.display = 'none';
                input.style.borderColor = '';
                data[id] = input.value;
            }
        });
        
        // Date Logic Validation
        const checkInDate = new Date(checkInInput.value);
        const checkOutDate = new Date(checkOutInput.value);

        if (checkInDate >= checkOutDate) {
            document.getElementById('check-out-error').textContent = 'Check-out must be after Check-in.';
            document.getElementById('check-out-error').style.display = 'block';
            checkOutInput.style.borderColor = 'red';
            isValid = false;
        } else {
             document.getElementById('check-out-error').style.display = 'none';
             checkOutInput.style.borderColor = '';
        }
        
        // Final Submission (Simulated Backend)
        if (isValid) {
            const selectedOptionText = roomTypeSelect.options[roomTypeSelect.selectedIndex].textContent.split('(')[0].trim();

            // Populate Popup with Submitted Data
            document.getElementById('confirm-name').textContent = data.name;
            document.getElementById('confirm-email').textContent = data.email;
            document.getElementById('confirm-room').textContent = selectedOptionText;
            document.getElementById('confirm-checkin').textContent = new Date(data['check-in']).toLocaleDateString();
            document.getElementById('confirm-checkout').textContent = new Date(data['check-out']).toLocaleDateString();

            // Show Popup
            bookingPopup.style.display = 'flex';
        }
    });

    // Close Popup Logic
    popupClose.addEventListener('click', () => {
        bookingPopup.style.display = 'none';
        form.reset(); // Clear form after confirmation
    });

    bookingPopup.addEventListener('click', (e) => {
        if (e.target === bookingPopup) {
            bookingPopup.style.display = 'none';
            form.reset();
        }
    });
});