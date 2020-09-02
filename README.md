# Sturkopf

Das folgende Spiel wurde im Rahmen der Vorlesung „Mobile Computing und Internet der Dinge“ am Karlsruher Institut für Technologie entwickelt.
Voraussetzungen, das Spiel starten zu können, sind ein Mobiles Gerät mit Sensoren für die Ausrichtung, sowie ein Browser, der diese Daten auslesen und an javascript weitergeben kann.
Das Projekt wurde ausschlieslich mittels html, css und javascript erzeugt und verwendet nur JQuery und NoSleep.js als Bibliotheken.

# Sensoren

Um das Spiel nutzen zu können, werden Sensoren des Geräts genutzt. Sollte das Spiel nicht wie gewünscht funktionieren, kann dies daran liegen,dass der Zugriff auf diese Sensoren nicht möglich ist.
Zur Ermittlung der Richtung in welche der Spieler sich bewegen möchte wird werden Gerätesensoren zur Bestimmung der „DeviceOrientation“ verwendet.
Es wird ermittelt, ob sich die Ausrichtung des Bildschirms verändert hat, um das Spielgeschehen zu unterbrechen, da dabei Elemente des Spiels nicht mehr korrekt angezeigt werden.

# Spielprinzip

Der Sturkopf, der durch einen roten Kreis in der Mitte des Spielfeldes dargestellt wird, läuft immer geradeaus und droht dabei mit diversen Hindernissen zu kollidieren. Zum Glück zeigt er uns mit einer kleinen Spitze in welche Richtung er sich bewegen möchte. Damit der Sturkopf nicht gegen Hindernisse läuft müssen wir seine gesamte Welt um ihm herum drehen. In unserem Fall bedeutet das, das Mobile Gerät zu drehen. Dies geht am besten und gefahrlosesten auf einer ebenen und glatten Oberfläche.
Durch anheben des oberen Endes des Mobilen Geräts ab etwa 30° wird das Spiel pausiert.
WARNUNG: Bei unsachgemäßer handhabung des Geräts können Kratzer oder schwere Beschädigungen entstehen. Wir übernehmen keinerlei Verantwortung für Schäden, die der Spieler während des spielens an seinem Gerät verursacht.

# Sieg und Niederlage

Das Spiel ist gewonnen, wenn die der Schwierigkeit entsprechende Menge an Punkten erreicht wird. Punkte verdient sich der Sturkopf durch das aufsammeln der grünen (1 Punkt), blauen (2 Punkte) und gelben (3 Punkte) Kreise.
Erschwert wird die Aufgabe dadurch, dass die grünen Kreise den Sturkopf verlangsamen und die gelben ihn beschleunigen. Dadurch kann es dazu kommen, dass der Sturkopf zu schnell wird, um noch gesteuert werden zu können, oder einfach stehen bleibt. In der einfachen Variante bleibt der Sturkopf nie stehen.
Der Spieler hat verloren, wenn der Sturkopf mit einem Hindernis (Graue Kreise und Spielfeldwand) kollidiert oder stehen bleibt. In der Schweren Variante ist das Spiel ebenfalls verloren, sollten die nötigen Punkte überschritten werden.
Die größtmögliche Schwierigkeit ist bei Nutzung in öffentlichen Verkehrsmitteln, die häufig ihre Richtung wechseln, gegeben. Allerdings sollte hier auch besonders darauf geachtet werden beim spielen das eigene Gerät nicht zu beschädigen oder durch unvorsichtige Bewegungen Mitreisende zu stören.
