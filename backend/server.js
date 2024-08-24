// server.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const apiKey = process.env.WATSON_API_KEY;
const url = process.env.WATSON_URL;

app.get('/', (req, res) => {
  res.render('index', { quote: null });
});

app.post('/generate', async (req, res) => {
  const mood = req.body.mood;
  try {
    const response = await axios.post(
      `${url}/v1/messages`,
      {
        input: {
          text: `Generate a motivational quote for ${mood}`,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    const quote = response.data.output.generic[0].text;
    res.render('index', { quote });
  } catch (error) {
    res.render('index', { quote: 'Error generating quote, please try again.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
