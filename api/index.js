const data = {
  "statement": [
    {
      "id": "1",
      "type": "DEPOSITO",
      "value": 1500,
      "date": "2025-05-18"
    },
    {
      "id": "2",
      "type": "DEPOSITO",
      "value": 100,
      "date": "2025-05-21"
    },
    {
      "id": "3",
      "type": "DEPOSITO",
      "value": 50,
      "date": "2025-05-21"
    },
    {
      "id": "4",
      "type": "TRANSFERENCIA",
      "value": 500,
      "date": "2025-05-21"
    },
    {
      "id": "e275",
      "type": "DEPOSITO",
      "value": 50,
      "date": "2025-07-09",
      "category": "Alimentação",
      "attachments": [
        "II Arraiá da família.png"
      ]
    },
    {
      "id": "f05a",
      "type": "DEPOSITO",
      "value": 50,
      "date": "2025-07-25",
      "category": "Alimentação",
      "attachments": []
    }
  ],
  "user": {
    "id": 360843,
    "firstName": "Giovanna",
    "lastName": "Marinho de Godoy Lorente"
  },
  "amount": {
    "value": 2500
  },
  "investments": {
    "portfolio": [
      {
        "type": "Renda Fixa",
        "percentage": 45,
        "color": "#004D61"
      },
      {
        "type": "Renda Variável",
        "percentage": 30,
        "color": "#FF5031"
      },
      {
        "type": "Fundos",
        "percentage": 15,
        "color": "#34A853"
      },
      {
        "type": "Reserva",
        "percentage": 10,
        "color": "#999999"
      }
    ],
    "performance": [
      {
        "month": "Jan",
        "yield": 2.1
      },
      {
        "month": "Fev",
        "yield": 1.8
      },
      {
        "month": "Mar",
        "yield": 3.2
      },
      {
        "month": "Abr",
        "yield": 2.7
      },
      {
        "month": "Mai",
        "yield": 4.1
      },
      {
        "month": "Jun",
        "yield": 3.5
      }
    ],
    "products": [
      {
        "type": "Renda Fixa",
        "description": "CDB, LCI, LCA",
        "yield": "12,5% a.a."
      },
      {
        "type": "Renda Variável",
        "description": "Ações, FIIs",
        "yield": "+15% a.a."
      },
      {
        "type": "Fundos",
        "description": "Multimercado",
        "yield": "8,2% a.a."
      }
    ]
  }
}

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const path = req.url.replace('/api', '');

  if (path === '/statement') return res.json(data.statement);
  if (path === '/user') return res.json(data.user);
  if (path === '/amount') return res.json(data.amount);
  if (path === '/investments') return res.json(data.investments);

  res.status(404).json({ error: 'Not found' });
};