# MyBot
## A discord.js wrapper
This module simplify the way you build a discord bot, ignoring all the initial procedures for a discord bot to work;
hiding the complexity of making a discord bot:
- 💬 Commands handler
- 🧩 Components handler (reusable)
- 🔁 Events handler

### Example file (index)
```js
// Imports the necessary classes from the discord.js lib
// CommonJS
const { MyClient } = require('@simoincodice/mybot');
// Module / TS Style
import { MyClient } from '@simoincodice/mybot';
// Declare a var. of type MyClient as the base class Client of the discord lib
const client = new MyClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers, // Client config
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
},
path.join(__dirname, "commands"),
path.join(__dirname, "components"), // Absolute folder's path
path.join(__dirname, "events")
);
// Call the init function to start the bot
client.init(
    BOT_TOKEN,
    CLIENT_ID,
    DEVS_IDS // The discord's user ids of the devs
);
```

### A command file (commands/TestCommand) TS Version
```js
import { ActionRowBuilder, ApplicationCommandOptionWithAutocompleteMixin, AutocompleteInteraction, ButtonBuilder, ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { MyCommandInteraction } from "../../utils/mybot/myInteractions/MyInteractions";
import TestButton from "../../components/test/TestButton";

class TestCommand extends MyCommandInteraction {
    constructor() {
        super({
            builder: new SlashCommandBuilder()
                .setName("test")
                .setDescription("ciao")
                .addStringOption(option =>
                    option.setName("option1")
                        .setDescription("The first option")
                        .setAutocomplete(true)
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("option2")
                        .setDescription("The second option")
                        .setAutocomplete(true)
                        .setRequired(true)
                ),
            botPermissions: [],
            memberPermissions: [],
            onlyDevs: false
        });
    }
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        interaction.reply({
            components: [
                new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(new ButtonBuilder(TestButton.builder.data))
            ],
            content: "ciao",
            flags: MessageFlags.Ephemeral
        })
    }
    async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
        const optionName = interaction.options.data[0].name;
        if (optionName === "option1")
            interaction.respond([{ name: "Nome1", value: "valore1" }]);
        else if (optionName === "option2")
            interaction.respond([{ name: "Nome2", value: "valore2" }]);
    }
}

export default new TestCommand();
```
### A components file (commands/TestCommand) TS Version