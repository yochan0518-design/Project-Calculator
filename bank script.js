 
        let currentBalance = 2450.00;

        const balanceEl = document.getElementById('balance');
        const amountInput = document.getElementById('amount');
        const transactionList = document.getElementById('transaction-list');

        function updateBalanceDisplay() {
            balanceEl.textContent = `$${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }

        function addTransaction(title, amount, isPositive) {
            const li = document.createElement('li');
            li.className = 'transaction-item';

            const infoDiv = document.createElement('div');
            infoDiv.className = 'transaction-info';

            const titleSpan = document.createElement('span');
            titleSpan.className = 'transaction-title';
            titleSpan.textContent = title;

            const dateSpan = document.createElement('span');
            dateSpan.className = 'transaction-date';
            dateSpan.textContent = 'Just now';

            infoDiv.appendChild(titleSpan);
            infoDiv.appendChild(dateSpan);

            const amountSpan = document.createElement('span');
            amountSpan.className = isPositive ? 'amount-plus' : 'amount-minus';
            amountSpan.textContent = `${isPositive ? '+' : '-'}$${amount.toFixed(2)}`;

            li.appendChild(infoDiv);
            li.appendChild(amountSpan);

            transactionList.prepend(li);
        }

        function handleDeposit() {
            const val = parseFloat(amountInput.value);
            if (isNaN(val) || val <= 0) {
                alert('Please enter a valid positive amount.');
                return;
            }

            currentBalance += val;
            updateBalanceDisplay();
            addTransaction('Deposit', val, true);
            amountInput.value = '';
        }

        function handleWithdraw() {
            const val = parseFloat(amountInput.value);
            if (isNaN(val) || val <= 0) {
                alert('Please enter a valid positive amount.');
                return;
            }

            if (val > currentBalance) {
                alert('Insufficient balance!');
                return;
            }

            currentBalance -= val;
            updateBalanceDisplay();
            addTransaction('Payment / Transfer', val, false);
            amountInput.value = '';
        }