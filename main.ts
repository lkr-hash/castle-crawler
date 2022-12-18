enum ActionKind {
    Walking,
    Idle,
    Jumping,
    walkdown,
    walkup,
    walkright,
    idle_down,
    idle_up,
    idle_right,
    idle_left,
    walkleft
}
namespace SpriteKind {
    export const sword = SpriteKind.create()
    export const enemy_unaware = SpriteKind.create()
}
function snake_anim () {
	
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if ((mySprite.tileKindAt(TileDirection.Top, assets.tile`tile4`) || mySprite.tileKindAt(TileDirection.Top, assets.tile`tile5`)) && vertical == -1 || (mySprite.tileKindAt(TileDirection.Right, assets.tile`tile4`) || mySprite.tileKindAt(TileDirection.Left, assets.tile`tile5`)) || (mySprite.tileKindAt(TileDirection.Right, assets.tile`tile6`) || mySprite.tileKindAt(TileDirection.Left, assets.tile`tile7`))) {
        game.showLongText("这是一台健康值售卖机。", DialogLayout.Bottom)
        if (info.score() > 4) {
            if (info.life() < 10) {
                info.changeScoreBy(-5)
                music.magicWand.play()
                info.changeLifeBy(1)
            } else {
                game.showLongText("你的健康值已经达到上限", DialogLayout.Bottom)
            }
        } else {
            game.showLongText("你没有足够的钱", DialogLayout.Bottom)
        }
    } else if (mySprite.tileKindAt(TileDirection.Top, sprites.dungeon.greenSwitchUp) && vertical == -1) {
        music.pewPew.play()
        tiles.setTileAt(tiles.getTileLocation(23, 25), sprites.dungeon.greenSwitchDown)
        tiles.setTileAt(tiles.getTileLocation(34, 3), sprites.dungeon.greenInnerSouthWest)
        tiles.setTileAt(tiles.getTileLocation(34, 4), sprites.dungeon.floorDarkDiamond)
        tiles.setTileAt(tiles.getTileLocation(34, 5), sprites.dungeon.greenInnerNorthWest)
        tiles.setWallAt(tiles.getTileLocation(34, 4), false)
        game.showLongText("某处打开了一扇门", DialogLayout.Bottom)
    } else if (mySprite.tileKindAt(TileDirection.Top, sprites.dungeon.chestClosed) && vertical == -1 || mySprite.tileKindAt(TileDirection.Right, sprites.dungeon.chestClosed) && horizontal == 1 || mySprite.tileKindAt(TileDirection.Left, sprites.dungeon.chestClosed) && horizontal == -1) {
        reward = randint(0, 4)
        music.jumpUp.play()
        tiles.setTileAt(tiles.getTileLocation(23, 1), sprites.dungeon.chestOpen)
        game.showLongText("你得到了...", DialogLayout.Bottom)
        mySprite.setImage(treasure[reward])
        game.showLongText(text_list[reward], DialogLayout.Bottom)
        game.over(true)
    } else {
        if (swingsword == 0) {
            music.pewPew.play()
            swingsword = 1
            speed = 0
            pause(200)
            swingsword = 0
            speed = 70
            sword2.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
    }
})
sprites.onOverlap(SpriteKind.sword, SpriteKind.Enemy, function (sprite, otherSprite) {
    coin = sprites.create(img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `, SpriteKind.Food)
    animation.runImageAnimation(
    coin,
    [img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `,img`
        . . . b b b . . 
        . . b 5 5 5 b . 
        . b 5 d 3 d 5 b 
        . b 5 3 5 1 5 b 
        . c 5 3 5 1 d c 
        . c 5 d 1 d d c 
        . . f d d d f . 
        . . . f f f . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . . b 1 1 b . . 
        . . b 5 5 b . . 
        . . b d d b . . 
        . . c d d c . . 
        . . c 3 3 c . . 
        . . . f f . . . 
        `,img`
        . . . b b b . . 
        . . b 5 5 5 b . 
        . b 5 d 3 d 5 b 
        . b 5 1 5 3 5 b 
        . c d 1 5 3 5 c 
        . c d d 1 d 5 c 
        . . f d d d f . 
        . . . f f f . . 
        `],
    200,
    true
    )
    coin.setPosition(otherSprite.x, otherSprite.y)
    otherSprite.destroy()
    scene.cameraShake(4, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.baDing.play()
    info.changeScoreBy(1)
    otherSprite.destroy()
})
function player_anim () {
    anim_idle_down = animation.createAnimation(ActionKind.idle_down, 100)
    animation.attachAnimation(mySprite, anim_idle_down)
    anim_idle_down.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    anim_idle_up = animation.createAnimation(ActionKind.idle_up, 100)
    animation.attachAnimation(mySprite, anim_idle_up)
    anim_idle_up.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    anim_idle_right = animation.createAnimation(ActionKind.idle_right, 100)
    animation.attachAnimation(mySprite, anim_idle_right)
    anim_idle_right.addAnimationFrame(img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `)
    anim_idle_left = animation.createAnimation(ActionKind.idle_left, 100)
    animation.attachAnimation(mySprite, anim_idle_left)
    anim_idle_left.addAnimationFrame(img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `)
    anim_walk_down = animation.createAnimation(ActionKind.walkdown, 200)
    animation.attachAnimation(mySprite, anim_walk_down)
    anim_walk_down.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    anim_walk_down.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . f f e 2 f f f f f f 2 e f f . 
        . f f f f f e e e e f f f f f . 
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
        . . . f e 4 d d d d 4 e f e . . 
        . . f e f 2 2 2 2 e d d 4 e . . 
        . . e 4 f 2 2 2 2 e d d e . . . 
        . . . . f 4 4 5 5 f e e . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . f f f . . . . . . . . . 
        `)
    anim_walk_down.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    anim_walk_down.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f e e 2 2 2 2 2 2 e f f . . 
        . f f e 2 f f f f f f 2 e f f . 
        . f f f f f e e e e f f f f f . 
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
        . . e f e 4 d d d d 4 e f . . . 
        . . e 4 d d e 2 2 2 2 f e f . . 
        . . . e d d e 2 2 2 2 f 4 e . . 
        . . . . e e f 5 5 4 4 f . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . f f f . . . . 
        `)
    anim_walk_up = animation.createAnimation(ActionKind.walkup, 200)
    animation.attachAnimation(mySprite, anim_walk_up)
    anim_walk_up.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    anim_walk_up.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . . f f f f 2 2 f f f f . . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f f 2 f e f . . 
        . . f f f 2 f e e 2 2 f f f . . 
        . . f e 2 f f e e 2 f e e f . . 
        . f f e f f e e e f e e e f f . 
        . f f e e e e e e e e e e f f . 
        . . . f e e e e e e e e f . . . 
        . . . e f f f f f f f f 4 e . . 
        . . . 4 f 2 2 2 2 2 e d d 4 . . 
        . . . e f f f f f f e e 4 . . . 
        . . . . f f f . . . . . . . . . 
        `)
    anim_walk_up.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    anim_walk_up.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . . f f f f 2 2 f f f f . . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e f 2 f f f 2 f 2 e f . . 
        . . f f f 2 2 e e f 2 f f f . . 
        . . f e e f 2 e e f f 2 e f . . 
        . f f e e e f e e e f f e f f . 
        . f f e e e e e e e e e e f f . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f e . . . 
        . . 4 d d e 2 2 2 2 2 f 4 . . . 
        . . . 4 e e f f f f f f e . . . 
        . . . . . . . . . f f f . . . . 
        `)
    anim_walk_right = animation.createAnimation(ActionKind.walkright, 200)
    animation.attachAnimation(mySprite, anim_walk_right)
    anim_walk_right.addAnimationFrame(img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `)
    anim_walk_right.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e e e d d d f . . . 
        . . . . . f 4 d d e 4 e f . . . 
        . . . . . f e d d e 2 2 f . . . 
        . . . . f f f e e f 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `)
    anim_walk_right.addAnimationFrame(img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `)
    anim_walk_right.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . 4 d d e 4 4 4 e f . . . 
        . . . . e d d e 2 2 2 2 f . . . 
        . . . . f e e f 4 4 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `)
    anim_walk_left = animation.createAnimation(ActionKind.walkleft, 200)
    animation.attachAnimation(mySprite, anim_walk_left)
    anim_walk_left.addAnimationFrame(img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `)
    anim_walk_left.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d e e e e e f . . . 
        . . . f e 4 e d d 4 f . . . . . 
        . . . f 2 2 e d d e f . . . . . 
        . . f f 5 5 f e e f f f . . . . 
        . . f f f f f f f f f f . . . . 
        . . . f f f . . . f f . . . . . 
        `)
    anim_walk_left.addAnimationFrame(img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `)
    anim_walk_left.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e d d 4 . . . . 
        . . . f 2 2 2 2 e d d e . . . . 
        . . f f 5 5 4 4 f e e f . . . . 
        . . f f f f f f f f f f . . . . 
        . . . f f f . . . f f . . . . . 
        `)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (dd == 1) {
        coin = sprites.create(img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `, SpriteKind.Food)
        animation.runImageAnimation(
        coin,
        [img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `,img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 3 5 1 5 b 
            . c 5 3 5 1 d c 
            . c 5 d 1 d d c 
            . . f d d d f . 
            . . . f f f . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . . b 1 1 b . . 
            . . b 5 5 b . . 
            . . b d d b . . 
            . . c d d c . . 
            . . c 3 3 c . . 
            . . . f f . . . 
            `,img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 1 5 3 5 b 
            . c d 1 5 3 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `],
        200,
        true
        )
        coin.setPosition(otherSprite.x, otherSprite.y)
        otherSprite.destroy(effects.coolRadial, 500)
        projectile.destroy()
        scene.cameraShake(4, 100)
    }
    if (dd == 2) {
        coin = sprites.create(img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `, SpriteKind.Food)
        animation.runImageAnimation(
        coin,
        [img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `,img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 3 5 1 5 b 
            . c 5 3 5 1 d c 
            . c 5 d 1 d d c 
            . . f d d d f . 
            . . . f f f . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . . b 1 1 b . . 
            . . b 5 5 b . . 
            . . b d d b . . 
            . . c d d c . . 
            . . c 3 3 c . . 
            . . . f f . . . 
            `,img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 1 5 3 5 b 
            . c d 1 5 3 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `],
        200,
        true
        )
        coin.setPosition(otherSprite.x, otherSprite.y)
        otherSprite.destroy(effects.warmRadial, 500)
        projectile.destroy()
        scene.cameraShake(4, 100)
    }
    if (dd == 3) {
        coin = sprites.create(img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `, SpriteKind.Food)
        animation.runImageAnimation(
        coin,
        [img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `,img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 3 5 1 5 b 
            . c 5 3 5 1 d c 
            . c 5 d 1 d d c 
            . . f d d d f . 
            . . . f f f . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . . b 1 1 b . . 
            . . b 5 5 b . . 
            . . b d d b . . 
            . . c d d c . . 
            . . c 3 3 c . . 
            . . . f f . . . 
            `,img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 1 5 3 5 b 
            . c d 1 5 3 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `],
        200,
        true
        )
        coin.setPosition(otherSprite.x, otherSprite.y)
        otherSprite.destroy(effects.halo, 500)
        projectile.destroy()
        scene.cameraShake(4, 100)
    }
    if (dd == 4) {
        coin = sprites.create(img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `, SpriteKind.Food)
        animation.runImageAnimation(
        coin,
        [img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `,img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 3 5 1 5 b 
            . c 5 3 5 1 d c 
            . c 5 d 1 d d c 
            . . f d d d f . 
            . . . f f f . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . . b 1 1 b . . 
            . . b 5 5 b . . 
            . . b d d b . . 
            . . c d d c . . 
            . . c 3 3 c . . 
            . . . f f . . . 
            `,img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 1 5 3 5 b 
            . c d 1 5 3 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `],
        200,
        true
        )
        coin.setPosition(otherSprite.x, otherSprite.y)
        otherSprite.destroy(effects.ashes, 500)
        projectile.destroy()
        scene.cameraShake(4, 100)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (unhurtable == 0) {
        info.changeLifeBy(-1)
        music.playMelody("B F C - - - - - ", 960)
        unhurtable = 1
        scene.cameraShake(4, 100)
        pause(3000)
        unhurtable = 0
    }
})
let projectile: Sprite = null
let anim_walk_left: animation.Animation = null
let anim_walk_right: animation.Animation = null
let anim_walk_up: animation.Animation = null
let anim_walk_down: animation.Animation = null
let anim_idle_left: animation.Animation = null
let anim_idle_right: animation.Animation = null
let anim_idle_up: animation.Animation = null
let anim_idle_down: animation.Animation = null
let coin: Sprite = null
let reward = 0
let horizontal = 0
let vertical = 0
let speed = 0
let swingsword = 0
let unhurtable = 0
let sword2: Sprite = null
let mySprite: Sprite = null
let snake_alert_right: animation.Animation = null
let snake_alert_left: animation.Animation = null
let snake_idle: animation.Animation = null
let snake: Sprite = null
let text_list: string[] = []
let treasure: Image[] = []
let dd = 0
dd = randint(1, 4)
treasure = [
img`
    ................f...
    ...............f4f..
    ..............f414f.
    .............f45514f
    .............f44544f
    .............f45454f
    .............f45554f
    .....ffff.....f454f.
    ...fff22fff...f454f.
    ..fff2222fff..f454f.
    .fffeeeeeeffff45554f
    .ffe222222eef4444444
    .fe2ffffff2eff4dde4f
    .ffffbfeefbff.4ddd4.
    ffef41f44f1effeddd4.
    fee4dddddd4eef.e44..
    .feeddddddeef.......
    ..fee4444eef........
    .e4f222222f.........
    .4df222222f.........
    .44f445544f.........
    ....ffffff..........
    ....ff..ff..........
    `,
img`
    ....................
    ....................
    ....................
    ....................
    ....................
    ....................
    .....ffff.....fffff.
    ...fff22fff..f45555f
    ..fff2222ffff4555155
    .fffeeeeeefff4555515
    .ffe222222eef5555555
    .fe2ffffff2ef5555555
    .ffffbfeefbff54e4e4e
    ffef41f44f1eff4ddd4f
    fee4dddddd4eeffe44f.
    .feeddddddeef.......
    ..fee4444eef........
    .e4f222222f.........
    .4df222222f.........
    .44f445544f.........
    ....ffffff..........
    ....ff..ff..........
    `,
img`
    ....................
    ....................
    ....................
    ....................
    ....................
    ....................
    ...............ffff.
    .....ffff.....f6d1f.
    ...fff22fff...f61df.
    ..fff2222fff..f6d1f.
    .fffeeeeeefff.f66f..
    .ffe222222eef.f444..
    .fe2ffffff2ef.4dde4.
    .ffffbfeefbff.4ddd4.
    ffef41f44f1effeddd4.
    fee4dddddd4eef.e44..
    .feeddddddeef.......
    ..fee4444eef........
    .e4f222222f.........
    .4df222222f.........
    .44f445544f.........
    ....ffffff..........
    ....ff..ff..........
    `,
img`
    ....................
    ....................
    ....................
    ....................
    ....................
    ....................
    ....................
    .....ffff......2ff..
    ...fff22fff....fff..
    ..fff2222fff...f6f..
    .fffeeeeeefff..6f6..
    .ffe222222eef..444..
    .fe2ffffff2ef.4dde4.
    .ffffbfeefbff.4ddd4.
    ffef41f44f1effeddd4.
    fee4dddddd4eef.e44..
    .feeddddddeef.......
    ..fee4444eef........
    .e4f222222f.........
    .4df222222f.........
    .44f445544f.........
    ....ffffff..........
    ....ff..ff..........
    `,
img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 8 8 f f f . . . . 
    . . . f f f 8 8 8 8 f f f . . . 
    . . f f f 6 6 6 6 6 6 f f f . . 
    . . f f 6 8 8 8 8 8 8 6 6 f . . 
    . . f 6 8 f f f f f f 8 6 f . . 
    . . f f f b f e e f b f f f . . 
    . f f e f 1 f 4 4 f 1 f e f f . 
    . f e e 4 d d d d d d 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `
]
text_list = [
"一把金色的剑！",
"一个金色的球！",
"牙刷！",
"电视遥控器！",
"一顶新的帽子！"
]
info.setScore(0)
info.setLife(10)
tiles.setTilemap(tilemap`级别2`)
for (let value of tiles.getTilesByType(assets.tile`tile2`)) {
    snake = sprites.create(img`
        . . . . c c c c c c . . . . . . 
        . . . c 6 7 7 7 7 6 c . . . . . 
        . . c 7 7 7 7 7 7 7 7 c . . . . 
        . c 6 7 7 7 7 7 7 7 7 6 c . . . 
        . c 7 6 f 6 6 f 6 7 7 7 c . . . 
        . f 7 6 f 6 6 f 6 7 7 7 f . . . 
        . f 7 7 7 7 7 7 7 7 7 7 f . . . 
        . . f 7 7 7 7 7 7 7 7 6 f c . . 
        . . . f c c c c c 7 6 f 7 7 c . 
        . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
        . c 7 7 2 7 7 c f c 6 7 7 6 c c 
        c 1 1 1 1 7 6 f c c 6 6 6 c . . 
        f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
        f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
        . f 6 1 1 1 1 1 1 6 6 6 f . . . 
        . . c c c c c c c c c f . . . . 
        `, SpriteKind.Enemy)
    tiles.placeOnTile(snake, value)
    tiles.setTileAt(value, sprites.dungeon.floorDark2)
    snake_idle = animation.createAnimation(ActionKind.Idle, 1000)
    snake_idle.addAnimationFrame(img`
        . . . . c c c c c c . . . . . . 
        . . . c 6 7 7 7 7 6 c . . . . . 
        . . c 7 7 7 7 7 7 7 7 c . . . . 
        . c 6 7 7 7 7 7 7 7 7 6 c . . . 
        . c 7 6 6 6 6 6 6 7 7 7 c . . . 
        . f 7 f f 6 6 f f 7 7 7 f . . . 
        . f 7 7 7 7 7 7 7 7 7 7 f . . . 
        . . f 7 7 7 7 6 c 7 7 6 f c . . 
        . . . f c c c c 7 7 6 f 7 7 c . 
        . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
        . c 7 7 2 7 7 c f c 6 7 7 6 c c 
        c 1 1 1 1 7 6 f c c 6 6 6 c . . 
        f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
        f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
        . f 6 1 1 1 1 1 1 6 6 6 f . . . 
        . . c c c c c c c c c f . . . . 
        `)
    snake_idle.addAnimationFrame(img`
        . . . c c c c c c . . . . . . . 
        . . c 6 7 7 7 7 6 c . . . . . . 
        . c 7 7 7 7 7 7 7 7 c . . . . . 
        c 6 7 7 7 7 7 7 7 7 6 c . . . . 
        c 7 6 6 6 6 6 6 7 7 7 c . . . . 
        f 7 f f 6 6 f f 7 7 7 f . . . . 
        f 7 7 7 7 7 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 6 c 7 7 6 f . . . . 
        . . f c c c c 7 7 6 f c c c . . 
        . . c 6 2 7 7 7 f c c 7 7 7 c . 
        . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
        . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
        . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
        . . c 6 1 1 1 1 1 7 6 6 c c . . 
        . . . c c c c c c c c c c . . . 
        `)
    animation.attachAnimation(snake, snake_idle)
    snake_alert_left = animation.createAnimation(ActionKind.walkleft, 200)
    snake_alert_left.addAnimationFrame(img`
        . . . c c c c c c . . . . . . . 
        . . c 6 7 7 7 7 6 c . . . . . . 
        . c 7 7 7 7 7 7 7 7 c . . . . . 
        c 6 7 7 7 7 7 7 7 7 6 c . . . . 
        c 7 c 6 6 6 6 c 7 7 7 c . . . . 
        f 7 6 f 6 6 f 6 7 7 7 f . . . . 
        f 7 7 7 7 7 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 6 c 7 7 6 f . . . . 
        . . f c c c c 7 7 6 f c c c . . 
        . . c 6 2 7 7 7 f c c 7 7 7 c . 
        . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
        . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
        . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
        . . c 6 1 1 1 1 1 7 6 6 c c . . 
        . . . c c c c c c c c c c . . . 
        `)
    snake_alert_left.addAnimationFrame(img`
        . . . . . c c c c c c c . . . . 
        . . . . c 6 7 7 7 7 7 6 c . . . 
        . . . c 7 c 6 6 6 6 c 7 6 c . . 
        . . c 6 7 6 f 6 6 f 6 7 7 c . . 
        . . c 7 7 7 7 7 7 7 7 7 7 c . . 
        . . f 7 8 1 f f 1 6 7 7 7 f . . 
        . . f 6 f 1 f f 1 f 7 7 7 f . . 
        . . . f f 2 2 2 2 f 7 7 6 f . . 
        . . c c f 2 2 2 2 7 7 6 f c . . 
        . c 7 7 7 7 7 7 7 7 c c 7 7 c . 
        c 7 1 1 1 7 7 7 7 f c 6 7 7 7 c 
        f 1 1 1 1 1 7 6 f c c 6 6 6 c c 
        f 1 1 1 1 1 1 6 6 c 6 6 6 c . . 
        f 6 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . f 6 1 1 1 1 1 6 6 6 6 c . . . 
        . . f f c c c c c c c c . . . . 
        `)
    animation.attachAnimation(snake, snake_alert_left)
    snake_alert_right = animation.createAnimation(ActionKind.Walking, 200)
    snake_alert_right.addAnimationFrame(img`
        . . . . . . . c c c c c c . . . 
        . . . . . . c 6 7 7 7 7 6 c . . 
        . . . . . c 7 7 7 7 7 7 7 7 c . 
        . . . . c 6 7 7 7 7 7 7 7 7 6 c 
        . . . . c 7 7 7 c 6 6 6 6 c 7 c 
        . . . . f 7 7 7 6 f 6 6 f 6 7 f 
        . . . . f 7 7 7 7 7 7 7 7 7 7 f 
        . . . . f 6 7 7 c 6 7 7 7 7 f . 
        . . c c c f 6 7 7 c c c c f . . 
        . c 7 7 7 c c f 7 7 7 2 6 c . . 
        c 7 7 7 7 6 f c 7 7 2 7 7 6 c . 
        c c c 6 6 6 c 6 6 7 1 1 1 1 c . 
        . . c 6 6 6 6 6 6 1 1 1 1 1 c . 
        . . c 6 6 6 6 6 1 1 1 1 1 6 c . 
        . . c c 6 6 7 1 1 1 1 1 6 c . . 
        . . . c c c c c c c c c c . . . 
        `)
    snake_alert_right.addAnimationFrame(img`
        . . . . c c c c c c c . . . . . 
        . . . c 6 7 7 7 7 7 6 c . . . . 
        . . c 6 7 c 6 6 6 6 c 7 c . . . 
        . . c 7 7 6 f 6 6 f 6 7 6 c . . 
        . . c 7 7 7 7 7 7 7 7 7 7 c . . 
        . . f 7 7 7 6 1 f f 1 8 7 f . . 
        . . f 7 7 7 f 1 f f 1 f 6 f . . 
        . . f 6 7 7 f 2 2 2 2 f f . . . 
        . . c f 6 7 7 2 2 2 2 f c c . . 
        . c 7 7 c c 7 7 7 7 7 7 7 7 c . 
        c 7 7 7 6 c f 7 7 7 7 1 1 1 7 c 
        c c 6 6 6 c c f 6 7 1 1 1 1 1 f 
        . . c 6 6 6 c 6 6 1 1 1 1 1 1 f 
        . . c 6 6 6 6 6 6 1 1 1 1 1 6 f 
        . . . c 6 6 6 6 1 1 1 1 1 6 f . 
        . . . . c c c c c c c c f f . . 
        `)
    animation.attachAnimation(snake, snake_alert_right)
}
for (let value of tiles.getTilesByType(assets.tile`tile3`)) {
    snake = sprites.create(img`
        . . . . c c c c c c . . . . . . 
        . . . c 6 7 7 7 7 6 c . . . . . 
        . . c 7 7 7 7 7 7 7 7 c . . . . 
        . c 6 7 7 7 7 7 7 7 7 6 c . . . 
        . c 7 6 f 6 6 f 6 7 7 7 c . . . 
        . f 7 6 f 6 6 f 6 7 7 7 f . . . 
        . f 7 7 7 7 7 7 7 7 7 7 f . . . 
        . . f 7 7 7 7 7 7 7 7 6 f c . . 
        . . . f c c c c c 7 6 f 7 7 c . 
        . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
        . c 7 7 2 7 7 c f c 6 7 7 6 c c 
        c 1 1 1 1 7 6 f c c 6 6 6 c . . 
        f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
        f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
        . f 6 1 1 1 1 1 1 6 6 6 f . . . 
        . . c c c c c c c c c f . . . . 
        `, SpriteKind.Enemy)
    tiles.placeOnTile(snake, value)
    tiles.setTileAt(value, sprites.dungeon.darkGroundCenter)
    snake_idle = animation.createAnimation(ActionKind.Idle, 1000)
    snake_idle.addAnimationFrame(img`
        . . . . c c c c c c . . . . . . 
        . . . c 6 7 7 7 7 6 c . . . . . 
        . . c 7 7 7 7 7 7 7 7 c . . . . 
        . c 6 7 7 7 7 7 7 7 7 6 c . . . 
        . c 7 6 6 6 6 6 6 7 7 7 c . . . 
        . f 7 f f 6 6 f f 7 7 7 f . . . 
        . f 7 7 7 7 7 7 7 7 7 7 f . . . 
        . . f 7 7 7 7 6 c 7 7 6 f c . . 
        . . . f c c c c 7 7 6 f 7 7 c . 
        . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
        . c 7 7 2 7 7 c f c 6 7 7 6 c c 
        c 1 1 1 1 7 6 f c c 6 6 6 c . . 
        f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
        f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
        . f 6 1 1 1 1 1 1 6 6 6 f . . . 
        . . c c c c c c c c c f . . . . 
        `)
    snake_idle.addAnimationFrame(img`
        . . . c c c c c c . . . . . . . 
        . . c 6 7 7 7 7 6 c . . . . . . 
        . c 7 7 7 7 7 7 7 7 c . . . . . 
        c 6 7 7 7 7 7 7 7 7 6 c . . . . 
        c 7 6 6 6 6 6 6 7 7 7 c . . . . 
        f 7 f f 6 6 f f 7 7 7 f . . . . 
        f 7 7 7 7 7 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 6 c 7 7 6 f . . . . 
        . . f c c c c 7 7 6 f c c c . . 
        . . c 6 2 7 7 7 f c c 7 7 7 c . 
        . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
        . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
        . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
        . . c 6 1 1 1 1 1 7 6 6 c c . . 
        . . . c c c c c c c c c c . . . 
        `)
    animation.attachAnimation(snake, snake_idle)
    snake_alert_left = animation.createAnimation(ActionKind.walkleft, 200)
    snake_alert_left.addAnimationFrame(img`
        . . . c c c c c c . . . . . . . 
        . . c 6 7 7 7 7 6 c . . . . . . 
        . c 7 7 7 7 7 7 7 7 c . . . . . 
        c 6 7 7 7 7 7 7 7 7 6 c . . . . 
        c 7 c 6 6 6 6 c 7 7 7 c . . . . 
        f 7 6 f 6 6 f 6 7 7 7 f . . . . 
        f 7 7 7 7 7 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 6 c 7 7 6 f . . . . 
        . . f c c c c 7 7 6 f c c c . . 
        . . c 6 2 7 7 7 f c c 7 7 7 c . 
        . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
        . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
        . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
        . . c 6 1 1 1 1 1 7 6 6 c c . . 
        . . . c c c c c c c c c c . . . 
        `)
    snake_alert_left.addAnimationFrame(img`
        . . . . . c c c c c c c . . . . 
        . . . . c 6 7 7 7 7 7 6 c . . . 
        . . . c 7 c 6 6 6 6 c 7 6 c . . 
        . . c 6 7 6 f 6 6 f 6 7 7 c . . 
        . . c 7 7 7 7 7 7 7 7 7 7 c . . 
        . . f 7 8 1 f f 1 6 7 7 7 f . . 
        . . f 6 f 1 f f 1 f 7 7 7 f . . 
        . . . f f 2 2 2 2 f 7 7 6 f . . 
        . . c c f 2 2 2 2 7 7 6 f c . . 
        . c 7 7 7 7 7 7 7 7 c c 7 7 c . 
        c 7 1 1 1 7 7 7 7 f c 6 7 7 7 c 
        f 1 1 1 1 1 7 6 f c c 6 6 6 c c 
        f 1 1 1 1 1 1 6 6 c 6 6 6 c . . 
        f 6 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . f 6 1 1 1 1 1 6 6 6 6 c . . . 
        . . f f c c c c c c c c . . . . 
        `)
    animation.attachAnimation(snake, snake_alert_left)
    snake_alert_right = animation.createAnimation(ActionKind.Walking, 200)
    snake_alert_right.addAnimationFrame(img`
        . . . . . . . c c c c c c . . . 
        . . . . . . c 6 7 7 7 7 6 c . . 
        . . . . . c 7 7 7 7 7 7 7 7 c . 
        . . . . c 6 7 7 7 7 7 7 7 7 6 c 
        . . . . c 7 7 7 c 6 6 6 6 c 7 c 
        . . . . f 7 7 7 6 f 6 6 f 6 7 f 
        . . . . f 7 7 7 7 7 7 7 7 7 7 f 
        . . . . f 6 7 7 c 6 7 7 7 7 f . 
        . . c c c f 6 7 7 c c c c f . . 
        . c 7 7 7 c c f 7 7 7 2 6 c . . 
        c 7 7 7 7 6 f c 7 7 2 7 7 6 c . 
        c c c 6 6 6 c 6 6 7 1 1 1 1 c . 
        . . c 6 6 6 6 6 6 1 1 1 1 1 c . 
        . . c 6 6 6 6 6 1 1 1 1 1 6 c . 
        . . c c 6 6 7 1 1 1 1 1 6 c . . 
        . . . c c c c c c c c c c . . . 
        `)
    snake_alert_right.addAnimationFrame(img`
        . . . . c c c c c c c . . . . . 
        . . . c 6 7 7 7 7 7 6 c . . . . 
        . . c 6 7 c 6 6 6 6 c 7 c . . . 
        . . c 7 7 6 f 6 6 f 6 7 6 c . . 
        . . c 7 7 7 7 7 7 7 7 7 7 c . . 
        . . f 7 7 7 6 1 f f 1 8 7 f . . 
        . . f 7 7 7 f 1 f f 1 f 6 f . . 
        . . f 6 7 7 f 2 2 2 2 f f . . . 
        . . c f 6 7 7 2 2 2 2 f c c . . 
        . c 7 7 c c 7 7 7 7 7 7 7 7 c . 
        c 7 7 7 6 c f 7 7 7 7 1 1 1 7 c 
        c c 6 6 6 c c f 6 7 1 1 1 1 1 f 
        . . c 6 6 6 c 6 6 1 1 1 1 1 1 f 
        . . c 6 6 6 6 6 6 1 1 1 1 1 6 f 
        . . . c 6 6 6 6 1 1 1 1 1 6 f . 
        . . . . c c c c c c c c f f . . 
        `)
    animation.attachAnimation(snake, snake_alert_right)
}
scene.setBackgroundColor(15)
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
sword2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.sword)
unhurtable = 0
swingsword = 0
speed = 70
vertical = -1
tiles.placeOnRandomTile(mySprite, sprites.dungeon.floorLight2)
scene.cameraFollowSprite(mySprite)
player_anim()
snake_anim()
game.onUpdate(function () {
    controller.moveSprite(mySprite, speed, speed)
    if (mySprite.vx > 0) {
        vertical = 0
        horizontal = 1
    }
    if (mySprite.vx < 0) {
        vertical = 0
        // IZZUNS FOREVER
        horizontal = -1
    }
    if (mySprite.vy < 0) {
        vertical = -1
        horizontal = 0
    }
    if (mySprite.vy > 0) {
        vertical = 1
        horizontal = 0
    }
    if (swingsword == 0) {
        if (horizontal == 1) {
            if (mySprite.vx != 0) {
                animation.setAction(mySprite, ActionKind.walkright)
            } else {
                animation.setAction(mySprite, ActionKind.idle_right)
            }
        }
        if (horizontal == -1) {
            if (mySprite.vx != 0) {
                animation.setAction(mySprite, ActionKind.walkleft)
            } else {
                animation.setAction(mySprite, ActionKind.idle_left)
            }
        }
        if (vertical == -1) {
            if (mySprite.vy != 0) {
                animation.setAction(mySprite, ActionKind.walkup)
            } else {
                animation.setAction(mySprite, ActionKind.idle_up)
            }
        }
        if (vertical == 1) {
            if (mySprite.vy != 0) {
                animation.setAction(mySprite, ActionKind.walkdown)
            } else {
                animation.setAction(mySprite, ActionKind.idle_down)
            }
        }
    }
})
game.onUpdate(function () {
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (mySprite.y < value2.y + 56 && mySprite.x < value2.x + 56 && (mySprite.y > value2.y - 56 && mySprite.x > value2.x - 56)) {
            value2.follow(mySprite, 30)
        }
        if (value2.vx == 0 && value2.vy == 0) {
            animation.setAction(value2, ActionKind.Idle)
        } else {
            if (value2.vx < 0) {
                animation.setAction(value2, ActionKind.walkleft)
            } else {
                animation.setAction(value2, ActionKind.Walking)
            }
        }
    }
})
game.onUpdate(function () {
    if (swingsword == 1) {
        if (horizontal == -1) {
            sword2.right = mySprite.left
            mySprite.setImage(img`
                . . . . . . f f . . . . . . . . 
                . . . . f f 2 f f f f . . . . . 
                . . . f f 2 f e e e e f f . . . 
                . . f f 2 2 f e e e e e f f . . 
                . . f e e e e f f e e e e f . . 
                . f e 2 2 2 2 e e f f f f f . . 
                . f 2 e f f f f 2 2 2 e f f f . 
                . f f f e e e f f f f f f f f . 
                . f e e 4 4 f b e 4 4 e f e f . 
                . c f e d d f b 4 d 4 e e f . . 
                c c . e e d d d 4 e e e f . . . 
                1 c e d d e e 2 2 2 2 f . . . . 
                c c e d d 4 4 e 4 4 4 f . . . . 
                . c . e e e e f f f f f . . . . 
                . . . . . f f f f f f f f . . . 
                . . . . . . f f . . f f f . . . 
                `)
            sword2.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . c c c c c . . . . . . . 
                . . . c 9 c 1 1 1 c c c c . . . 
                . . c 1 1 1 c 1 1 1 1 1 1 c c c 
                . c 9 1 1 1 1 c 1 1 1 1 1 1 1 9 
                . . c d 1 1 c 1 1 1 9 d d c c c 
                . . . c 9 c d 1 1 c c c c . . . 
                . . . . c c c c c . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
            sword2.y = mySprite.y
        }
        if (horizontal == 1) {
            sword2.left = mySprite.right
            mySprite.setImage(img`
                . . . . . . . . f f . . . . . . 
                . . . . . f f f f 2 f f . . . . 
                . . . f f e e e e f 2 f f . . . 
                . . f f e e e e e f 2 2 f f . . 
                . . f e e e e f f e e e e f . . 
                . . f f f f f e e 2 2 2 2 e f . 
                . f f f e 2 2 2 f f f f e 2 f . 
                . f f f f f f f f e e e f f f . 
                . f e f e 4 4 e b f 4 4 e e f . 
                . . f e e 4 d 4 b f d d e f c . 
                . . . f e e e 4 d d d e e . c c 
                . . . . f 2 2 2 2 e e d d e c 1 
                . . . . f 4 4 4 e 4 4 d d e c c 
                . . . . f f f f f e e e e . c . 
                . . . f f f f f f f f . . . . . 
                . . . f f f . . f f . . . . . . 
                `)
            sword2.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . c c c c c . . . . 
                . . . c c c c 1 1 1 c 9 c . . . 
                c c c 1 1 1 1 1 1 c 1 1 1 c . . 
                9 1 1 1 1 1 1 1 c 1 1 1 1 9 c . 
                c c c d d 9 1 1 1 c 1 1 d c . . 
                . . . c c c c 1 1 d c 9 c . . . 
                . . . . . . . c c c c c . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
            sword2.y = mySprite.y
        }
        if (vertical == 1) {
            sword2.top = mySprite.bottom
            mySprite.setImage(img`
                . . . . . . . f f . . . . . . . 
                . . . . . f f 2 2 f f . . . . . 
                . . . f f f 2 2 2 2 f f f . . . 
                . . f f f 2 2 2 2 2 2 f f f . . 
                . . f f f 2 2 2 2 2 2 f f f . . 
                . . f e e e e e e e e e e f f . 
                . . f e 2 2 2 2 2 2 2 2 e f f . 
                . . f f f f e e e e f f f f f . 
                . . f e f b f 4 4 f b f e f f . 
                . . f e 4 1 f d d f 1 4 e f . . 
                . . f f e 4 d d d d 4 e f e . . 
                . . f e f 2 2 2 2 2 f 4 e . . . 
                . . f 4 f 4 4 5 5 4 f 4 e . . . 
                . . . . f f f f f f d d e . . . 
                . . . . . f f f f e d d e . . . 
                . . . . . . . . . . e e . . . . 
                `)
            sword2.setImage(img`
                . . . . . . . c c c c c . . . . 
                . . . . . . c c b b b c c . . . 
                . . . . . . . c c c c c . . . . 
                . . . . . . . . c d c . . . . . 
                . . . . . . . . c 1 c . . . . . 
                . . . . . . . c 1 1 9 c . . . . 
                . . . . . . . c 1 1 d c . . . . 
                . . . . . . . c 1 1 1 c . . . . 
                . . . . . . c 1 1 1 1 9 c . . . 
                . . . . . . c 1 1 c 1 1 c . . . 
                . . . . . . c 1 c 1 c 1 c . . . 
                . . . . . . c c 1 1 1 c c . . . 
                . . . . . . . c 1 1 d c . . . . 
                . . . . . . . c 1 1 9 c . . . . 
                . . . . . . . . c 9 c . . . . . 
                . . . . . . . . . c . . . . . . 
                `)
            sword2.x = mySprite.x
        }
        if (vertical == -1) {
            sword2.bottom = mySprite.top
            mySprite.setImage(img`
                . . . . d 1 f f f f . . . . . . 
                . . . . f f e e e e f f . . . . 
                . . . f e e e f f e e e f . . . 
                . . f f f f f 2 2 f f f f f . . 
                . . f f e 2 e 2 2 e 2 e f f . . 
                . . f e 2 f 2 f f 2 f 2 e f . . 
                . . f f f 2 2 e e 2 2 f f f . . 
                . f f e f 2 f e e f 2 f e f f . 
                . f e e f f e e e e f e e e f . 
                . . f e e e e e e e e e e f . . 
                . . . f e e e e e e e e f . . . 
                . . . . f f f f f f f f 4 e . . 
                . . . . f 2 2 2 2 2 2 f d 4 . . 
                . . . . f 4 4 4 4 4 4 f 4 4 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
            sword2.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . c . . . . . . . . 
                . . . . . . c 1 c . . . . . . . 
                . . . . . c 1 1 9 c . . . . . . 
                . . . . c 1 1 1 1 9 c . . . . . 
                . . . . c c 1 1 1 c c . . . . . 
                . . . . c 1 c 1 c 9 c . . . . . 
                . . . . c 1 1 c d d c . . . . . 
                . . . . . c 1 1 9 c . . . . . . 
                . . . . . c 1 1 d c . . . . . . 
                . . . . . c 1 1 1 c . . . . . . 
                . . . . . c 1 1 d c . . . . . . 
                . . . . . . c d c . . . . . . . 
                . . . . . c c 9 c c . . . . . . 
                . . . . c c c c c c c . . . . . 
                `)
            sword2.x = mySprite.x
        }
    }
})
forever(function () {
    if (dd == 1) {
        if (controller.B.isPressed()) {
            projectile = sprites.createProjectileFromSprite(img`
                . . 8 8 8 8 . . 
                . 8 9 9 9 9 8 . 
                8 9 9 1 1 9 9 8 
                8 9 1 1 1 1 9 8 
                8 9 1 1 1 1 9 8 
                8 9 9 1 1 9 9 8 
                . 8 9 9 9 9 8 . 
                . . 8 8 8 8 . . 
                `, mySprite, horizontal * 300, vertical * 300)
            projectile.startEffect(effects.coolRadial)
        }
    } else if (dd == 2) {
        if (controller.B.isPressed()) {
            projectile = sprites.createProjectileFromSprite(img`
                . . 2 2 2 2 . . 
                . 2 3 3 3 3 2 . 
                2 3 3 1 1 3 3 2 
                2 3 1 1 1 1 3 2 
                2 3 1 1 1 1 3 2 
                2 3 3 1 1 3 3 2 
                . 2 3 3 3 3 2 . 
                . . 2 2 2 2 . . 
                `, mySprite, horizontal * 300, vertical * 300)
            projectile.startEffect(effects.warmRadial)
        }
    } else if (dd == 3) {
        if (controller.B.isPressed()) {
            projectile = sprites.createProjectileFromSprite(img`
                . . 4 4 4 4 . . 
                . 4 5 5 5 5 4 . 
                4 5 5 1 1 5 5 4 
                4 5 1 1 1 1 5 4 
                4 5 1 1 1 1 5 4 
                4 5 5 1 1 5 5 4 
                . 4 5 5 5 5 4 . 
                . . 4 4 4 4 . . 
                `, mySprite, horizontal * 300, vertical * 300)
            projectile.startEffect(effects.halo)
        }
    } else if (dd == 4) {
        if (controller.B.isPressed()) {
            projectile = sprites.createProjectileFromSprite(img`
                . . 6 6 6 6 . . 
                . 6 7 7 7 7 6 . 
                6 7 7 1 1 7 7 6 
                6 7 1 1 1 1 7 6 
                6 7 1 1 1 1 7 6 
                6 7 7 1 1 7 7 6 
                . 6 7 7 7 7 6 . 
                . . 6 6 6 6 . . 
                `, mySprite, horizontal * 300, vertical * 300)
            projectile.startEffect(effects.ashes)
        }
    }
})
forever(function () {
    if (unhurtable == 1) {
        mySprite.setFlag(SpriteFlag.Invisible, true)
        pause(100)
        mySprite.setFlag(SpriteFlag.Invisible, false)
        pause(100)
    }
})
