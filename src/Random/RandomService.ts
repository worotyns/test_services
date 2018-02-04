import { Nyan, Publisher, RequestHandler } from 'nyan-cote';
import { RandomController } from './RandomController';

/**
 * Example service. Responds with a random value on request. Publishes the
 * value to all subscribers. You run this on as many computers in your network
 * as you need.
 */
export class RandomService {
  public nyan: Nyan = new Nyan(this);

  @Publisher()
  private randomController: RandomController;

  @RequestHandler()
  public async getOne(a: number, b: number) {
    if (a === undefined || b  === undefined) {
      throw new Error('FalsyValue');
    }

    const value = Math.floor(Math.random() * (a + b));

    console.log(`request (${a}, ${b}) answering and publishing ${value}`); // tslint:disable-line

    this.randomController.notifyAllSubscribers({ a, b, value });

    return value;
  }
}
