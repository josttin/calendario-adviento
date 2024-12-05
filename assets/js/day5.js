const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

const game = new Phaser.Game(config);

let player, flowers, obstacles, scoreText, livesText, retryButton, winText, loseText;
let score = 0;
let lives = 3;
let maxScore = 200;
let cursors;

function preload() {
    this.load.image('background', '../../public/images/fondo.jpg');
    this.load.image('player', '../../public/images/corazon.png');
    this.load.image('flower', '../../public/images/flores.png');
    this.load.image('obstacle', '../../public/images/roca.jpg');
    this.load.image('button', '../../public/images/LT1.jpg');
}

function create() {
    // Fondo
    this.add.tileSprite(400, 300, 800, 600, 'background');

    // Jugador (corazón más pequeño)
    player = this.physics.add.sprite(400, 500, 'player').setScale(0.2).setCollideWorldBounds(true);

    // Grupo de flores
    flowers = this.physics.add.group();

    // Grupo de obstáculos (rocas)
    obstacles = this.physics.add.group();

    // Colisiones
    this.physics.add.overlap(player, flowers, collectFlower, null, this);
    this.physics.add.collider(player, obstacles, hitObstacle, null, this);

    // Controles
    cursors = this.input.keyboard.createCursorKeys();

    // Texto de puntaje y vidas
    scoreText = this.add.text(16, 16, 'Puntaje: 0', { fontSize: '24px', fill: '#fff' });
    livesText = this.add.text(16, 50, `Vidas: ${lives}`, { fontSize: '24px', fill: '#fff' });

    // Generar flores en lugares aleatorios cada 2 segundos
    this.time.addEvent({
        delay: 3000,
        callback: generateFlower,
        callbackScope: this,
        loop: true,
    });

    // Generar obstáculos cada 2 segundos
    this.time.addEvent({
        delay: 1500,
        callback: generateObstacle,
        callbackScope: this,
        loop: true,
    });

    // Botón de reintentar (inicialmente oculto)
    retryButton = this.add.image(400, 300, 'button').setScale(0.5).setInteractive().setVisible(false);
    retryButton.on('pointerdown', resetGame, this);

    // Mensajes de victoria y derrota
    winText = this.add.text(400, 300, '¡Ganaste!', { fontSize: '32px', fill: '#0f0' }).setOrigin(0.5).setVisible(false);
    loseText = this.add.text(400, 300, '¡Perdiste!', { fontSize: '32px', fill: '#f00' }).setOrigin(0.5).setVisible(false);
}

function update() {
    // Movimiento del jugador con las flechas
    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-200);
    } else if (cursors.down.isDown) {
        player.setVelocityY(200);
    } else {
        player.setVelocityY(0);
    }
}

function collectFlower(player, flower) {
    flower.disableBody(true, true); // Desactiva la flor
    score += 10; // Aumenta el puntaje
    scoreText.setText(`Puntaje: ${score}`);

    // Si el puntaje llega a 100, el jugador gana
    if (score >= maxScore) {
        winGame.call(this); // Asegúrate de usar el contexto correcto
    }
}

function generateFlower() {
    const x = Phaser.Math.Between(50, 750);
    const y = Phaser.Math.Between(50, 550);
    const flower = flowers.create(x, y, 'flower').setScale(0.1);
}

function generateObstacle() {
    // Generar rocas en posiciones aleatorias y desplazamiento aleatorio (vertical u horizontal)
    const x = Phaser.Math.Between(50, 750);
    const y = Phaser.Math.Between(50, 550);
    const obstacle = obstacles.create(x, y, 'obstacle').setScale(0.1);
    
    // Movimiento aleatorio (horizontal o vertical)
    const direction = Phaser.Math.Between(0, 1); // 0 = horizontal, 1 = vertical
    if (direction === 0) {
        obstacle.setVelocityX(Phaser.Math.Between(-200, 200)); // Movimiento horizontal
    } else {
        obstacle.setVelocityY(Phaser.Math.Between(-200, 200)); // Movimiento vertical
    }
    
    obstacle.setCollideWorldBounds(true);
    obstacle.setBounce(1);
}

function hitObstacle(player, obstacle) {
    lives -= 1; // Pierde una vida
    livesText.setText(`Vidas: ${lives}`);

    if (lives <= 0) {
        loseGame.call(this); // Llamar a la función de derrota correctamente
    }
}

function winGame() {
    // Pausar el juego y mostrar mensaje de victoria
    this.physics.pause();
    player.setTint(0x00ff00); // Cambiar color del jugador a verde al ganar
    scoreText.setText('¡Ganaste! Te ganaste 15 besitos');
    winText.setVisible(true); // Mostrar mensaje de victoria
    retryButton.setVisible(true); // Mostrar botón de reintentar
}

function loseGame() {
    // Pausar el juego y mostrar mensaje de derrota
    this.physics.pause();
    player.setTint(0xff0000); // Cambiar color del jugador a rojo al perder
    scoreText.setText('¡Perdiste! vuelve a intentar.');
    loseText.setVisible(true); // Mostrar mensaje de derrota
    retryButton.setVisible(true); // Mostrar botón de reintentar
}

function resetGame() {
    // Resetear variables y elementos del juego
    score = 0;
    lives = 3;
    retryButton.setVisible(false);
    winText.setVisible(false);
    loseText.setVisible(false);

    player.clearTint();
    this.physics.resume();

    scoreText.setText('Puntaje: 0');
    livesText.setText('Vidas: 3');
    flowers.clear(true, true); // Eliminar flores previas
    obstacles.clear(true, true); // Eliminar obstáculos previos
}
