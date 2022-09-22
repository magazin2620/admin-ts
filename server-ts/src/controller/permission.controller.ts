import { Request, Response } from 'express';
import { dataSource } from '../db';
import { Permission } from '../entity/permission.entity';

export const Permissions = async (req: Request, res: Response) => {
  const repository = dataSource.manager.getRepository(Permission);

  res.send(await repository.find());
};
