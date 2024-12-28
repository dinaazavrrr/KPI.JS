const EventEmitter = require('events');

class InventorySystem extends EventEmitter {
    constructor() {
        super();
    }

    setProductQuantity(product, quantity) {
        if (quantity < 0) {
            this.emit('error', new Error(`Incorrect quantity: ${quantity}. Quantity cannot be negative.`));
        } else if (quantity === 0) {
            this.emit('productOutOfStock', product);
        } else {
            this.emit('productInStock', product, quantity);
        }
    }
}

class NotificationService {
    update(product, quantity) {
        console.log(`\x1b[32mNotification: Product "${product}" is now available with quantity ${quantity}.\x1b[0m`);
    }
}

class ReportingService {
    update(product, quantity) {
        console.log(`\x1b[33mReport: Product "${product}" quantity updated to ${quantity}.\x1b[0m`);
    }
}

const inventorySystem = new InventorySystem();
const notificationService = new NotificationService();
const reportingService = new ReportingService();

// events listening
inventorySystem.on('productInStock', (product, quantity) => notificationService.update(product, quantity));
inventorySystem.on('productInStock', (product, quantity) => reportingService.update(product, quantity));

inventorySystem.on('productOutOfSale', (product) => {
    console.log(`Alert: Product "${product}" is out of sale.`);
});

inventorySystem.on('error', error => {
    console.error(`\x1b[31mError: ${error.message}\x1b[0m`);
});

// Примеры работы
inventorySystem.setProductQuantity('Laptop', 20);  // message about available
console.log();
inventorySystem.setProductQuantity('Phone', 0);   // message about sale out
console.log();
inventorySystem.setProductQuantity('Tablet', -5);  // error, negativa value