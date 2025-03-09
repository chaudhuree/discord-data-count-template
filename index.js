const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = 5000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;
// get total member count
async function getMemberCount() {
  try {
    const response = await axios.get(`https://discord.com/api/v10/guilds/${GUILD_ID}?with_counts=true`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
      },
    });
    // console.log(response)
    const memberCount = response.data.approximate_member_count;
    console.log(`Total members: ${memberCount}`);
    return memberCount;
  } catch (error) {
    console.error('Error fetching member count:', error);
  }
}
// get total messge count
async function getMessageCount() {
  try {
    const response = await axios.get(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
      },
    });
    // console.log(`Total messages: ${response.data.length}`);
    const messageCount = response.data.length;
    console.log(`Total messages: ${messageCount}`);
    return messageCount;
  } catch (error) {
    console.error('Error fetching message count:', error);
  }
}
// get total channel count
async function getChannelCount() {
  try {
    const response = await axios.get(`https://discord.com/api/v10/guilds/${GUILD_ID}/channels`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
      },
    });
    // console.log(response)
    const channelCount = response.data.length;
    console.log(`Total channels: ${channelCount}`);
    return channelCount;
  } catch (error) {
    console.error('Error fetching channel count:', error);
  }
}
// get total role count
async function getRoleCount() {
  try {
    const response = await axios.get(`https://discord.com/api/v10/guilds/${GUILD_ID}/roles`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
      },
    });
    // console.log(response)
    const roleCount = response.data.length;
    console.log(`Total roles: ${roleCount}`);
    return roleCount;
  } catch (error) {
    console.error('Error fetching role count:', error);
  }
}

app.get('/', async (req, res) => {
  const [memberCount, messageCount, channelCount, roleCount] = await Promise.all([
    getMemberCount(),
    getMessageCount(),
    getChannelCount(),
    getRoleCount(),
  ]);

  res.send(`Total members: ${memberCount} Total messages: ${messageCount} Total channels: ${channelCount} Total roles: ${roleCount}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});