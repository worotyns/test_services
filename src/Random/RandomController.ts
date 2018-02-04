import { Request, Response, Router } from 'express';
import { EventHandler, Nyan, Requester } from 'nyan-cote';
import { RandomService } from './RandomService';

/**
 * Example controller. Behind the scenes, discovers RandomService instances in
 * your network and queries them in a round-robin fashion. Lets remote users
 * make HTTP requests and subscribe to all values the services generate.
 */
export class RandomController {
  public nyan: Nyan = new Nyan(this);

  @Requester()
  public randomService: RandomService;

  constructor(
    private io: SocketIO.Server,
    router: Router,
  ) {
    router.get('/random/:a/:b', this.getOne);
  }

  @EventHandler()
  public notifyAllSubscribers({ a, b, value }: { a: number; b: number; value: number }) {
    this.io.emit(`notified of a=${a}, b=${b}, value=${value}`);
  }

  private getOne = async (req: Request, res: Response) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);

    try {
      const response = await this.randomService.getOne(a, b);

      console.log(`sending (${a}, ${b}) response ${response}`); // tslint:disable-line

      res.send({ response });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
