# 2048-cli  
Игра головоломка, в начале которой и после каждого хода появляются плитки номинала «2» или «4». При нажатии стрелки клавиатуры игрок может сдвинуть все кубики в одну из четырех сторон. Если в столбце или строчке последовательно находятся две плитки с одинаковым значением (например «4» и «4»), то они соединятся в плитку номиналом «8». Цель игры собрать плитку номиналом «2048». За каждое соединение игровые очки увеличиваются на номинал получившейся плитки, которые отображаются в поле Score. В игре имеются кнопки, нажав на которые игрок может сделать ход назад или начать игру заново. Когда игрок соберет плитку номиналом «2048» ему покажется поздравительное окно в котором он может решить начать игру заново или продолжить текущую.
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
