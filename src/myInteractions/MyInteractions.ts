import { AutocompleteInteraction, ButtonBuilder, ButtonInteraction, ChatInputCommandInteraction, Interaction, ModalSubmitInteraction, PermissionResolvable } from 'discord.js';
import { BuilderData, MyCommandInteractions, MyComponentInteractionData, MyComponentInteractions, MyInteractionData } from './types.js';

export interface IMyInteraction<I extends Interaction> extends MyInteractionData<I> {
    execute(interaction: I | Interaction): Promise<void>;
}

export abstract class MyInteraction<I extends Interaction> implements IMyInteraction<I> {
    public builder: BuilderData<I>;
    public botPermissions: PermissionResolvable[];
    public memberPermissions: PermissionResolvable[];
    public onlyDevs: boolean;

    constructor(settings: MyInteractionData<I>) {
        const { builder, botPermissions, memberPermissions, onlyDevs } = settings;
        this.builder = builder;
        this.botPermissions = botPermissions;
        this.memberPermissions = memberPermissions;
        this.onlyDevs = onlyDevs;
    }

    abstract execute(interaction: I | Interaction): Promise<void>;
}

export abstract class MyCommandInteraction<I extends MyCommandInteractions> extends MyInteraction<MyCommandInteractions> {
    constructor(settings: MyInteractionData<I>) {
        super(settings);
    }
    abstract autocomplete(interaction: AutocompleteInteraction): Promise<void>;
}

export interface IMyComponentInteraction<I extends MyComponentInteractions> extends MyComponentInteractionData<I> {}

export abstract class MyComponentInteraction<I extends MyComponentInteractions> extends MyInteraction<I> implements IMyComponentInteraction<I> {
    public optionsInCustomId: boolean;
    constructor(settings: MyComponentInteractionData<I>) {
        super(settings);
        const { optionsInCustomId } = settings;
        this.optionsInCustomId = optionsInCustomId;
    }
}