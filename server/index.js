import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('foo')

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

console.log('foo')
app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data', 'contracts.json');

// Helper function to read JSON file
async function readContracts() {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contracts:', error);
    return [];
  }
}

// Helper function to write JSON file
async function writeContracts(contracts) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(contracts, null, 2));
  } catch (error) {
    console.error('Error writing contracts:', error);
    throw error;
  }
}

app.get('/', async (req, res) => {
  try {
    const contracts = await readContracts();
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: 'Error reading contracts' });
  }
});
// GET all contracts
app.get('/api/contracts', async (req, res) => {
  try {
    const contracts = await readContracts();
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: 'Error reading contracts' });
  }
});

// GET contract by ID
app.get('/api/contracts/:id', async (req, res) => {
  try {
    const contracts = await readContracts();
    const contract = contracts.find(c => c.id === req.params.id);
    if (contract) {
      res.json(contract);
    } else {
      res.status(404).json({ error: 'Contract not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error reading contract' });
  }
});

// POST new contract
app.post('/api/contracts', async (req, res) => {
  try {
    const contracts = await readContracts();
    const newContract = req.body;

    // Generate new ID
    const lastId = contracts.length > 0
      ? parseInt(contracts[contracts.length - 1].id.split('-')[1])
      : 0;
    newContract.id = `CT-${String(lastId + 1).padStart(3, '0')}`;

    contracts.push(newContract);
    await writeContracts(contracts);
    res.status(201).json(newContract);
  } catch (error) {
    res.status(500).json({ error: 'Error creating contract' });
  }
});

// PUT update contract
app.put('/api/contracts/:id', async (req, res) => {
  try {
    const contracts = await readContracts();
    const index = contracts.findIndex(c => c.id === req.params.id);

    if (index !== -1) {
      const updatedContract = { ...contracts[index], ...req.body, id: req.params.id };
      contracts[index] = updatedContract;
      await writeContracts(contracts);
      res.json(updatedContract);
    } else {
      res.status(404).json({ error: 'Contract not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating contract' });
  }
});

// DELETE contract
app.delete('/api/contracts/:id', async (req, res) => {
  try {
    const contracts = await readContracts();
    const filteredContracts = contracts.filter(c => c.id !== req.params.id);

    if (filteredContracts.length < contracts.length) {
      await writeContracts(filteredContracts);
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Contract not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting contract' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});