# pongGame - Advanced 
Aufgabe ist es, das Game `Pong` zu programmieren. Dabei wollen wir mit zufälliger Bewegung und User Input der Mouse ein simples Spiel programmieren. Diese Grundbausteine werden uns später helfen, ein eigenes Mouse-Game zu entwickeln. 

## Pong Game
![](/img/pong.png)

Pong wurde 1972 von Atari veröffentlicht und war das erste kommerziell erfolgreiche Spiel. Heute gilt Pong als das Spiel, mit dem die Videospielindustrie ihren Anfang nahm.

Das Spielprinzip von Pong ist simpel: Ein Punkt (Ball) bewegt sich auf dem Bildschirm hin und her. Jeder der beiden Spieler\*innen steuert einen senkrechten Strich (Schläger), den er mit einem Balken (Paddle) nach oben und unten verschieben kann. Lässt man den Ball am Schläger vorbei, erhält der/die Gegner\*in einen Punkt. [Original Atari PONG (1972)](https://www.youtube.com/watch?v=fiShX2pTz9A)

Wir werden zuerst ein einfaches Pong programmieren bei dem wir gegen den Computer spielen. 

## Setup
![](/img/code.png)
1. Als Erstes müsst ihr ein eigenes Repository auf Github erstellen (nur eine Person). 
2. Danach müsst ihr dieses noch auf GitHub für die zweite Person freigeben unter `Settings-> Manage Access -> Direct Access -> Invite Members`
3. Nun sollten beide das noch leere Repository bearbeiten und clonen können. 

Nachdem ihr ein Repository erstellt habt, müsst ihr noch 3 Dateien erstellen und eurem Repository hinzufügen (Am besten lokal in eurem geclonten Repository und dann pushen). Ihr könnt dies selbst aufsetzen oder den Code aus den entsprechenden Dateien aus diesem Repository kopieren.  

1. `index.html` -> Hier wird das Spiel angezeigt 
2. `pong.js` -> Hier schreiben wir die Spiellogik bzw. den Code
3. `style.css` -> Hier sind die Styles für das html-file definiert

### Pong Game anzeigen 
Um zu sehen was ihr programmmiert habt, öffnet ihr die index.html Datei in eurem Browser (Rechtsklick oder Drag'n'Drop). 
Dies könnte dann so aussehen: 
![](/img/index.jpg)

## Additional
Falls ihr möchtet, könnt ihr euer Pong Game beliebig erweitern oder verändern. Ihr seid nicht an den Stil der 70er Jahre gebunden.
* Versucht euren eigenen Stil dem Pong Game hinzuzufügen (Bsp. verschwommene Bewegungen, der Ball zeichnet eine Spur, bunte Farben, etc.)
* Lasst den Ball immer schneller und das Spiel somit immer schwieriger werden.
* Programmiert einen Gegenspieler\*in. Der Einfachheit halber ist diese\*r Gegenspieler\*in "dumm" und wird ebenfalls von euch bedient. 
