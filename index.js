require('dotenv').config();

console.log("TOKEN:", process.env.TOKEN);
console.log("PIX:", process.env.PIX_CHAVE);
console.log("Iniciando bot...");

require('dotenv').config(); // carrega variáveis do .env

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// pega dados do .env
const TOKEN = process.env.TOKEN;
const PIX_CHAVE = process.env.PIX_CHAVE;

client.on('ready', () => {
  console.log(`Bot ligado como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!pix")) return;

  const args = message.content.split(" ");
  const valor = args[1];

  let valorTexto = "Valor informado pelo atendente";
  if (valor && !isNaN(valor)) {
    valorTexto = `R$ ${Number(valor).toFixed(2)}`;
  }

  const embed = new EmbedBuilder()
    .setTitle("PAGAMENTO VIA PIX")
    .setDescription("Envie o comprovante neste ticket. (Entrega após confirmação.)")
    .addFields(
      { name: "Chave PIX", value: PIX_CHAVE, inline: true },
      { name: "Valor", value: valorTexto, inline: true }
    )
    .setColor("#6a0dad")
    .setFooter({ text: "Equipe RuxX Prime" })
    .setImage("attachment://pix.png");

  await message.channel.send({
    embeds: [embed],
    files: ["./pix.png"]
  });
});

// login seguro
client.login(TOKEN);