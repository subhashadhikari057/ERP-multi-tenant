import * as service from './tenant.service.js';

export const registerTenant = async (req, res, next) => {
  try {
    const data = await service.registerTenant(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};
