const axios = require('axios');
require('dotenv').config();

const generateText = async (prompt, accessToken) => {
  const url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}` // Use the access token here
  };
  const body = {
    input: prompt,
    parameters: {
      decoding_method: "greedy",
      max_new_tokens: 400,
      min_new_tokens: 50,
      stop_sequences: [],
      repetition_penalty: 1
    },
    model_id: "ibm/granite-13b-chat-v2",
    project_id: "fcc8a9ed-40bd-41a5-a59b-3604e5d173d7",
    moderations: {
      hap: {
        input: {
          enabled: true,
          threshold: 0.5,
          mask: {
            remove_entity_value: true
          }
        },
        output: {
          enabled: true,
          threshold: 0.5,
          mask: {
            remove_entity_value: true
          }
        }
      }
    }
  };

  try {
    const response = await axios.post(url, body, { headers });
    return response.data.results && response.data.results[0] ? response.data.results[0].generated_text : 'No generated text found';
  } catch (error) {
    // Log the detailed error response
    console.error('Error details:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : error.message);
  }
};

module.exports = generateText;
