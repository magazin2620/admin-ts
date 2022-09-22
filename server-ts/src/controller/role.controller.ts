import { Request, Response } from 'express';
import { dataSource } from '../db';
import { Role } from '../entity/role.entity';

export const Roles = async (req: Request, res: Response) => {
  const repository = dataSource.manager.getRepository(Role);

  res.send(await repository.find());
};

export const CreateRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;

  const repository = dataSource.manager.getRepository(Role);

  const role = await repository.save({
    name,
    permissions: permissions.map((id) => ({ id })),
  });

  res.status(201).send(role);
};

export const GetRole = async (req: Request, res: Response) => {
  const repository = dataSource.manager.getRepository(Role);
  const [role] = await repository.find({
    where: { id: parseInt(req.params.id, 10) },
    relations: ['permissions'],
  });
  res.send(role);
};

export const UpdateRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;

  const repository = dataSource.manager.getRepository(Role);

  const role = await repository.save({
    id: parseInt(req.params.id),
    name,
    permissions: permissions.map((id) => ({ id })),
  });

  res.status(202).send(role);
};

export const DeleteRole = async (req: Request, res: Response) => {
  const repository = dataSource.manager.getRepository(Role);

  await repository.delete(req.params.id);

  res.status(204).send(null);
};
