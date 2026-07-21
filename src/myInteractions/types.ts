import { AnySelectMenuInteraction, ButtonBuilder, ButtonInteraction, ChannelSelectMenuBuilder, ChannelSelectMenuInteraction, ChatInputCommandInteraction, ContextMenuCommandBuilder, ContextMenuCommandInteraction, Interaction, InteractionType, MessageContextMenuCommandInteraction, ModalBuilder, ModalSubmitInteraction, PermissionResolvable, RoleSelectMenuBuilder, RoleSelectMenuInteraction, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, UserContextMenuCommandInteraction, UserSelectMenuBuilder, UserSelectMenuInteraction } from "discord.js";

/* v Builders v */

export type MyCommandBuilder = SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | ContextMenuCommandBuilder;

export type MyComponentBuilder = ButtonBuilder |
ModalBuilder  |
StringSelectMenuBuilder |
RoleSelectMenuBuilder |
ChannelSelectMenuBuilder |
UserSelectMenuBuilder;

export type MyBuilder = SlashCommandBuilder | MyComponentBuilder;

export type BuilderData<I extends Interaction> = I extends ButtonInteraction ? ButtonBuilder :
                            (I extends ModalSubmitInteraction ? ModalBuilder :
                            (I extends StringSelectMenuInteraction ? StringSelectMenuBuilder : 
                            (I extends RoleSelectMenuInteraction ? RoleSelectMenuBuilder :
                            (I extends UserSelectMenuInteraction ? UserSelectMenuBuilder :
                            (I extends ChannelSelectMenuInteraction ? ChannelSelectMenuBuilder :
                            (I extends ChatInputCommandInteraction ? SlashCommandBuilder | SlashCommandOptionsOnlyBuilder : 
                            (I extends ContextMenuCommandInteraction | MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction ? ContextMenuCommandBuilder : never))
                            )))));

/* ^ Builders ^ */

/* v Interactions v */

export type MyCommandInteractions = ChatInputCommandInteraction | MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction;

export type MyComponentInteractions = ButtonInteraction | ModalSubmitInteraction | AnySelectMenuInteraction;

export type MyInteractionData<I extends Interaction> = {
    builder: BuilderData<I>,
    botPermissions: PermissionResolvable[],
    memberPermissions: PermissionResolvable[],
    onlyDevs: boolean
}

export type MyComponentInteractionData<I extends MyComponentInteractions> = MyInteractionData<I> & {
    optionsInCustomId: boolean
}

/* ^ Interactions ^ */