import { Request, Response } from 'express';
import { dataSource } from '../db';
import { User } from '../entity/user.entity';
import bcrypt from 'bcryptjs';

export const Users = async (req: Request, res: Response) => {
  const take = 15;
  const page = parseInt((req.query.page as string) || '1');

  const repository = dataSource.manager.getRepository(User);

  const [data, total] = await repository.findAndCount({
    take,
    skip: (page - 1) * take,
    relations: ['role'],
  });

  res.send({
    data: data.map((user) => {
      const { password, ...data } = user;
      return data;
    }),
    meta: {
      total,
      page,
      last_page: Math.ceil(total / take),
    },
  });
};

export const CreateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;
  const hashedPassword = await bcrypt.hash('123', 10);
  const repository = dataSource.manager.getRepository(User);
  const { password, ...user } = await repository.save({
    ...body,
    password: hashedPassword,
    role: {
      id: role_id,
    },
  });
  res.status(201).send(user);
};

export const GetUser = async (req: Request, res: Response) => {
  const repository = dataSource.manager.getRepository(User);

  const [data] = await repository.find({
    where: { id: parseInt(req.params.id, 10) },
    relations: ['role'],
  });

  if (!data) {
    return res.status(404).send({ message: 'not found' });
  }

  const { password, ...user } = data;

  res.send(user);
};

export const UpdateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;
  const repository = dataSource.manager.getRepository(User);
  await repository.update(req.params.id, {
    ...body,
    role: { id: role_id },
  });
  const [data] = await repository.find({
    where: { id: parseInt(req.params.id, 10) },
    relations: ['role'],
  });
  const { password, ...user } = data;
  res.status(202).send(user);
};

export const DeleteUser = async (req: Request, res: Response) => {
  const repository = dataSource.manager.getRepository(User);
  await repository.delete(req.params.id);
  res.status(204).send(null);
};
