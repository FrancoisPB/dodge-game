export const GAME_CONFIG = {
    PLAYER: {
        SPEED: 300,
        SCALE: 0.15
    },

    ENEMY: {
        SPEED: 150,
        SCALE: 0.08
    },

    SPAWN: {
        INITIAL_DELAY: 1000,
        MIN_DELAY: 200,
        DECAY: 0.98,
        MAX_SPAWN_X: 750,
        MIN_SPAWN_X: 50
    },

    WORLD: {
        WIDTH: 800,
        HEIGHT: 600
    },

    PARTICLES: {
        MIN_SPEED: -200,
        MAX_SPEED: 200,
        START_SCALE: 0.5,
        END_SCALE: 0,
        QUANTITY: 20,
        LIFESPAN: 500
    },

    START_TEXT: {
        X: 300,
        Y_DOGDE_GAME: 250,
        Y_INSTRUCTIONS: 300,
        Y_CLICK: 350,
    },
};