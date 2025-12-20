
const express  =  require('express')
const keyValueRouter = express.Router();
const {KeyValue}= require('../models/keyValue');

// Create or Update Key-Value Pair
keyValueRouter.post('/', async (req, res) => {
    console.log('headers:', req.headers);
    console.log('body (raw):', req.body);
    const { key, value } = req.body;

  if(!key || !value) {
    return res.status(400).send('Key and Value are required');
  }
  try {
    const existingKey = await KeyValue.findOne({ key });
    if (existingKey) {
        return res.status(400).send('Key already exists. Use PUT to update.');
    }
    const newKeyValue = new KeyValue({ key, value });
    await newKeyValue.save();
    res.status(201).send(newKeyValue);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// Get Value by Key
keyValueRouter.get('/:key', async (req, res) => {
  const { key } = req.params;
  try {
    const record = await KeyValue.findOne({ key });
    if (record) {
        res.status(200).send(record);
    } else {
        res.status(404).send('Key not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// Delete Key-Value Pair
keyValueRouter.delete('/:key', async (req, res) => {
  const { key } = req.params;
  try {
    const result = await KeyValue.deleteOne({ key });
    if (result.deletedCount > 0) {
        res.status(200).send('Key-Value pair deleted'); 
    } else {
        res.status(404).send('Key not found');
    }
    } catch (err) {
    res.status(500).send(err.message);
  }
});

// update to export app for testing
keyValueRouter.put('/:key', async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  try {
    const updated = await KeyValue.findOneAndUpdate(
      { key },
      { value },
      { new: true }
    );
    res.status(200).send(updated);
  } catch (err) {
    res.status(500).send(err.message);
  }
}); 

module.exports = {
    keyValueRouter,
};