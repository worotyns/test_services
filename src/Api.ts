
import * as Express from 'express';
import * as SocketIO from 'socket.io';
import { RandomController } from './Random/RandomController';

/**
 * Example API. Instantiates Express, Socket.IO and your controllers. Nyan is
 * completely transparent at this level.
 */
export class Api {
  public express: Express.Express = Express();
  public io: SocketIO.Server = SocketIO();
  public randomController: RandomController = new RandomController(this.io, this.express);
}
