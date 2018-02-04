// src/app/Random/RandomService.test.ts

import { EventHandler, Nyan, Requester } from 'nyan-cote';
import { RandomService } from './RandomService';

// tslint:disable:max-classes-per-file
/**
 * Some class
 */
class Test {
  public instance: RandomService = new RandomService();

  public nyan: Nyan = new Nyan(this);

  // Talk through Cote instead of using the instance directly.
  @Requester()
  public randomService: RandomService;
}

/**
 * Example service test. RandomService has a responder and a publisher. Here
 * we create a requester and a subscriber.
 */
describe('RandomService', () => {
  let test: Test;

  beforeEach(() => {
    test = new Test();
  });

  it('gets one', async () => {
    const value = await test.randomService.getOne(1, 2);
    console.assert(value >= 0 && value <= 3);
  });

  it('gets one, failing if a or b falsy', async () => {
    let error: Error | undefined;

    try {
      await test.randomService.getOne(0, 1);
    } catch (_) {
      error = _;
    }

    console.assert(error === undefined);

    error = undefined;

    try {
      await test.randomService.getOne(1, 0);
    } catch (_) {
      error = _;
    }

    console.assert(error === undefined);
  });

  it('gets one, notifying controllers', async () => {
    const results: {
      a: number;
      b: number;
      value: number;
    }[] = [];

    /**
     * Mock. Uses same class name, for service discovery. Nyan sees the
     * decorator and binds a subscriber to every instance.
     */
    class RandomController {
      public nyan: Nyan = new Nyan(this);

      private timesNotified: number = 0;

      @EventHandler()
      public notifyAllSubscribers(_: typeof results[0]) {
        results.push(_);
        console.assert(++this.timesNotified === 1);
      }
    }

    const randomController = new RandomController();
    const randomController1 = new RandomController();

    await test.randomService.getOne(1, 2);

    console.assert(results.length === 2);

    for (const result of results) {
      console.assert(result.a === 1 && result.b === 2 && result.value >= 0);
    }

    randomController.nyan.close();
    randomController1.nyan.close();
  });
});
