class fuel {
    constructor(fuel_type) {
        this.amount = document.getElementById(`${fuel_type}_amount`);
        this.price = document.getElementById(`${fuel_type}_price`);
        this.rev = document.getElementById(`${fuel_type}_revenue`);

        if (this.amount && this.price && this.rev) {
            this.amount.addEventListener('input', () => {
                this.formatNumberInput(this.amount);
                this.updateRevenue();
            });

            this.price.addEventListener('input', () => {
                this.formatNumberInput(this.price);
                this.updateRevenue();
            });

            this.updateRevenue();
        }
    }

    formatNumberInput(input) {
        const raw = input.value.replace(/,/g, '');

        // Don't format if the user is mid-input like typing "12." or "12.3"
        if (raw.endsWith('.') || raw.match(/\.\d{0,2}$/)) return;

        const num = parseFloat(raw);
        if (isNaN(num)) {
            input.value = '';
            return;
        }

        // Format and replace value
        input.value = num.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });

        // Place caret at end
        input.setSelectionRange(input.value.length, input.value.length);
    }


    getNumericValue(input) {
        return parseFloat(input.value.replace(/,/g, '')) || 0;
    }

    updateRevenue() {
        const amt = this.getNumericValue(this.amount);
        const prc = this.getNumericValue(this.price);
        const total = amt * prc;
        this.rev.textContent = total.toLocaleString();
    }
}

// Instantiate
new fuel('n_two');
new fuel('n_five');
new fuel('pd');
new fuel('diesel');
