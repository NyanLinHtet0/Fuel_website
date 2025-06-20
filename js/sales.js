const fuel_consts = ['n_two','n_five','pd','diesel'];

function update_total_lit(){
    const total_liter = 0;
    const total_rev = 0;
    fuel_array_obj.forEach( (item) => {
        total_rev += getNumericValue(item.rev);
        total_liter += getNumericValue(item.amount);
    })
    tot_liter = document.getElementById('total_liters');
    tot_liter.textContent = total_liter.toLocaleString();
    tot_rev = document.getElementById('total_rev');
    tot_rev.textContent = total_rev.toLocaleString();
}

function getNumericValue(input) {
    return parseFloat(input.value.replace(/,/g, '')) || 0;
}

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
        update_total_lit();
    }

    gettotal() {    
    }
}


// Instantiate
const fuel_array_obj = []

fuel_consts.forEach( (item) => {
    fuel_array_obj.push(new fuel(item))
})