const SvcRegister = require('../services/register.service');

const create = async (req, res) => {
  const created = await SvcRegister.create(req.body);

  console.log(created);

  return res.status(201).json(created);
};

module.exports = { create };