const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// Initialize GoogleGenerativeAI once
const genAI = new GoogleGenerativeAI("AIzaSyDgAJi7VbU0Jq9KxMBF4075X9HSinqnrrA");
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

app.post('/getResponse', async (req, res) => {
  try {
    console.log(req.body.question);

    const result = await model.generateContent(req.body.question);
    const response = result.response.text();

    console.log(response);

    res.status(200).json({  // ✅ changed req → res
      response: response
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
});

app.get('*', (req, res) => {
  res.status(404).json({
    error: 'Bad Request'
  });
});


module.exports = app;
