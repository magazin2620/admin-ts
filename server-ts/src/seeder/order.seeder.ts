import { dataSource } from '../db';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';
import { Order } from '../entity/order.entity';
import { OrderItem } from '../entity/order-item.entity';

dataSource.initialize().then(async () => {
  const orderRepository = dataSource.manager.getRepository(Order);
  const orderItemRepository = dataSource.manager.getRepository(OrderItem);

  for (let i = 0; i < 30; i++) {
    const order = await orderRepository.save({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      created_at: faker.date.past(2),
    });

    for (let j = 0; j < randomInt(1, 5); j++) {
      await orderItemRepository.save({
        order,
        product_title: faker.lorem.words(2),
        price: randomInt(10, 100),
        quantity: randomInt(1, 5),
      });
    }
  }

  process.exit(0);
});
